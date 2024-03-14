
function creaMain(): string {
    return `<header id="header">
  <nav class="navbar navbar-expand-lg bg-body-secondary">
      
      <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul class="navbar-nav me-auto ms-4 mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/">About us</a>
            </li>
          </ul>
          
      </div>
      
  </nav>
</header>
  
<main id="main">
  
  <div class="container">
      <div class="row">
          
          <div class="col-sm">
              <div class="container-fluid">
                
                  <div class="row">
                    
                  <h3>Benvenuto nella DEMO online di OpenLca</h3><br>
                  <p class="text-start fs-6 fw-normal">Prova una delle tre funzioni che vengono offerte.</p>

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
 
export function homeView(contentPage: HTMLDivElement): void {

    contentPage.innerHTML = "";
    contentPage.insertAdjacentHTML('beforeend', creaMain());
}
