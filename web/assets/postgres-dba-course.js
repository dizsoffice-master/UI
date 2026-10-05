(function () {
  'use strict';

  const lessons = [
    ['DBA foundations and safe operations', 'postgres-dba-course-free-online.html'],
    ['Daily health checks and monitoring', 'postgres-dba-course-02-daily-health-checks-free-online.html'],
    ['Issue tracking and incident triage', 'postgres-dba-course-03-incident-triage-free-online.html'],
    ['Backup, restore, and recovery', 'postgres-dba-course-04-backup-recovery-free-online.html'],
    ['Weekly maintenance', 'postgres-dba-course-05-weekly-maintenance-free-online.html'],
    ['Monthly capacity and security', 'postgres-dba-course-06-monthly-operations-free-online.html'],
    ['Yearly continuity and upgrades', 'postgres-dba-course-07-yearly-readiness-free-online.html'],
    ['Query performance diagnosis', 'postgres-dba-course-08-query-performance-free-online.html'],
    ['Optimization and safe cleanup', 'postgres-dba-course-09-optimization-cleanup-free-online.html'],
    ['Automation and DBA runbook', 'postgres-dba-course-10-runbook-capstone-free-online.html']
  ];

  const root = document.querySelector('[data-postgres-dba-course]');
  if (!root) return;

  const navigation = root.querySelector('[data-postgres-dba-lessons]');
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
