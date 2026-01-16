import { Router } from './router.js';

import './components/app-shell.js';
import './components/ui-toggle.js';
import './components/ui-card.js';
import './components/ui-button.js';
import './components/ui-progress.js';
import './components/ui-select.js';

import './components/quiz-question.js';
import './components/answer-option.js';

import './pages/login-page.js';
import './pages/dashboard-page.js';
import './pages/quiz-page.js';
import './pages/results-page.js';
import './pages/profile-page.js';

document.addEventListener('DOMContentLoaded', () => {
  const outlet = document.querySelector('#router-outlet');
  if (outlet) {
    new Router(outlet);
  } else {

    const appShell = document.querySelector('app-shell');
    // We need to wait for app-shell to upgrade.
    customElements.whenDefined('app-shell').then(() => {
      const outlet = appShell.shadowRoot.getElementById('router-outlet');
      new Router(outlet);
    });
  }
});
