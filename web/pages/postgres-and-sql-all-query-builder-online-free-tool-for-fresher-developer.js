function updateTableName() {

  const tableName =
    document
      .getElementById('tableName')
      .value
      .trim() || 'your_table_name';

  document
    .querySelectorAll('.sql-template')
    .forEach(element => {

      if (!element.dataset.template) {
        element.dataset.template =
          element.textContent;
      }

      element.textContent =
        element.dataset.template.replaceAll(
          'your_table_name',
          tableName
        );

    });

}

document.addEventListener(
  'DOMContentLoaded',
  () => {

    const input =
      document.getElementById('tableName');

    input.addEventListener(
      'input',
      updateTableName
    );

    document.querySelectorAll('[data-copy-query]').forEach(button => {
      button.addEventListener('click', () => copyQuery(button));
    });

    updateTableName();

  }
);




function copyQuery(button) {

  const query =
    button
      .closest('.query-card')
      .querySelector('.sql-template')
      .textContent;

  navigator.clipboard.writeText(query);

  const originalText = button.textContent;

  button.textContent = 'Copied';

  setTimeout(() => {
    button.textContent = originalText;
  }, 1500);

}
