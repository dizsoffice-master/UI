(function () {
  'use strict';

  const lessons = [
    ['CloudWatch logs and monitoring foundations', 'aws-cloudwatch-dba-course-free-online.html'],
    ['Enable database and application logs', 'aws-cloudwatch-dba-course-02-rds-log-setup-free-online.html'],
    ['Log groups, streams, retention, and access', 'aws-cloudwatch-dba-course-03-log-groups-streams-free-online.html'],
    ['Find issue times and correlate events', 'aws-cloudwatch-dba-course-04-time-correlation-free-online.html'],
    ['Search logs with CloudWatch Logs Insights', 'aws-cloudwatch-dba-course-05-insights-queries-free-online.html'],
    ['Analyze errors and database incidents', 'aws-cloudwatch-dba-course-06-errors-incidents-free-online.html'],
    ['Locate long-running and slow queries', 'aws-cloudwatch-dba-course-07-long-queries-free-online.html'],
    ['Trace application requests to database logs', 'aws-cloudwatch-dba-course-08-app-correlation-free-online.html'],
    ['Dashboards, metrics, and actionable alarms', 'aws-cloudwatch-dba-course-09-metrics-alarms-free-online.html'],
    ['Build a log investigation runbook', 'aws-cloudwatch-dba-course-10-runbook-capstone-free-online.html']
  ];

  const root = document.querySelector('[data-aws-cloudwatch-course]');
  if (!root) return;

  const navigation = root.querySelector('[data-aws-cloudwatch-lessons]');
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
