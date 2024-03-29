
function creaPaginaError404(ctx:{path:string}):string{
    return `
    <div class="container text-center">
    <div class="row"> 
      <div class="col">
        <img src="./img/error404.png" alt="error404" class="img-fluid">
        <p class="text-center fs-2 fw-semibold">Errore pagina ${ctx.path} non trovata.</p>
      </div>
    </div>
    </div>
    `; 
}

function notFound(ctx: { path: string },contentPage:HTMLDivElement): void {
    contentPage.innerHTML='';
    contentPage.insertAdjacentHTML('beforeend',creaPaginaError404(ctx));
}

export {notFound};