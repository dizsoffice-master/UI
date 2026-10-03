(() => {
      const left = document.querySelector('#json-diff-left');
      const right = document.querySelector('#json-diff-right');
      const state = { differences: [], display: 'all', syncing: false, timer: null };
      const byId = id => document.querySelector(`#${id}`);
      const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
      const pathLabel = path => path || '$';
      const jsonValue = value => JSON.stringify(value);

      function compareValues(leftValue, rightValue, path, differences) {
        if (isObject(leftValue) && isObject(rightValue)) {
          const keys = new Set([...Object.keys(leftValue), ...Object.keys(rightValue)]);
          keys.forEach(key => {
            const childPath = `${path}.${key}`;
            if (!(key in rightValue)) differences.push({ type: 'missing', path: childPath, value: leftValue[key] });
            else if (!(key in leftValue)) differences.push({ type: 'added', path: childPath, value: rightValue[key] });
            else compareValues(leftValue[key], rightValue[key], childPath, differences);
          });
          return;
        }
        if (Array.isArray(leftValue) && Array.isArray(rightValue)) {
          const length = Math.max(leftValue.length, rightValue.length);
          for (let index = 0; index < length; index += 1) {
            const childPath = `${path}[${index}]`;
            if (index >= rightValue.length) differences.push({ type: 'missing', path: childPath, value: leftValue[index] });
            else if (index >= leftValue.length) differences.push({ type: 'added', path: childPath, value: rightValue[index] });
            else compareValues(leftValue[index], rightValue[index], childPath, differences);
          }
          return;
        }
        if (jsonValue(leftValue) !== jsonValue(rightValue)) differences.push({ type: 'changed', path, left: leftValue, right: rightValue });
      }

      function parseEditor(editor, statusId, side) {
        try {
          const parsed = JSON.parse(editor.value);
          const status = byId(statusId);
          status.className = 'json-diff-status';
          status.textContent = `${side} JSON is valid`;
          return parsed;
        } catch (error) {
          const status = byId(statusId);
          const match = error.message.match(/position (\d+)/i);
          const position = match ? Number(match[1]) : 0;
          const before = editor.value.slice(0, position);
          const line = before.split('\n').length;
          const column = position - before.lastIndexOf('\n');
          status.className = 'json-diff-status invalid';
          status.textContent = `Invalid JSON on ${side} (line ${line}, column ${column}): ${error.message}`;
          return null;
        }
      }

      function sortedByReference(value, reference) {
        if (Array.isArray(value)) return value.map((item, index) => sortedByReference(item, reference && reference[index]));
        if (!isObject(value)) return value;
        const referenceKeys = isObject(reference) ? Object.keys(reference) : [];
        const keys = [...referenceKeys, ...Object.keys(value).filter(key => !referenceKeys.includes(key))];
        return Object.fromEntries(keys.filter(key => key in value).map(key => [key, sortedByReference(value[key], reference && reference[key])]));
      }

      function sortKeys(value) {
        if (Array.isArray(value)) return value.map(sortKeys);
        if (!isObject(value)) return value;
        return Object.fromEntries(Object.keys(value).sort().map(key => [key, sortKeys(value[key])]));
      }

      function formatEditor(editor, statusId, side, sorter = value => value) {
        const parsed = parseEditor(editor, statusId, side);
        if (parsed !== null) editor.value = JSON.stringify(sorter(parsed), null, 2);
        compare();
      }

      function lineNumbersForPaths(editor, differences, side) {
        const lines = editor.value.split('\n');
        const markers = byId(`json-diff-markers-${side}`);
        markers.innerHTML = '';
        lines.forEach((line, index) => {
          const marker = document.createElement('span');
          const lineKey = side === 'left' ? 'leftLine' : 'rightLine';
          const hit = differences.find(item => item[lineKey] === index + 1);
          if (hit) marker.className = hit.type;
          markers.appendChild(marker);
        });
      }

      function lineForPath(editor, path) {
        const keyMatch = path.match(/\.([^.[\]]+)$|\[(\d+)\]$/);
        if (!keyMatch) return 1;
        const token = keyMatch[1] || keyMatch[2];
        const lines = editor.value.split('\n');
        const pattern = keyMatch[1] ? new RegExp(`["']${token}["']\\s*:`) : new RegExp(`^\\s*\\[?\\s*${token}[,\\]:]`);
        const index = lines.findIndex(line => pattern.test(line));
        return index < 0 ? 1 : index + 1;
      }

      function updateSummary() {
        const shown = state.differences.filter(item => state.display === 'all' || item.type === state.display);
        byId('json-diff-total').textContent = state.differences.length;
        byId('json-diff-missing-count').textContent = state.differences.filter(item => item.type === 'missing').length;
        byId('json-diff-added-count').textContent = state.differences.filter(item => item.type === 'added').length;
        byId('json-diff-changed-count').textContent = state.differences.filter(item => item.type === 'changed').length;
        const list = byId('json-diff-list');
        list.innerHTML = shown.length ? shown.map(item => `<div class="json-diff-item ${item.type}" title="${item.type.toUpperCase()}"><code>${item.path}</code><span>${item.type.toUpperCase()}</span></div>`).join('') : '<p class="json-diff-empty">No differences match this filter.</p>';
      }

      function compare() {
        const leftValue = parseEditor(left, 'json-diff-status-left', 'Left');
        const rightValue = parseEditor(right, 'json-diff-status-right', 'Right');
        if (leftValue === null || rightValue === null) { state.differences = []; updateSummary(); return; }
        const differences = [];
        compareValues(leftValue, rightValue, '$', differences);
        differences.forEach(item => {
          if (item.type === 'missing' || item.type === 'changed') {
            item.leftLine = lineForPath(left, item.path);
          }
          if (item.type === 'added' || item.type === 'changed') {
            item.rightLine = lineForPath(right, item.path);
          }
        });
        state.differences = differences;
        lineNumbersForPaths(left, differences, 'left');
        lineNumbersForPaths(right, differences, 'right');
        updateSummary();
      }

      function scheduleCompare() {
        clearTimeout(state.timer);
        state.timer = setTimeout(() => { if (byId('json-diff-auto-compare').checked) compare(); }, 220);
      }

      function syncScroll(source, target) {
        if (state.syncing) return;
        state.syncing = true;
        target.scrollTop = source.scrollTop;
        target.scrollLeft = source.scrollLeft;
        requestAnimationFrame(() => { state.syncing = false; });
      }

      function copyEditor(editor, button) {
        navigator.clipboard.writeText(editor.value).then(() => { const label = button.textContent; button.textContent = 'Copied!'; setTimeout(() => { button.textContent = label; }, 1200); });
      }

      left.addEventListener('input', scheduleCompare); right.addEventListener('input', scheduleCompare);
      left.addEventListener('scroll', () => syncScroll(left, right)); right.addEventListener('scroll', () => syncScroll(right, left));
      byId('json-diff-compare').addEventListener('click', compare);
      byId('json-diff-format-left').addEventListener('click', () => formatEditor(left, 'json-diff-status-left', 'Left'));
      byId('json-diff-format-right').addEventListener('click', () => formatEditor(right, 'json-diff-status-right', 'Right'));
      byId('json-diff-sort-left').addEventListener('click', () => formatEditor(left, 'json-diff-status-left', 'Left', sortKeys));
      const alignRight = () => { const leftValue = parseEditor(left, 'json-diff-status-left', 'Left'); const rightValue = parseEditor(right, 'json-diff-status-right', 'Right'); if (leftValue !== null && rightValue !== null) right.value = JSON.stringify(sortedByReference(rightValue, leftValue), null, 2); compare(); };
      byId('json-diff-align-right').addEventListener('click', alignRight); byId('json-diff-align-right-side').addEventListener('click', alignRight);
      byId('json-diff-copy-left').addEventListener('click', event => copyEditor(left, event.currentTarget)); byId('json-diff-copy-right').addEventListener('click', event => copyEditor(right, event.currentTarget));
      document.querySelectorAll('input[name="json-diff-display"]').forEach(input => input.addEventListener('change', event => { state.display = event.target.value; updateSummary(); }));
      compare();
    })();
