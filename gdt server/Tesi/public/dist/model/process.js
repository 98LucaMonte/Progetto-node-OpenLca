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
