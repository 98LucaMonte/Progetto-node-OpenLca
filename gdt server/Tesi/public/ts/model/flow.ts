import { JsonFlow } from "./types";

export class Flow{
    
    creaJsonFlow(nomeFlow:string,flowType:string,idLocation:string,nomeLocation:string,idFlowProperty:string,nomeFlowProperty:string):JsonFlow{

        let jsonFlow:JsonFlow = {
            "@type": "Flow",
            "name": nomeFlow,
            "flowType": flowType,
            "location": {
                "@type": "Location",
                "@id": idLocation,
                "name": nomeLocation
            },
            "flowProperties": [
                {
                    "@type": "FlowPropertyFactor",
                    "isRefFlowProperty": true,
                    "conversionFactor": 1.0,
                    "flowProperty": {
                        "@type": "FlowProperty",
                        "@id": idFlowProperty,
                        "name": nomeFlowProperty
                    }
                }
            ]
        }

        return jsonFlow;

    }
}