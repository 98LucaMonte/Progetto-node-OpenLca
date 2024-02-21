function creaMain() {
    return `<header id="header">
  <nav class="navbar navbar-expand-lg bg-body-secondary">
      <button class="btn border border-dark border-1 rounded ms-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
          <span class="navbar-toggler-icon"></span>
      </button> 

      <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul class="navbar-nav me-auto ms-4 mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">About us</a>
            </li>
          </ul>
          <form class="d-flex me-5" role="search">
            <input class="form-control me-2" type="search" placeholder="Inserisci i dati..." aria-label="Search">
            <button class="btn btn-outline-secondary" type="submit">Cerca</button>
          </form>
      </div>
      
  </nav>
</header>
  
<main id="main">
  
  <div class="container">
      <div class="row">
          <div class="col-sm offcanvas offcanvas-start offcanvas-space" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
              <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Backdrop with scrolling</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div class="offcanvas-body">
                <p>Try scrolling the rest of the page to see this option in action.</p>
              </div>
          </div>
          <div class="col-sm">
              <div class="container-fluid">
                  <div class="row">
                      
                      <div class="col-12 col-lg-4">
                            <a class="text-decoration-none" id="creaProductSystem">
                              <div class="card dashboard-card">
                                  <div class="card-body text-center">
                                      <h5 class="card-title">
                                          <img src="./img/crea-product-system.png" alt="crea product system" class="mx-auto d-block">
                                          Crea Product System
                                      </h5>
                                      <p class="text-dark">Seleziona o crea gli input e gli output che andranno a comporre il Product System.</p>
                                  </div>
                              </div>
                            </a>
                      </div>

                      <div class="col-12 col-lg-4">
                          <a class="text-decoration-none" id="calcolaProductSystem" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                              <div class="card dashboard-card">
                                  <div class="card-body text-center">
                                      <h5 class="card-title">
                                          <img src="./img/calcola-product-system.png" alt="calcola product system" class="mx-auto d-block">
                                          Calcola Product System
                                      </h5>
                                      <p class="text-dark">Seleziona il Product System e l'Impact Method da usare per il calcolo.</p>
                                  </div>
                              </div>
                          </a>
                      </div>
                      
                      <div class="col-12 col-lg-4">
                          <a class="text-decoration-none" id="confrontaProductSystem">
                              <div class="card dashboard-card">
                                  <div class="card-body text-center">
                                      <h5 class="card-title">
                                          <img src='./img/confronta-product-system.png' alt="confronta product system" class="mx-auto d-block"> 
                                          Confronta Product System
                                      </h5>
                                      <p class="text-dark">Seleziona i Product System che sono stati calcolati e confrontali.</p>
                                  </div>
                              </div>
                          </a>
                      </div>
                      
                  </div>
              </div>
          </div>
      </div>
  </div>
  
    <div id="modal">
    </div>

</main>`;
}
export function homeView(contentPage) {
    contentPage.innerHTML = "";
    contentPage.insertAdjacentHTML('beforeend', creaMain());
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS12aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdHMvZnJvbnRlbmQvdGVtcGxhdGUvaG9tZS12aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLFNBQVMsUUFBUTtJQUNiLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBNEZILENBQUM7QUFDVCxDQUFDO0FBRUQsTUFBTSxVQUFVLFFBQVEsQ0FBQyxXQUEyQjtJQUVoRCxXQUFXLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUMzQixXQUFXLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7QUFDNUQsQ0FBQyJ9