function creaPaginaError404(ctx) {
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
function notFound(ctx, contentPage) {
    contentPage.innerHTML = '';
    contentPage.insertAdjacentHTML('beforeend', creaPaginaError404(ctx));
}
export { notFound };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3Itdmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzL2Zyb250ZW5kL3RlbXBsYXRlL2Vycm9yLXZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsU0FBUyxrQkFBa0IsQ0FBQyxHQUFpQjtJQUN6QyxPQUFPOzs7OztnRUFLcUQsR0FBRyxDQUFDLElBQUk7Ozs7S0FJbkUsQ0FBQztBQUNOLENBQUM7QUFFRCxTQUFTLFFBQVEsQ0FBQyxHQUFxQixFQUFDLFdBQTBCO0lBQzlELFdBQVcsQ0FBQyxTQUFTLEdBQUMsRUFBRSxDQUFDO0lBQ3pCLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN4RSxDQUFDO0FBRUQsT0FBTyxFQUFDLFFBQVEsRUFBQyxDQUFDIn0=