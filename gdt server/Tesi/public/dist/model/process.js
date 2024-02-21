export class Process {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvY2Vzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3RzL21vZGVsL3Byb2Nlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsTUFBTSxPQUFPLE9BQU87SUFFaEIsZUFBZSxDQUFDLFVBQW1ELEVBQUMsY0FBa0IsRUFBQyxTQUFhO1FBRWhHLElBQUksSUFBSSxHQUFjO1lBQ2xCLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzVCLGFBQWEsRUFBRSxjQUFjO1lBQzdCLFVBQVUsRUFBRTtnQkFDUixPQUFPLEVBQUUsVUFBVTtnQkFDbkIsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7YUFDdkI7WUFDRCxzQkFBc0IsRUFBRTtnQkFDcEIsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLGNBQWMsRUFBRSxjQUFjO2FBQ2pDO1lBQ0QsV0FBVyxFQUFFLFNBQVM7U0FDekIsQ0FBQztRQUVGLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Q0FDSiJ9