"use-strict";

function creaViewHeader(){
    return `
    <nav class="navbar navbar-expand-custom navbar-mainbg fixed-top">

    <div class="container-fluid">

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <a class="navbar-brand navbar-logo ms-3" href="#">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-tree"
          viewBox="0 0 16 16">
          <path
            d="M8 0C3.58 0 0 4.58 0 9c0 2.1.85 3.88 2.19 5.05.65.65 1.47.95 2.31.95a3 3 0 0 0 1.06-.2c1.18-.34 2.3.63 2.3 1.85a2 2 0 0 1-2 2c-1.05 0-1.9.81-2 1.84V15a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1.31C7.1 14.19 6.25 15 5 15a2 2 0 0 1-2-2c0-1.22 1.12-2.19 2.3-1.85a3 3 0 0 0 1.06.2c.84 0 1.66-.3 2.31-.95 1.34-1.17 2.19-2.95 2.19-5.05 0-4.42-3.58-8-8-8zm-3.34 7.35l1.7 1.71V8a1 1 0 0 1 2 0v1.06l1.7-1.7a1 1 0 1 1 1.42 1.41l-2.83 2.83a1 1 0 0 1-1.42 0L3.93 8.76a1 1 0 0 1 1.42-1.41z" />
        </svg>
        <strong>Natura Pulita</strong>
      </a>

      <div class="collapse navbar-collapse mt-4" id="navbarTogglerDemo01">

        <ul class="nav nav-pills nav-fill ml-auto">
          <li class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
              <path
                d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18h-1v-7H7v-2h4V4h2v7h4v2h-4v7zm-2-9c-2.76 0-5 2.40-5 5h1c0-2.21 1.79-4 4-4s4 1.79 4 4h1c0-2.76-2.40-5-5-5z" />
            </svg>
            <a class="text-dark nav-link" href="#"><strong>Chi siamo</strong></a>
          </li>
          <li class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              <path
                d="M11 2c1.44 0 2.88.4 4.11 1.11.3.17.47.47.47.79 0 .32-.17.61-.47.79C13.88 3.6 12.44 4 11 4s-2.88-.4-4.11-1.11c-.3-.17-.47-.47-.47-.79 0-.32.17-.61.47-.79C8.12 1.4 9.56 1 11 1zm2.5 8.5h-.83c-.27 0-.52.11-.71.29C12.52 10.1 12 10.99 12 12c0 1.1.52 1.9 1.96 2.21.19.18.44.29.71.29h.83l2.04 1.22c.55.33 1.23-.14 1.23-.77v-4.92c0-.63-.68-1.1-1.23-.77L13.5 10.5z" />
            </svg>
            <a class="text-dark nav-link" href="#"><strong>Contattaci</strong></a>
          </li>
          <li class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
              <path
                d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18h-1v-7H7v-2h4V4h2v7h4v2h-4v7zm-2-9h4v1H10v-1zm2-4H10v1h4v-1z" />
            </svg>
            <a class="text-dark nav-link" href="#"><strong>Cosa facciamo</strong></a>
          </li>
        </ul>

      </div>

    </div>

  </nav>
    `;
}

export {creaViewHeader};