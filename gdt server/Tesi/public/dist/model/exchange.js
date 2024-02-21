export class Exchange {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhjaGFuZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2RlbC9leGNoYW5nZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLE9BQU8sUUFBUTtJQUVqQixnQkFBZ0IsQ0FBQyxJQUFZLEVBQUMsTUFBYTtRQUV2QyxJQUFJLElBQUksR0FBYztZQUVkLE9BQU8sRUFBRSxVQUFVO1lBQ25CLFlBQVksRUFBRSxDQUFDO1lBQ2YsUUFBUSxFQUFFLEdBQUc7WUFDYixrQkFBa0IsRUFBRSxLQUFLO1lBQ3pCLFNBQVMsRUFBRSxJQUFJO1lBQ2YseUJBQXlCLEVBQUUsSUFBSTtZQUMvQixNQUFNLEVBQUU7Z0JBQ0osT0FBTyxFQUFFLE1BQU07Z0JBQ2YsS0FBSyxFQUFFLE1BQU07YUFDaEI7U0FFUixDQUFBO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFFaEIsQ0FBQztJQUVELHFCQUFxQixDQUFDLElBQVksRUFBQyxJQUFRLEVBQUMsWUFBZ0I7UUFFeEQsSUFBSSxJQUFJLEdBQUc7WUFDUCxPQUFPLEVBQUUsVUFBVTtZQUNuQixZQUFZLEVBQUUsQ0FBQztZQUNmLFFBQVEsRUFBRSxHQUFHO1lBQ2Isa0JBQWtCLEVBQUUsS0FBSztZQUN6QixTQUFTLEVBQUUsSUFBSTtZQUNmLHlCQUF5QixFQUFFLElBQUk7WUFDL0IsTUFBTSxFQUFFO2dCQUNKLE9BQU8sRUFBRSxNQUFNO2dCQUNmLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDO2FBQ3JCO1lBQ0QsY0FBYyxFQUFFO2dCQUNaLE9BQU8sRUFBRSxjQUFjO2dCQUN2QixLQUFLLEVBQUUsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO2dCQUN6RCxNQUFNLEVBQUUsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSTthQUMzRDtTQUNKLENBQUM7UUFFRixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBRUoifQ==