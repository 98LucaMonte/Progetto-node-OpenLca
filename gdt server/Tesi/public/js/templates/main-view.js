"use-strict";

function creaMain(){
    return `
    <div class="class="position-relative"">
        <div class="position-absolute top-50 start-50 translate-middle">
            
            <select class="form-select" aria-label="Default select example" id="listaProductSystem">
                <option selected id="selectedProductSystem"></option>
                
            </select>

            <select class="form-select" aria-label="Default select example" id="listaImpactMethod">
                <option selected id="selectedImpactMethod"></option>
                
            </select>

            <button type="button" class="btn btn-outline-secondary" id="buttonCalcolaProductSystem">Secondary</button>

        </div>
    </div>
    `;
}

export {creaMain};