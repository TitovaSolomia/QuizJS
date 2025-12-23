export class UiButton extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'disabled'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const variant = this.getAttribute('variant') || 'primary';
    const disabled = this.hasAttribute('disabled');

    this.shadowRoot.innerHTML = `
      <style>
        button {
          font-family: inherit;
          font-size: 1rem;
          font-weight: 600;
          padding: 1rem 2rem;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
          position: relative;
          overflow: hidden;
          letter-spacing: 0.5px;
        }
        
        button:active:not(:disabled) {
          transform: scale(0.97);
        }

        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          filter: grayscale(1);
        }

        /* Variants */
        .primary {
          background: var(--primary-gradient);
          color: var(--on-primary, #fff);
          box-shadow: var(--primary-shadow);
        }
        .primary:hover:not(:disabled) {
          filter: brightness(110%);
          box-shadow: 0 6px 20px rgba(124, 58, 237, 0.4);
          transform: translateY(-1px);
        }

        .ghost {
          background-color: transparent;
          border: 2px solid var(--primary-color);
          color: var(--primary-color);
        }
        .ghost:hover:not(:disabled) {
          background-color: rgba(139, 92, 246, 0.1);
        }

        .danger {
          background-color: var(--error-color);
          color: #fff;
          box-shadow: 0 4px 12px rgba(225, 29, 72, 0.3);
        }
        .danger:hover:not(:disabled) {
          filter: brightness(110%);
          transform: translateY(-1px);
        }
      </style>
      <button class="${variant}" ${disabled ? 'disabled' : ''}>
        <slot></slot>
      </button>
    `;
  }
}

customElements.define('ui-button', UiButton);
