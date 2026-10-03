function formatSql() {
      const sql = document.getElementById('sqlInput').value.trim();
      const output = sql
        .replace(/SELECT/g, '\nSELECT')
        .replace(/FROM/g, '\nFROM')
        .replace(/WHERE/g, '\nWHERE')
        .replace(/ORDER BY/g, '\nORDER BY')
        .replace(/;/g, ';\n');
      document.getElementById('sqlOutput').textContent = output;
    }

    function clearSql() {
      document.getElementById('sqlInput').value = '';
      document.getElementById('sqlOutput').textContent = '';
    }

    document.querySelector('[data-sql-action="format"]')?.addEventListener('click', formatSql);
    document.querySelector('[data-sql-action="clear"]')?.addEventListener('click', clearSql);
