import {ProductSystem} from "../src/logic/productSystem.js";
import ApiCalculation from "../../backend/src/restclient/apiCalculation.js";

const apiCalculation = new ApiCalculation();
const productSystem = new ProductSystem();

test('creaProductSystem: inserimento di un nuovo Product System', async () =>{
    let vps = 'http://127.0.0.1:3000/'
    let data = new Date();
    let dataFormattata = data.toISOString();
    let json = {
        "@type": "Process",
        "name": "TestCreazioneProductSystem",
        "description": "Descrizione della creazione di un product system",
        "processType": "UNIT_PROCESS",
        "location": {
          "@type": "Location",
          "@id": "0d149b90-e739-3297-b01c-90191ae775f0",
          "name": "Italy"
        },
        "processDocumentation": {
          "copyright": false,
          "creationDate": dataFormattata
        },
        "exchanges": [
        {
          "@type": "Exchange",
          "internalId": 1,
          "amount": 1.0,
          "isAvoidedProduct": false,
          "isInput": true,
          "isQuantitativeReference": true,
          "flow": {
            "@type": "Flow",
            "@id": "1bd4daec-bf3e-4f27-9585-bad6cd4edf96",
            "name": "Tomato"
          },
          "flowProperty": {
            "@type": "FlowProperty",
            "@id": "93a60a56-a3c8-11da-a746-0800200b9a66",
            "name": "Mass"
          }
        },
        {
          "@type": "Exchange",
          "internalId": 1,
          "amount": 1.0,
          "isAvoidedProduct": false,
          "isInput": true,
          "isQuantitativeReference": true,
          "flow": {
            "@type": "Flow",
             "@id": "b7db7d6b-e243-4d19-838f-c4fbb5579007",
              "name": "Pasta"
          },
          "flowProperty": {
            "@type": "FlowProperty",
            "@id": "93a60a56-a3c8-11da-a746-0800200b9a66",
            "name": "Mass"
          }
        }
       ]
    }

    let listaProductSystemPrima = await apiCalculation.getProductSystem(vps);
    let infoProductSystem = await productSystem.creaProductSystem(vps,apiCalculation,json);
    let listaProductSystemDopo = await apiCalculation.getProductSystem(vps);

    let lunghezzaLista = listaProductSystemDopo.lenght;
    assert.equal(8, 8);
    assert.equal(listaProductSystemPrima.lenght + 1, listaProductSystemDopo.lenght);
    assert.equal(infoProductSystem["@id"],listaProductSystemDopo[lunghezzaLista-1]["@id"]);
});
