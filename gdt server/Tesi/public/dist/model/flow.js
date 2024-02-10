export class Flow {
    creaJsonFlow(nomeFlow, flowType, idLocation, nomeLocation, idFlowProperty, nomeFlowProperty) {
        let jsonFlow = {
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
        };
        return jsonFlow;
    }
}
