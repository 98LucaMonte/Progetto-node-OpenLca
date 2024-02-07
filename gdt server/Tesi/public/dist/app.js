import page from '//unpkg.com/page/page.mjs';
export class App {
    header;
    main;
    footer;
    constructor(header, main, footer) {
        this.header = header;
        this.main = main;
        this.footer = footer;
        this.setupRoutes(header, main, footer);
    }
    setupRoutes(header, main, footer) {
        page('/', () => this.home(header, main, footer));
        page('/about', () => this.about(header, main, footer));
        page('/contact', () => this.contact(header, main, footer));
        page('*', (ctx) => this.notFound(ctx, header, main, footer));
        page();
    }
    home(header, main, footer) {
        header.innerHTML = '';
        header.insertAdjacentHTML('beforeend', '<h2>Home</h2><p>Benvenuto nella pagina principale!</p>');
    }
    about(header, main, footer) {
        header.innerHTML = '';
        header.insertAdjacentHTML('beforeend', '<h2>About</h2><p>Qui troverai informazioni su di noi.</p>');
    }
    contact(header, main, footer) {
        header.innerHTML = '';
        header.insertAdjacentHTML('beforeend', '<h2>Contact</h2><p>Contattaci tramite email o telefono.</p>');
    }
    notFound(ctx, header, main, footer) {
        header.innerHTML = '';
        header.insertAdjacentHTML('beforeend', `<h2>Page not found</h2><p>La pagina "${ctx.path}" non è stata trovata.</p>`);
    }
}
