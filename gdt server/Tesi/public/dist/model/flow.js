"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flow = void 0;
class Flow {
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
exports.Flow = Flow;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvdy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3RzL21vZGVsL2Zsb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsTUFBYSxJQUFJO0lBRWIsWUFBWSxDQUFDLFFBQWUsRUFBQyxRQUFlLEVBQUMsVUFBaUIsRUFBQyxZQUFtQixFQUFDLGNBQXFCLEVBQUMsZ0JBQXVCO1FBRTVILElBQUksUUFBUSxHQUFZO1lBQ3BCLE9BQU8sRUFBRSxNQUFNO1lBQ2YsTUFBTSxFQUFFLFFBQVE7WUFDaEIsVUFBVSxFQUFFLFFBQVE7WUFDcEIsVUFBVSxFQUFFO2dCQUNSLE9BQU8sRUFBRSxVQUFVO2dCQUNuQixLQUFLLEVBQUUsVUFBVTtnQkFDakIsTUFBTSxFQUFFLFlBQVk7YUFDdkI7WUFDRCxnQkFBZ0IsRUFBRTtnQkFDZDtvQkFDSSxPQUFPLEVBQUUsb0JBQW9CO29CQUM3QixtQkFBbUIsRUFBRSxJQUFJO29CQUN6QixrQkFBa0IsRUFBRSxHQUFHO29CQUN2QixjQUFjLEVBQUU7d0JBQ1osT0FBTyxFQUFFLGNBQWM7d0JBQ3ZCLEtBQUssRUFBRSxjQUFjO3dCQUNyQixNQUFNLEVBQUUsZ0JBQWdCO3FCQUMzQjtpQkFDSjthQUNKO1NBQ0osQ0FBQTtRQUVELE9BQU8sUUFBUSxDQUFDO0lBRXBCLENBQUM7Q0FDSjtBQTlCRCxvQkE4QkMifQ==