import { JsonExchange, JsonExchangeNuovo } from "./types";

export class Exchange {

    creaJsonExchange(type:boolean,idFlow:string):JsonExchange{

        let json:JsonExchange={
            
                "@type": "Exchange",
                "internalId": 1,
                "amount": 1.0,
                "isAvoidedProduct": false,
                "isInput": type,
                "isQuantitativeReference": true,
                "flow": {
                    "@type": "Flow",
                    "@id": idFlow
                }
            
        }

        return json;

    } 
 
    creaJsonNuovoExchange(type:boolean,flow:any,flowProperty:any):JsonExchangeNuovo{
        
        let json = {
            "@type": "Exchange", 
            "internalId": 1,
            "amount": 1.0,
            "isAvoidedProduct": false,
            "isInput": type,
            "isQuantitativeReference": true,
            "flow": {
                "@type": "Flow",
                "@id": flow["@id"]
            },
            "flowProperty": {
                "@type": "FlowProperty",
                "@id": flowProperty.flowProperties[0].flowProperty["@id"],
                "name": flowProperty.flowProperties[0].flowProperty.name
            }
        };

        return json;
    }

}