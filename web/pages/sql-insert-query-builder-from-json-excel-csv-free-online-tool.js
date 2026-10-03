const builderState = {
      tableName: '',
      columns: [],
      sourceHeaders: [],
      rows: [],
      mapping: [],
      sourceType: 'json'
    };

    window.addEventListener('DOMContentLoaded', () => {
      toggleSourceInput();
      document.getElementById('sourceType').addEventListener('change', toggleSourceInput);
      document.addEventListener('click', event => {
        const button = event.target.closest('[data-sql-insert-action], [data-copy-output], [data-output-tab]');
        if (!button) return;
        if (button.hasAttribute('data-copy-output')) {
          copyOutput(button.dataset.copyOutput);
          return;
        }
        if (button.hasAttribute('data-output-tab')) {
          showOutput(button.dataset.outputTab);
          return;
        }
        switch (button.dataset.sqlInsertAction) {
          case 'read-table': readTableDefinition(); break;
          case 'step': goToStep(Number(button.dataset.stepTarget)); break;
          case 'toggle-source': toggleSourceInput(); break;
          case 'read-source': readSourceData(); break;
          case 'open-mapping': openMapping(); break;
          case 'confirm-mapping': confirmMapping(); break;
          case 'save-mapping': saveMappingPopup(); break;
          case 'close-mapping': closeMapping(); break;
        }
      });
    });

    function setStatus(id, message) {
      document.getElementById(id).textContent = message;
    }

    function readTableDefinition() {
      try {
        const definition = document.getElementById('tableDefinition').value.trim();
        const match = definition.match(/create\s+table\s+(?:if\s+not\s+exists\s+)?([\w."`]+)\s*\(([\s\S]*)\)\s*;?$/i);
        if (!match) throw new Error('Paste a complete CREATE TABLE definition.');

        const tableName = match[1].replaceAll('"', '').replaceAll('`', '');
        const entries = splitSqlList(match[2]);
        const columns = entries
          .filter(entry => !/^\s*(constraint|primary\s+key|unique|foreign\s+key|check|exclude)\b/i.test(entry))
          .map(entry => {
            const columnMatch = entry.trim().match(/^(?:"([^"]+)"|`([^`]+)`|([\w]+))/);
            return columnMatch && (columnMatch[1] || columnMatch[2] || columnMatch[3]);
          })
          .filter(Boolean);

        if (!tableName || !columns.length) throw new Error('No table columns were found.');
        if (new Set(columns.map(column => column.toLowerCase())).size !== columns.length) throw new Error('Table columns must be unique.');

        builderState.tableName = tableName;
        builderState.columns = columns;
        setStatus('tableStatus', `${tableName}: ${columns.length} table column(s) read in SQL order.`);
        return true;
      } catch (error) {
        setStatus('tableStatus', error.message);
        return false;
      }
    }

    function splitSqlList(text) {
      const entries = [];
      let entry = '', depth = 0, quote = '';
      for (const character of text) {
        if (quote) {
          entry += character;
          if (character === quote) quote = '';
        } else if (character === '"' || character === "'") {
          quote = character;
          entry += character;
        } else if (character === '(') {
          depth++;
          entry += character;
        } else if (character === ')') {
          depth--;
          entry += character;
        } else if (character === ',' && depth === 0) {
          entries.push(entry);
          entry = '';
        } else {
          entry += character;
        }
      }
      if (entry.trim()) entries.push(entry);
      return entries;
    }

    function toggleSourceInput() {
      const type = document.getElementById('sourceType').value;
      document.getElementById('fileInputLabel').hidden = type !== 'excel';
      document.getElementById('dataInput').hidden = type === 'excel';
      builderState.sourceType = type;
    }

    async function readSourceData() {
      try {
        const type = document.getElementById('sourceType').value;
        let parsed;
        if (type === 'json') {
          parsed = parseJsonSource(document.getElementById('dataInput').value);
        } else if (type === 'csv') {
          parsed = parseCsvSource(document.getElementById('dataInput').value);
        } else {
          const file = document.getElementById('excelFile').files[0];
          if (!file || !window.XLSX) throw new Error('Choose an Excel file.');
          const workbook = XLSX.read(await file.arrayBuffer(), { type: 'array' });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          parsed = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
          parsed = rowsFromMatrix(parsed);
        }
        builderState.sourceHeaders = parsed.headers;
        builderState.rows = parsed.rows;
        builderState.sourceType = type;
        setStatus('sourceStatus', `${parsed.rows.length} data row(s) read and ${parsed.headers.length} source column(s) found.`);
        return true;
      } catch (error) {
        setStatus('sourceStatus', error.message || 'Unable to read source data.');
        return false;
      }
    }

    function parseJsonSource(text) {
      const value = JSON.parse(text);
      if (!Array.isArray(value) || !value.length || value.some(item => !item || Array.isArray(item) || typeof item !== 'object')) {
        throw new Error('JSON must be a non-empty array of objects.');
      }
      const headers = [...new Set(value.flatMap(item => Object.keys(item)))];
      return { headers, rows: value.map(item => headers.map(header => item[header] ?? null)) };
    }

    function parseCsvSource(text) {
      const matrix = text.trim().split(/\r?\n/).filter(Boolean).map(line => parseCsvLine(line));
      return rowsFromMatrix(matrix);
    }

    function parseCsvLine(line) {
      const cells = [];
      let cell = '', quoted = false;
      for (let index = 0; index < line.length; index++) {
        const char = line[index];
        if (char === '"' && line[index + 1] === '"' && quoted) { cell += '"'; index++; }
        else if (char === '"') quoted = !quoted;
        else if (char === ',' && !quoted) { cells.push(cell.trim()); cell = ''; }
        else cell += char;
      }
      cells.push(cell.trim());
      return cells;
    }

    function rowsFromMatrix(matrix) {
      if (!matrix.length || !matrix[0].length) throw new Error('The source must include a header row.');
      const headers = matrix[0].map((value, index) => String(value).trim() || `source_${index + 1}`);
      const rows = matrix.slice(1).filter(row => row.some(value => String(value).trim() !== '')).map(row => headers.map((_, index) => row[index] ?? null));
      return { headers, rows };
    }

    function openMapping() {
      if (!readTableDefinition()) return;
      if (!builderState.rows.length || !builderState.sourceHeaders.length) {
        setStatus('sourceStatus', 'Read source data before opening the mapping.');
        goToStep(2);
        return;
      }
      const oldMapping = builderState.mapping.length ? builderState.mapping : builderState.columns.map(column => builderState.sourceHeaders.findIndex(header => header.toLowerCase() === column.toLowerCase()));
      document.getElementById('mappingRows').innerHTML = builderState.columns.map((column, index) => {
        const selected = oldMapping[index] ?? -1;
        const options = `<option value="-1">Skip this column</option>` + builderState.sourceHeaders.map((header, sourceIndex) => `<option value="${sourceIndex}" ${sourceIndex === selected ? 'selected' : ''}>${sourceIndex + 1}. ${escapeHtml(header)}</option>`).join('');
        return `<div class="mapping-row"><span class="seq-badge">T${index + 1}</span><label>Table column<small>${escapeHtml(column)}</small></label><label>Source field<select data-map-index="${index}">${options}</select></label></div>`;
      }).join('');
      document.getElementById('mappingModal').classList.add('open');
    }

    function saveMappingPopup() {
      builderState.mapping = [...document.querySelectorAll('[data-map-index]')].map(select => Number(select.value));
      closeMapping();
      renderMappingSummary();
      goToStep(3);
    }

    function closeMapping() {
      document.getElementById('mappingModal').classList.remove('open');
    }

    function renderMappingSummary() {
      document.getElementById('mappingSummary').innerHTML = builderState.columns.map((column, index) => {
        const sourceIndex = builderState.mapping[index];
        return `<div class="mapping-row"><span class="seq-badge">T${index + 1}</span><label>Table column<small>${escapeHtml(column)}</small></label><label>Source field<small>${sourceIndex < 0 ? 'Skipped' : `S${sourceIndex + 1}: ${escapeHtml(builderState.sourceHeaders[sourceIndex])}`}</small></label></div>`;
      }).join('');
    }

    function confirmMapping() {
      if (!builderState.mapping.length) { setStatus('mappingStatus', 'Open and save the mapping first.'); return; }
      if (builderState.mapping.every(index => index < 0)) { setStatus('mappingStatus', 'Select at least one source field.'); return; }
      generateQueries();
      setStatus('mappingStatus', 'Mapping confirmed. PostgreSQL queries are ready.');
      goToStep(4);
    }

    function generateQueries() {
      const active = builderState.columns.map((column, index) => ({ column, source: builderState.mapping[index] })).filter(item => item.source >= 0);
      const table = quoteIdentifier(builderState.tableName);
      const columns = active.map(item => quoteIdentifier(item.column)).join(', ');
      const values = builderState.rows.map(row => `(${active.map(item => quoteLiteral(row[item.source])).join(', ')})`);
      const single = values.map(value => `INSERT INTO ${table} (${columns}) VALUES ${value};`).join('\n');
      const bulk = `INSERT INTO ${table} (${columns}) VALUES\n${values.join(',\n')};`;
      document.getElementById('singleOutput').textContent = single;
      document.getElementById('bulkOutput').textContent = bulk;
    }

    function quoteIdentifier(value) {
      return value.split('.').map(part => `"${part.replaceAll('"', '""')}"`).join('.');
    }

    function quoteLiteral(value) {
      if (value === null || value === undefined || String(value).trim().toLowerCase() === 'null') return 'NULL';
      if (typeof value === 'boolean' || String(value).trim().toLowerCase() === 'true' || String(value).trim().toLowerCase() === 'false') return String(value).trim().toUpperCase();
      if (typeof value === 'number' && Number.isFinite(value)) return String(value);
      return `'${String(value).replaceAll("'", "''")}'`;
    }

    function showOutput(type) {
      document.querySelectorAll('[data-output-tab]').forEach(button => button.classList.toggle('active', button.dataset.outputTab === type));
      document.querySelectorAll('[data-output-panel]').forEach(panel => panel.classList.toggle('active', panel.dataset.outputPanel === type));
    }

    async function copyOutput(type) {
      await navigator.clipboard.writeText(document.getElementById(`${type}Output`).textContent);
    }

    function goToStep(step) {
      if (step === 2 && !readTableDefinition()) return;
      document.querySelectorAll('[data-step]').forEach(section => section.classList.toggle('active', Number(section.dataset.step) === step));
      document.querySelectorAll('[data-step-pill]').forEach(pill => pill.classList.toggle('active', Number(pill.dataset.stepPill) === step));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function escapeHtml(value) {
      return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
    }
