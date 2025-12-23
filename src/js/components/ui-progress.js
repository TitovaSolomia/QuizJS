export class UiProgress extends HTMLElement {
    static get observedAttributes() {
        return ['value', 'max'];
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
        const value = parseInt(this.getAttribute('value') || '0', 10);
        const max = parseInt(this.getAttribute('max') || '100', 10);
        const percentage = Math.min(100, Math.max(0, (value / max) * 100));

        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }
        .track {
          background-color: rgba(255,255,255,0.1);
          border-radius: 4px;
          height: 8px;
          width: 100%;
          overflow: hidden;
        }
        .fill {
          background-color: var(--secondary-color, #03dac6);
          height: 100%;
          width: ${percentage}%;
          transition: width 0.3s ease-out;
        }
        .label {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--text-secondary, #a0a0a0);
          margin-bottom: 4px;
        }
      </style>
      <div class="label">
        <span>Question ${value} / ${max}</span>
        <span>${Math.round(percentage)}%</span>
      </div>
      <div class="track">
        <div class="fill"></div>
      </div>
    `;
    }
}

customElements.define('ui-progress', UiProgress);
