const dashboardSessionKey = 'karauli_dashboard_session';
    const validSession = sessionStorage.getItem(dashboardSessionKey) === 'active';

    if (!validSession) {
      window.location.href = 'login-required.html';
    }

    function logoutDashboard() {
      sessionStorage.removeItem(dashboardSessionKey);
      window.location.href = 'login-required.html';
    }

    document.querySelector('[data-dashboard-action="logout"]')?.addEventListener('click', logoutDashboard);
