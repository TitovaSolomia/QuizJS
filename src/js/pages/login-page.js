import { store } from '../store.js';

export class LoginPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();

    // Handle Button Click
    const btn = this.shadowRoot.querySelector('ui-button');
    btn.addEventListener('click', () => this.tryLogin());

    // Handle Enter Key
    const input = this.shadowRoot.querySelector('input');
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.tryLogin();
      }
    });
  }

  tryLogin() {
    const input = this.shadowRoot.querySelector('input');
    const name = input.value.trim();

    if (name) {
      store.login(name);
      window.location.hash = '/';
    } else {
      input.focus();
      // Shake or highlight
      input.style.borderColor = 'var(--error-color, red)';
      setTimeout(() => input.style.borderColor = 'var(--text-secondary, #a0a0a0)', 1000);
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 60vh;
        }
        .login-card {
            width: 100%;
            max-width: 400px;
        }
        input {
          width: 100%;
          padding: 1rem;
          margin: 1.5rem 0;
          border-radius: 12px;
          border: 2px solid var(--surface-color, #1e1e1e);
          background-color: var(--bg-color, #121212);
          color: var(--text-color, #e0e0e0);
          font-size: 1.1rem;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        input:focus {
           outline: none;
           border-color: var(--primary-color, #bb86fc);
           box-shadow: 0 0 0 4px rgba(187, 134, 252, 0.1);
        }
        h2 {
          text-align: center;
          font-size: 2rem;
          margin-bottom: 0.5rem;
          background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        p {
          text-align: center;
          color: var(--text-secondary, #a0a0a0);
          margin-bottom: 2rem;
        }
      </style>
      
      <div class="login-card">
        <ui-card>
          <h2>QuizUP</h2>
          <p>Master Your Knowledge</p>
          
          <input type="text" placeholder="Enter your nickname..." required maxlength="20" aria-label="Nickname">
          
          <ui-button>Let's Play</ui-button>
        </ui-card>
      </div>
    `;
  }
}

customElements.define('login-page', LoginPage);
