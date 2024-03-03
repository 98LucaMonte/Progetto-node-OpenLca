"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exchange = void 0;
class Exchange {
    creaJsonExchange(type, idFlow) {
        let json = {
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
        };
        return json;
    }
    creaJsonNuovoExchange(type, flow, flowProperty) {
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
exports.Exchange = Exchange;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhjaGFuZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2RlbC9leGNoYW5nZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxNQUFhLFFBQVE7SUFFakIsZ0JBQWdCLENBQUMsSUFBWSxFQUFDLE1BQWE7UUFFdkMsSUFBSSxJQUFJLEdBQWM7WUFFZCxPQUFPLEVBQUUsVUFBVTtZQUNuQixZQUFZLEVBQUUsQ0FBQztZQUNmLFFBQVEsRUFBRSxHQUFHO1lBQ2Isa0JBQWtCLEVBQUUsS0FBSztZQUN6QixTQUFTLEVBQUUsSUFBSTtZQUNmLHlCQUF5QixFQUFFLElBQUk7WUFDL0IsTUFBTSxFQUFFO2dCQUNKLE9BQU8sRUFBRSxNQUFNO2dCQUNmLEtBQUssRUFBRSxNQUFNO2FBQ2hCO1NBRVIsQ0FBQTtRQUVELE9BQU8sSUFBSSxDQUFDO0lBRWhCLENBQUM7SUFFRCxxQkFBcUIsQ0FBQyxJQUFZLEVBQUMsSUFBUSxFQUFDLFlBQWdCO1FBRXhELElBQUksSUFBSSxHQUFHO1lBQ1AsT0FBTyxFQUFFLFVBQVU7WUFDbkIsWUFBWSxFQUFFLENBQUM7WUFDZixRQUFRLEVBQUUsR0FBRztZQUNiLGtCQUFrQixFQUFFLEtBQUs7WUFDekIsU0FBUyxFQUFFLElBQUk7WUFDZix5QkFBeUIsRUFBRSxJQUFJO1lBQy9CLE1BQU0sRUFBRTtnQkFDSixPQUFPLEVBQUUsTUFBTTtnQkFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQzthQUNyQjtZQUNELGNBQWMsRUFBRTtnQkFDWixPQUFPLEVBQUUsY0FBYztnQkFDdkIsS0FBSyxFQUFFLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztnQkFDekQsTUFBTSxFQUFFLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUk7YUFDM0Q7U0FDSixDQUFDO1FBRUYsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQUVKO0FBOUNELDRCQThDQyJ9