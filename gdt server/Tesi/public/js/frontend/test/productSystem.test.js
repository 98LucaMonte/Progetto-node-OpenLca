import assert from "assert";

import {ProductSystem} from "../src/logic/productSystem.js";
import ApiCalculation from "../../backend/src/restclient/apiCalculation.js";

const apiCalculation = new ApiCalculation();
const productSystem = new ProductSystem();

test('creaProductSystem: inserimento di un nuovo Product System', () =>{
    
    let json={

    };

    productSystem.creaProductSystem(apiCalculation,json);

    assert.equal(result, 8, "");
});
