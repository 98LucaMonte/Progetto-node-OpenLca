import { JsonProcess } from "./types";

export class Process {

    creaJsonProcess(arrayInput:[string,string,string,string[],string[]],dataFormattata:any,exchanges:any):JsonProcess{

        let json :JsonProcess={
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