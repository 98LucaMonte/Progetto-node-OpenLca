import assert from "assert";

import {CalcolaProductSystem} from "../src/logic/calcolaProductSystem.js";
import ApiCalculation from "../../backend/src/restclient/apiCalculation.js";

const apiCalculation = new ApiCalculation();
const calcolaProductSystem = new CalcolaProductSystem();

test('calcola Product System: ', () =>{
    
    calcolaProductSystem.calcola(apiCalculation);

    assert.equal(result, 8, "");
});
