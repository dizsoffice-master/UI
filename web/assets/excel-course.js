(function () {
  'use strict';

  const progressKey = 'excel-formula-course-completed';

  function readProgress(progressKey) {
    try {
      const saved = JSON.parse(localStorage.getItem(progressKey) || '[]');
      return Array.isArray(saved) ? saved.filter(Number.isInteger) : [];
    } catch {
      return [];
    }
  }

  function writeProgress(progressKey, progress) {
    try {
      localStorage.setItem(progressKey, JSON.stringify(progress));
    } catch {
      return false;
    }
    return true;
  }

  function createAdSlot(placement) {
    const slot = document.createElement('section');
    slot.className = 'ad-slot';
    slot.dataset.adPlacement = placement;
    slot.setAttribute('aria-label', 'Advertisement');
    return slot;
  }

  function mountCourseAds(root) {
    if (root.dataset.courseAdsMounted === 'true') return;
    const hero = root.querySelector('.excel-course-hero');
    const layout = root.querySelector('.excel-course-layout');
    if (!hero || !layout) return;

    hero.insertAdjacentElement('afterend', createAdSlot('top-primary'));

    const bottomAds = document.createElement('div');
    bottomAds.className = 'site-after-tool-ads';
    ['after-tool', 'after-info', 'before-footer'].forEach(placement => bottomAds.append(createAdSlot(placement)));
    layout.insertAdjacentElement('afterend', bottomAds);

    const adSidebar = document.createElement('aside');
    adSidebar.className = 'site-right-ads excel-course-ad-sidebar';
    adSidebar.setAttribute('aria-label', 'Advertisement sidebar');
    const adStack = document.createElement('div');
    adStack.className = 'ad-stack';
    ['rail-top', 'rail-middle', 'rail-bottom', 'rail-monetag'].forEach(placement => adStack.append(createAdSlot(placement)));
    adSidebar.append(adStack);
    layout.append(adSidebar);
    root.dataset.courseAdsMounted = 'true';
    window.initializeSiteAdSlots?.();
  }

  function initPage(lessonNumber) {
    const root = document.querySelector('[data-excel-course], [data-sql-course]');
    if (!root || root.dataset.courseInitialized === 'true') return;
    root.dataset.courseInitialized = 'true';
    const progressKey = root.dataset.courseKey || 'excel-formula-course-completed';
    const totalLessons = Number(root.dataset.courseTotal) || 10;

    const completeButton = root.querySelector('[data-course-complete]');
    const progressLabel = root.querySelector('[data-course-progress]');
    const search = root.querySelector('[data-course-search]');
    const results = root.querySelector('[data-course-results]');
    const rows = Array.from(root.querySelectorAll('[data-formula-row]'));

    function renderProgress() {
      const completed = readProgress(progressKey);
      const isComplete = completed.includes(lessonNumber);
      if (completeButton) {
        completeButton.textContent = isComplete ? 'Mark lesson incomplete' : 'Mark lesson complete';
        completeButton.setAttribute('aria-pressed', String(isComplete));
      }
      if (progressLabel) {
        progressLabel.textContent = `${completed.length} of ${totalLessons} lessons complete`;
      }
    }

    completeButton?.addEventListener('click', () => {
      const completed = readProgress(progressKey);
      const next = completed.includes(lessonNumber)
        ? completed.filter(number => number !== lessonNumber)
        : [...completed, lessonNumber].sort((left, right) => left - right);
      if (writeProgress(progressKey, next)) renderProgress();
    });

    search?.addEventListener('input', () => {
      const query = search.value.trim().toLocaleLowerCase();
      let visible = 0;
      rows.forEach(row => {
        row.hidden = Boolean(query) && !row.textContent.toLocaleLowerCase().includes(query);
        if (!row.hidden) visible += 1;
      });
      if (results) results.textContent = `${visible} formula${visible === 1 ? '' : 's'} shown`;
    });

    root.addEventListener('click', async event => {
      const button = event.target.closest('[data-copy-formula]');
      if (!button) return;
      const formula = button.dataset.copyFormula || '';
      try {
        await navigator.clipboard.writeText(formula);
        button.textContent = 'Copied';
        window.setTimeout(() => { button.textContent = 'Copy formula'; }, 1400);
      } catch {
        const status = root.querySelector('[data-course-copy-status]');
        if (status) status.textContent = 'Clipboard access is unavailable. Select and copy the formula text instead.';
      }
    });

    root.querySelectorAll('[data-lesson-number]').forEach(link => {
      if (Number(link.dataset.lessonNumber) === lessonNumber) link.setAttribute('aria-current', 'page');
    });

    mountCourseAds(root);
    renderProgress();
  }

  window.ExcelFormulaCourse = Object.freeze({ initPage });
}());