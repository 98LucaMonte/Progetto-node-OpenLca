//@ts-ignore
import page from '//unpkg.com/page/page.mjs';

import {homeView} from './frontend/template/home-view.js';
import { notFound } from './frontend/template/error-view.js';

export class App {
    
    protected contentPage:HTMLDivElement;

    constructor(contentPage:HTMLDivElement) {
        this.contentPage = contentPage;
        this.setupRoutes(contentPage);
    }

    private setupRoutes(contentPage:HTMLDivElement): void {
        
        page('/', () => homeView(contentPage));
        page('*', (ctx:{ path:string }) => notFound(ctx,contentPage));
        page();

    }
        
}