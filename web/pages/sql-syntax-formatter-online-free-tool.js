function updateSqlInputSummary() {
      const sqlInput = document.getElementById('sqlInput');
      const summary = document.getElementById('sqlInputSummary');
      const value = sqlInput.value;
      const totalLines = value === '' ? 0 : value.split(/\r\n|\r|\n/).length;
      const totalCharacters = value.length;
      summary.textContent = `Total Lines: ${totalLines} | Total Characters: ${totalCharacters}`;
      return summary.textContent;
    }

    const SQL_INDENT_RULES = {
      increaseWords: ['DECLARE','WITH', 'SELECT', 'FROM', 'WHERE', 'GROUP', 'ORDER', 'HAVING', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'UNION', 'INTERSECT', 'EXCEPT', 'VALUES', 'CASE', 'WHEN', 'THEN', 'ON', 'SET', 'INSERT', 'UPDATE', 'DELETE', 'RETURNING'],
      decreaseWords: ['END', 'WHEN', 'THEN'],
      noIndentWords: ['AS', 'AND', 'OR', 'BY', 'ON', 'IN', 'IS', 'NOT', 'LIKE', 'NULL', 'ASC', 'DESC', 'DISTINCT', 'ALL', 'ANY', 'BETWEEN', 'EXISTS', 'LIMIT', 'OFFSET', 'TOP'],
      ctePatterns: [
        /\bWITH\s+[A-Za-z_][A-Za-z0-9_]*\s+AS\s*\(/i,
        /,\s*[A-Za-z_][A-Za-z0-9_]*\s+AS\s*\(/gi
      ]
    };

    const SQL_LOGGING_ENABLED = true;

    function logSqlStep(functionName, details) {
      if (SQL_LOGGING_ENABLED) {
        console.log(`[SQL Formatter] ${functionName}`, details ?? 'completed');
      }
    }
    let SQL_GLOBAL_INDENT = 0;

    function buildSqlIndentDebug(sql) {
      const decisions = [];

      const lines = sql
        .split('\n')
        .map(line => line.trim())
        .filter(Boolean);

      console.log('Total lines:', lines.length);

      const increasePatterns = [
        /^DECLARE\b/i,
        /^BEGIN\b/i,
        /^LOOP\b/i,
        /^IF\b.*\bTHEN\b/i,
      ];

      const decreasePatterns = [
        /^END\b/i,
        /^END IF\b/i,
        /^END LOOP\b/i
      ];

      const neutralPatterns = [
        /^SELECT\b/i,
        /^FROM\b/i,
        /^WHERE\b/i,
        /^GROUP BY\b/i,
        /^ORDER BY\b/i,
        /^HAVING\b/i,
        /^LIMIT\b/i,
        /^OFFSET\b/i,
        /^JOIN\b/i,
        /^LEFT JOIN\b/i,
        /^RIGHT JOIN\b/i,
        /^INNER JOIN\b/i,
        /^FULL JOIN\b/i,
        /^ON\b/i,
        /^WHEN\b/i,
        /^ELSE\b/i
      ];

      for (let index = 0; index < lines.length; index++) {
        const line = lines[index];

        const firstWord =
          line.split(/\s+/)[0]?.toUpperCase() || '';

        let beforeIndent = SQL_GLOBAL_INDENT;
        let afterIndent = SQL_GLOBAL_INDENT;
        let action = 'same';

        // Check IF ... THEN
        const isIfThen = /^IF\b.*\bTHEN\b/i.test(line);

        // -----------------------------------------
        // DECREASE
        // -----------------------------------------
        const shouldDecrease =
          decreasePatterns.some(pattern => pattern.test(line));

        console.log(
          `Line ${index + 1}: "${line}" - ` +
          `First Word: "${firstWord}" - ` +
          `Before Indent: ${beforeIndent} - ` +
          `After Indent: ${afterIndent} - ` +
          `Action: ${action} - ` +
          `Should Decrease: ${shouldDecrease}`
        );

        if (shouldDecrease) {
          SQL_GLOBAL_INDENT = Math.max(
            0,
            SQL_GLOBAL_INDENT - 1
          );

          beforeIndent = SQL_GLOBAL_INDENT;
          afterIndent = SQL_GLOBAL_INDENT;
          action = 'decrease';
        }

        // -----------------------------------------
        // DECISION
        // -----------------------------------------
        decisions.push({
          index,
          line,
          firstWord,
          beforeIndent,
          afterIndent,
          action,

          // NEW
          blankLineAfter: isIfThen,

          newLine: true,
          reason: firstWord
        });

        // -----------------------------------------
        // INCREASE
        // -----------------------------------------
        const shouldIncrease =
          increasePatterns.some(pattern => pattern.test(line));

        console.log(
          `Line ${index + 1}: "${line}" - ` +
          `First Word: "${firstWord}" - ` +
          `Before Indent: ${beforeIndent} - ` +
          `After Indent: ${afterIndent} - ` +
          `Action: ${action} - ` +
          `Should Increase: ${shouldIncrease}`
        );

        if (shouldIncrease) {
          SQL_GLOBAL_INDENT += 1;

          decisions[decisions.length - 1].afterIndent =
            SQL_GLOBAL_INDENT;

          decisions[decisions.length - 1].action =
            'increase';
        }

        // -----------------------------------------
        // PARENTHESES
        // -----------------------------------------
        const openParens =
          (line.match(/\(/g) || []).length;

        const closeParens =
          (line.match(/\)/g) || []).length;

        if (openParens > closeParens) {
          SQL_GLOBAL_INDENT +=
            openParens - closeParens;
        }

        if (closeParens > openParens) {
          SQL_GLOBAL_INDENT = Math.max(
            0,
            SQL_GLOBAL_INDENT -
              (closeParens - openParens)
          );
        }
      }

      const debugResult = {
        rules: {
          increasePatterns: increasePatterns.map(
            item => item.toString()
          ),

          decreasePatterns: decreasePatterns.map(
            item => item.toString()
          ),

          neutralPatterns: neutralPatterns.map(
            item => item.toString()
          )
        },

        finalIndent: SQL_GLOBAL_INDENT,
        decisions
      };

      logSqlStep('buildSqlIndentDebug', {
        lineCount: lines.length,
        finalIndent: SQL_GLOBAL_INDENT
      });

      return debugResult;
    }

    function addLineBreaker(sql) {
      if (!sql) return '';

      // Store comments temporarily
      const comments = [];

      // Replace comments with placeholders
      let workingSql = sql.replace(
        /\/\*[\s\S]*?\*\/|--.*?(?=\r?\n|$)/g,
        (match) => {
          const index = comments.length;
          comments.push(match);
          return `__COMMENT_${index}__`;
        }
      );

      // Normalize whitespace first
      workingSql = workingSql
        .replace(/\r\n/g, '\n')
        .replace(/[ \t]+/g, ' ')
        .trim();

      // Keywords that should start on a new line
      const breakBeforePatterns = [
        'WITH',
        'SELECT',
        'FROM',
        'WHERE',
        'GROUP BY',
        'HAVING',
        'ORDER BY',
        'UNION ALL',
        'UNION',
        'JOIN',
        'END IF',
        'ELSEIF',
        'ELSE',
        'IF',
        'END'
      ];

      // Sort longest first to avoid partial matches
      breakBeforePatterns.sort((a, b) => b.length - a.length);

      const joinRegex = new RegExp(
        '\\s+((?:(?:INNER|LEFT|RIGHT|FULL|FULL\\s+OUTER|CROSS|OUTER)\\s+)?JOIN)\\b',
        'gi'
      );

      workingSql = workingSql.replace(
        joinRegex,
        '\n$1'
      );

      for (const keyword of breakBeforePatterns) {
        if (keyword === 'JOIN') {
          continue;
        }

        const escapedKeyword = keyword.replace(/\s+/g, '\\s+');
        if (keyword === 'IF') {
          const regex = new RegExp(
            `\\s+(IF\\b)(?!\\s*;)`,
            'gi'
          );
          workingSql = workingSql.replace(regex, '\n$1');
          continue;
        }

        const regex = new RegExp(
          `\\s+(${escapedKeyword})\\b`,
          'gi'
        );

        workingSql = workingSql.replace(regex, '\n$1');
      }

      // CASE formatting
      // Break line after semicolon
      workingSql = workingSql.replace(/\bCASE\b/gi, '\nCASE');
      workingSql = workingSql.replace(/\bTHEN\b/gi, ' THEN\n');

      workingSql = workingSql.replace(/\s*;\s*/g, ';\n');
      // Remove duplicate blank lines
      workingSql = workingSql.replace(/\n{2,}/g, '\n');

      // Restore comments
      workingSql = workingSql.replace(
        /__COMMENT_(\d+)__/g,
        (_, index) => comments[Number(index)]
      );

      // Clean lines
      workingSql = workingSql
        .split('\n')
        .map(line => line.trim())
        .filter(Boolean)
        .join('\n');

      // ON belongs to its JOIN clause and must not start a new line.
      workingSql = workingSql
        .split('\n')
        .reduce((lines, line) => {
          if (/^ON\b/i.test(line) && lines.length > 0) {
            lines[lines.length - 1] += ` ${line}`;
          } else {
            lines.push(line);
          }
          return lines;
        }, [])
        .join('\n');




      logSqlStep('addLineBreaker', {
        outputLength: workingSql.length,
        commentCount: comments.length
      });

      const debug = buildSqlIndentDebug(workingSql);
      const formatted = debug.decisions
        .map((decision) => `${'    '.repeat(decision.beforeIndent)}${decision.line}`)
        .join('\n');
      SQL_GLOBAL_INDENT = 0;
      logSqlStep('addLineBreaker', { lineCount: debug.decisions.length });
      return formatted;
    }

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

        cleanedLines.push(line.replace(/\s+/g, ' ').trim());
      }
      let normalized = cleanedLines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
      normalized = addLineBreaker(normalized);
      logSqlStep('normalizeSqlInput', { lineCount: normalized ? normalized.split('\n').length : 0 });
      return normalized;
    }

    function formatSqlCore(sql) {
      const clean = normalizeSqlInput(sql);
      if (!clean) return '';

      const formatted = clean
        .replace(/\s*;\s*/g, '; ')
        .replace(/([^\n\s])[ \t]+/g, '$1 ')
        .trim();

      const output = formatted.endsWith(';') ? formatted : `${formatted};`;
      logSqlStep('formatSqlCore', { outputLength: output.length });
      return output;
    }

    function formatSql() {
      const raw = document.getElementById('sqlInput').value;
      const output = normalizeSqlInput(raw);
      document.getElementById('sqlOutput').textContent = output;
      updateSqlInputSummary();
      logSqlStep('formatSql');
      return output;
    }

    function formatSql2() {
      const raw = document.getElementById('sqlInput').value;
     // const output = formatSqlCore(raw);
      const output = normalizeSqlInput(raw);
      document.getElementById('sqlOutput').textContent = output;
      updateSqlInputSummary();
      logSqlStep('formatSql2');
      return output;
    }

    function clearSql() {
      document.getElementById('sqlInput').value = '';
      document.getElementById('sqlOutput').textContent = '';
      updateSqlInputSummary();
      logSqlStep('clearSql');
      return '';
    }

    document.getElementById('sqlInput').addEventListener('input', updateSqlInputSummary);
    document.querySelectorAll('[data-sql-action]').forEach(button => {
      button.addEventListener('click', () => {
        if (button.dataset.sqlAction === 'format') formatSql();
        if (button.dataset.sqlAction === 'format-alt') formatSql2();
        if (button.dataset.sqlAction === 'clear') clearSql();
      });
    });
    updateSqlInputSummary();
