(function () {
  'use strict';

  const lessons = [
    ['Testing foundations and strategy', 'database-testing-course-free-online.html'],
    ['Safe test environments and isolation', 'database-testing-course-02-test-environments-free-online.html'],
    ['Deterministic fixtures and test data', 'database-testing-course-03-test-data-free-online.html'],
    ['Test SQL reads and data changes', 'database-testing-course-04-sql-crud-free-online.html'],
    ['Constraints, transactions, and rollback', 'database-testing-course-05-constraints-transactions-free-online.html'],
    ['Integration and application tests', 'database-testing-course-06-integration-api-free-online.html'],
    ['Schema migration and upgrade tests', 'database-testing-course-07-migrations-free-online.html'],
    ['Concurrency and isolation testing', 'database-testing-course-08-concurrency-free-online.html'],
    ['Performance, recovery, and security tests', 'database-testing-course-09-performance-security-free-online.html'],
    ['Test automation and pipeline capstone', 'database-testing-course-10-pipeline-capstone-free-online.html']
  ];

  const root = document.querySelector('[data-database-testing-course]');
  if (!root) return;

  const navigation = root.querySelector('[data-database-testing-lessons]');
  if (navigation) {
    const list = document.createElement('ol');
    lessons.forEach(([title, file], index) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = file;
      link.dataset.lessonNumber = String(index + 1);
      link.textContent = title;
      item.append(link);
      list.append(item);
    });
    navigation.append(list);
  }

  window.ExcelFormulaCourse.initPage(Number(root.dataset.lessonNumber) || 1);
}());
