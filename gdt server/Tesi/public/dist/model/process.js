"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Process = void 0;
class Process {
    creaJsonProcess(arrayInput, dataFormattata, exchanges) {
        let json = {
            "@type": "Process",
            "name": arrayInput[0],
            "description": arrayInput[1],
            "processType": "UNIT_PROCESS",
            "location": {
                "@type": "Location",
                "@id": arrayInput[2]
            },
            "processDocumentation": {
                "copyright": false,
                "creationDate": dataFormattata
            },
            "exchanges": exchanges
        };
        return json;
    }
}
exports.Process = Process;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvY2Vzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3RzL21vZGVsL3Byb2Nlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsTUFBYSxPQUFPO0lBRWhCLGVBQWUsQ0FBQyxVQUFtRCxFQUFDLGNBQWtCLEVBQUMsU0FBYTtRQUVoRyxJQUFJLElBQUksR0FBYztZQUNsQixPQUFPLEVBQUUsU0FBUztZQUNsQixNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNyQixhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUM1QixhQUFhLEVBQUUsY0FBYztZQUM3QixVQUFVLEVBQUU7Z0JBQ1IsT0FBTyxFQUFFLFVBQVU7Z0JBQ25CLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO2FBQ3ZCO1lBQ0Qsc0JBQXNCLEVBQUU7Z0JBQ3BCLFdBQVcsRUFBRSxLQUFLO2dCQUNsQixjQUFjLEVBQUUsY0FBYzthQUNqQztZQUNELFdBQVcsRUFBRSxTQUFTO1NBQ3pCLENBQUM7UUFFRixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0o7QUF0QkQsMEJBc0JDIn0=