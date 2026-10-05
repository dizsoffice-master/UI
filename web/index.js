document.querySelectorAll('.home-course-group ol').forEach((lessonList) => {
  if (lessonList.children.length > 10) lessonList.classList.add('is-scrollable');
});
