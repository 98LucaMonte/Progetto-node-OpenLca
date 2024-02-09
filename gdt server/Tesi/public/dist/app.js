//@ts-ignore
import page from '//unpkg.com/page/page.mjs';
import { homeView } from './frontend/template/home-view.js';
import { notFound } from './frontend/template/error-view.js';
export class App {
    contentPage;
    constructor(contentPage) {
        this.contentPage = contentPage;
        this.setupRoutes(contentPage);
    }
    setupRoutes(contentPage) {
        page('/', () => homeView(contentPage));
        page('*', (ctx) => notFound(ctx, contentPage));
        page();
    }
}
