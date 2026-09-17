const elements = {
  sqlInput: { value: "WITH cte AS ( SELECT id, name FROM users WHERE status = 'A' ), cte2 AS ( SELECT * FROM users WHERE status = 'B' ) SELECT * FROM cte UNION ALL SELECT * FROM cte2;", addEventListener() {} },
  sqlOutput: { textContent: '' },
  sqlInputSummary: { textContent: '' }
};
const document = { getElementById(id) { return elements[id] || null; } };
const fn = new Function('document', '"use strict";' + 
    function updateSqlInputSummary() {
      const sqlInput = document.getElementById('sqlInput');
      const summary = document.getElementById('sqlInputSummary');
      const value = sqlInput.value;
      const totalLines = value === '' ? 0 : value.split(/\r\n|\r|\n/).length;
      const totalCharacters = value.length;
      summary.textContent = `Total Lines: ${totalLines} | Total Characters: ${totalCharacters}`;
    }

    const SQL_INDENT_RULES = {
      increaseWords: ['WITH', 'SELECT', 'FROM', 'WHERE', 'GROUP', 'ORDER', 'HAVING', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'UNION', 'INTERSECT', 'EXCEPT', 'VALUES', 'CASE', 'WHEN', 'THEN', 'ON', 'SET', 'INSERT', 'UPDATE', 'DELETE', 'RETURNING'],
      decreaseWords: ['END', 'WHEN', 'THEN', ')'],
      noIndentWords: ['AS', 'AND', 'OR', 'BY', 'ON', 'IN', 'IS', 'NOT', 'LIKE', 'NULL', 'ASC', 'DESC', 'DISTINCT', 'ALL', 'ANY', 'BETWEEN', 'EXISTS', 'LIMIT', 'OFFSET', 'TOP'],
      ctePatterns: [
        /\bWITH\s+[A-Za-z_][A-Za-z0-9_]*\s+AS\s*\(/i,
        /,\s*[A-Za-z_][A-Za-z0-9_]*\s+AS\s*\(/gi
      ]
    };

    function normalizeSqlInput(value) {
      if (!value) return '';

      const lines = value.split(/\r?\n/);
      const cleanedLines = [];

      for (const rawLine of lines) {
        const line = rawLine.trim();
        if (!line) continue;

        if (/^(--|\/\/|#|\/\*|\*).*/.test(line)) {
          cleanedLines.push(line);
          continue;
        }

        const text = line
          .replace(/\s+/g, ' ')
          .replace(/\s*([(),;])\s*/g, ' $1 ')
          .replace(/\s+/g, ' ')
          .trim();

        cleanedLines.push(text);
      }

      return cleanedLines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
    }

    function splitSqlTokens(value) {
      const normalized = normalizeSqlInput(value);
      if (!normalized) return [];

      const tokens = normalized.match(/--.*$|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|<=|>=|<>|!=|=|<|>|,|\(|\)|;|[A-Za-z_][A-Za-z0-9_]*|\d+|\*|\+|-|\/|\./g) || [];
      return tokens.filter((token) => token && token.trim() !== '');
    }

    function matchesCtePattern(snippet) {
      return SQL_INDENT_RULES.ctePatterns.some((pattern) => {
        if (pattern.global) {
          pattern.lastIndex = 0;
        }
        return pattern.test(snippet);
      });
    }

    function buildSqlIndentDebug(sql) {
      const tokens = splitSqlTokens(sql);
      const decisions = [];
      let indent = 0;

      for (let index = 0; index < tokens.length; index += 1) {
        const token = tokens[index];
        const upper = token.toUpperCase();
        const beforeIndent = indent;
        const snippet = tokens.slice(Math.max(0, index - 2), Math.min(tokens.length, index + 3)).join(' ');
        const cteMatch = matchesCtePattern(snippet);

        let action = 'same';
        let afterIndent = indent;

        if (token === '(') {
          action = 'increase';
          afterIndent = indent + 1;
          indent = afterIndent;
        } else if (token === ')' || SQL_INDENT_RULES.decreaseWords.includes(upper)) {
          action = 'decrease';
          afterIndent = Math.max(0, indent - 1);
          indent = afterIndent;
        } else if (cteMatch || SQL_INDENT_RULES.increaseWords.includes(upper)) {
          action = 'increase';
          afterIndent = indent + 1;
          indent = afterIndent;
        } else if (SQL_INDENT_RULES.noIndentWords.includes(upper)) {
          action = 'same';
          afterIndent = indent;
        }

        decisions.push({
          index,
          token,
          beforeIndent,
          afterIndent,
          action,
          newLine: token === ',' || ['FROM', 'WHERE', 'GROUP', 'ORDER', 'HAVING', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'UNION', 'INTERSECT', 'EXCEPT', 'VALUES', 'ON', 'AND', 'OR', 'WHEN', 'THEN'].includes(upper),
          reason: cteMatch ? 'cte-pattern' : upper,
          noIndent: SQL_INDENT_RULES.noIndentWords.includes(upper),
          pattern: cteMatch ? 'WITH cte AS ( or , cte2 AS (' : null
        });
      }

      return {
        rules: {
          increaseWords: SQL_INDENT_RULES.increaseWords,
          decreaseWords: SQL_INDENT_RULES.decreaseWords,
          noIndentWords: SQL_INDENT_RULES.noIndentWords,
          ctePatterns: [
            'WITH cte AS (',
            ', cte2 AS ('
          ]
        },
        decisions
      };
    }

    function formatSqlCore(sql) {
      const clean = normalizeSqlInput(sql);
      if (!clean) return '';

      const tokens = splitSqlTokens(clean);
      const lines = [];
      let indent = 0;
      let previousToken = '';

      for (let index = 0; index < tokens.length; index += 1) {
        const token = tokens[index];
        const upper = token.toUpperCase();
        const nextToken = tokens[index + 1] || '';
        const snippet = tokens.slice(Math.max(0, index - 2), Math.min(tokens.length, index + 3)).join(' ');
        const ctePattern = matchesCtePattern(snippet);

        if (token === ';') {
          if (lines.length > 0 && lines[lines.length - 1] !== '') {
            lines.push('');
          }
          lines.push(';');
          continue;
        }

        if (token === ',') {
          lines.push(',');
          if (nextToken && nextToken !== ';') {
            lines.push('\n' + '  '.repeat(indent));
          }
          continue;
        }

        if (token === '(') {
          lines.push('(');
          indent += 1;
          continue;
        }

        if (token === ')') {
          indent = Math.max(0, indent - 1);
          lines.push(')');
          continue;
        }

        if (ctePattern && upper === 'AS') {
          lines.push(' AS');
          lines.push(' (');
          indent += 1;
          continue;
        }

        if (['WITH', 'SELECT', 'FROM', 'WHERE', 'GROUP', 'ORDER', 'HAVING', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'UNION', 'INTERSECT', 'EXCEPT', 'VALUES', 'ON', 'CASE', 'WHEN', 'THEN', 'SET'].includes(upper) && lines.length > 0) {
          const lastLine = lines[lines.length - 1];
          if (lastLine !== '' && !lastLine.endsWith('\n')) {
            lines.push('\n' + '  '.repeat(indent));
          }
        }

        if (['AND', 'OR'].includes(upper)) {
          lines.push('\n' + '  '.repeat(indent) + upper + ' ');
          previousToken = upper;
          continue;
        }

        if (upper === 'AS' && previousToken && ['WITH', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'FULL'].includes(previousToken.toUpperCase())) {
          lines.push(' AS ');
          previousToken = upper;
          continue;
        }

        if (outputNeedsSpacing(previousToken, upper)) {
          lines.push(' ');
        }

        lines.push(token);
        previousToken = token;
      }

      const formatted = lines.join('')
        .replace(/\s+\n/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .replace(/\s*\(\s*/g, ' (')
        .replace(/\s*\)\s*/g, ') ')
        .replace(/\s+,\s*/g, ', ')
        .trim();

      return formatted.endsWith(';') ? formatted : `${formatted};`;
    }

    function outputNeedsSpacing(previousToken, currentToken) {
      if (!previousToken) return false;
      if (currentToken === '(' || currentToken === ')' || currentToken === ',') return false;
      if (previousToken === '(' || previousToken === ',' || previousToken === ';') return false;
      return true;
    }

    function formatSql() {
      const raw = document.getElementById('sqlInput').value;
      const output = formatSqlCore(raw, 'standard');
      document.getElementById('sqlOutput').textContent = output;
      updateSqlInputSummary();
    }

    function formatSql2() {
      const raw = document.getElementById('sqlInput').value;
      const output = formatSqlCore(raw);
      document.getElementById('sqlOutput').textContent = output;
      updateSqlInputSummary();
    }

    function clearSql() {
      document.getElementById('sqlInput').value = '';
      document.getElementById('sqlOutput').textContent = '';
      updateSqlInputSummary();
    }

    document.getElementById('sqlInput').addEventListener('input', updateSqlInputSummary);
    updateSqlInputSummary();
   + '; return { formatSql, formatSql2, updateSqlInputSummary, buildSqlIndentDebug };');
const api = fn(document);
console.log(JSON.stringify(api.buildSqlIndentDebug(elements.sqlInput.value), null, 2));
api.formatSql();
console.log('FORMATTED=' + elements.sqlOutput.textContent);
