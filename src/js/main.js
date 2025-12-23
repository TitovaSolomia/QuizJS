/**
 * Main Entry Point
 * Imports all components to register them with the CustomElementsRegistry
 * and initializes the Router.
 */

// Core
import { Router } from './router.js';

// Styles (loaded via link in HTML, but here for completeness mental model)

// Components
import './components/app-shell.js';
import './components/ui-toggle.js';
import './components/ui-card.js';
import './components/ui-button.js';
import './components/ui-progress.js';
import './components/ui-select.js';

import './components/quiz-question.js';
import './components/answer-option.js';

// Pages
import './pages/login-page.js';
import './pages/dashboard-page.js';
import './pages/quiz-page.js';
import './pages/results-page.js';
import './pages/profile-page.js';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const outlet = document.querySelector('#router-outlet');
  if (outlet) {
    new Router(outlet);
  } else {
    // Fallback if app-shell hasn't rendered yet or Shadow DOM issue (unlikely as main.js is module)
    // Actually, router looks for #router-outlet inside app-shell?
    // Wait, app-shell has a Shadow DOM. `document.querySelector('#router-outlet')` won't find it if it's inside shadow root.

    // Correct approach: The Router needs to render into the app-shell's slot or the app-shell needs to expose the outlet.
    // Let's check app-shell.js:
    // <main id="router-outlet"> <!-- inside shadowDOM -->

    // Since app-shell uses Shadow DOM, we can't select #router-outlet from global document easily unless we go through the component.
    // Better approach:
    // <app-shell></app-shell> is in index.html.
    // Pass the app-shell instance itself to Router, and Router can access shadowRoot?
    // Or make AppShell expose a method?

    // Let's modify Router slightly or pass the correct element.
    // But main.js runs after DOMContentLoaded.

    const appShell = document.querySelector('app-shell');
    // We need to wait for app-shell to upgrade.
    customElements.whenDefined('app-shell').then(() => {
      const outlet = appShell.shadowRoot.getElementById('router-outlet');
      new Router(outlet);
    });
  }
});
