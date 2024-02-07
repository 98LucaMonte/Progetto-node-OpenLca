//@ts-ignore
import page from '//unpkg.com/page/page.mjs';

export class App {
    
    protected header:HTMLElement;
    protected main:HTMLElement;
    protected footer:HTMLElement;

    constructor(header:HTMLElement,main:HTMLElement,footer:HTMLElement) {
        this.header = header;
        this.main = main;
        this.footer = footer;
        this.setupRoutes(header,main,footer);
    }

    private setupRoutes(header:HTMLElement,main:HTMLElement,footer:HTMLElement): void {
        
        page('/', () => this.home(header,main,footer));
        page('/about', () => this.about(header,main,footer));
        page('/contact', () => this.contact(header,main,footer));
        page('*', (ctx:{ path:string }) => this.notFound(ctx,header,main,footer));
        page();

    }

    private home(header:HTMLElement,main:HTMLElement,footer:HTMLElement): void {
        header.innerHTML='';
        header.insertAdjacentHTML('beforeend','<h2>Home</h2><p>Benvenuto nella pagina principale!</p>');
    }
    
    private about(header:HTMLElement,main:HTMLElement,footer:HTMLElement): void {
        header.innerHTML='';
        header.insertAdjacentHTML('beforeend','<h2>About</h2><p>Qui troverai informazioni su di noi.</p>');
    }
    
    private contact(header:HTMLElement,main:HTMLElement,footer:HTMLElement): void {
        header.innerHTML='';
        header.insertAdjacentHTML('beforeend','<h2>Contact</h2><p>Contattaci tramite email o telefono.</p>');
    }
    
    private notFound(ctx: { path: string },header:HTMLElement,main:HTMLElement,footer:HTMLElement): void {
        header.innerHTML='';
        header.insertAdjacentHTML('beforeend',`<h2>Page not found</h2><p>La pagina "${ctx.path}" non è stata trovata.</p>`);
    }
    
}