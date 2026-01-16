import { store } from './store.js';

const routes = {
    '/': 'dashboard-page',
    '/login': 'login-page',
    '/quiz': 'quiz-page',
    '/results': 'results-page',
    '/profile': 'profile-page',
};

export class Router {
    constructor(outlet) {
        this.outlet = outlet;
        this.init();
    }

    init() {
        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('load', () => this.handleRoute());
    }

    handleRoute() {
        let hash = window.location.hash.slice(1) || '/';

        // Auth Guards
        const user = store.getState().user;

        // Guard: If not logged in and trying to go anywhere except login, redirect to login
        if (!user && hash !== '/login') {
            window.location.hash = '/login';
            return;
        }

        if (user && hash === '/login') {
            window.location.hash = '/';
            return;
        }

        if (!routes[hash]) {
            window.location.hash = '/';
            return;
        }

        this.render(routes[hash]);
    }

    render(componentName) {

        while (this.outlet.firstChild) {
            this.outlet.removeChild(this.outlet.firstChild);
        }

        const page = document.createElement(componentName);
        this.outlet.appendChild(page);
    }
}