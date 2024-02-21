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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvdy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3RzL21vZGVsL2Zsb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsTUFBTSxPQUFPLElBQUk7SUFFYixZQUFZLENBQUMsUUFBZSxFQUFDLFFBQWUsRUFBQyxVQUFpQixFQUFDLFlBQW1CLEVBQUMsY0FBcUIsRUFBQyxnQkFBdUI7UUFFNUgsSUFBSSxRQUFRLEdBQVk7WUFDcEIsT0FBTyxFQUFFLE1BQU07WUFDZixNQUFNLEVBQUUsUUFBUTtZQUNoQixVQUFVLEVBQUUsUUFBUTtZQUNwQixVQUFVLEVBQUU7Z0JBQ1IsT0FBTyxFQUFFLFVBQVU7Z0JBQ25CLEtBQUssRUFBRSxVQUFVO2dCQUNqQixNQUFNLEVBQUUsWUFBWTthQUN2QjtZQUNELGdCQUFnQixFQUFFO2dCQUNkO29CQUNJLE9BQU8sRUFBRSxvQkFBb0I7b0JBQzdCLG1CQUFtQixFQUFFLElBQUk7b0JBQ3pCLGtCQUFrQixFQUFFLEdBQUc7b0JBQ3ZCLGNBQWMsRUFBRTt3QkFDWixPQUFPLEVBQUUsY0FBYzt3QkFDdkIsS0FBSyxFQUFFLGNBQWM7d0JBQ3JCLE1BQU0sRUFBRSxnQkFBZ0I7cUJBQzNCO2lCQUNKO2FBQ0o7U0FDSixDQUFBO1FBRUQsT0FBTyxRQUFRLENBQUM7SUFFcEIsQ0FBQztDQUNKIn0=