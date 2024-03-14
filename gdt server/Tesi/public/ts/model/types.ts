export interface JsonFlow {
    "@type": string;
    name: string;
    flowType: string;
    location: {
        "@type": string;
        "@id": string;
        name: string;
    };
    flowProperties: {
        "@type": string;
        isRefFlowProperty: boolean;
        conversionFactor: number;
        flowProperty: {
            "@type": string;
            "@id": string;
            name: string;
        };
    }[];
}

export interface JsonExchange{
    "@type": string,
    "internalId": number,
    "amount": number,
    "isAvoidedProduct": boolean,
    "isInput": boolean,
    "isQuantitativeReference": boolean,
    "flow": {
        "@type": string,
        "@id": string
    }
}

export interface JsonExchangeNuovo{

        "@type": string,
        "internalId": number,
        "amount": number,
        "isAvoidedProduct": boolean,
        "isInput": boolean,
        "isQuantitativeReference": boolean,
        "flow": {
            "@type": string,
            "@id": string
        },
        "flowProperty": {
            "@type": string,
            "@id": string,
            "name": string
        }
}

export interface JsonProcess{
    "@type": string,
    "name": string,
    "description": string,
    "processType": string,
    "location": {
        "@type": string,
        "@id": string
    },
    "processDocumentation": {
        "copyright": boolean,
        "creationDate": string
    },
    "exchanges": any
};

export interface JsonDatiCalcolo{
    "productSystem":{
        "id":string,
         "nome":string
    },
    "impactMethod":{
        "id":string,
        "nome":string
    },
    "idCalcolo":string

}
 
export interface EnviFlowData {
    enviFlow: {
      flow: {
        "@type": string;
        "@id": string;
        name: string;
        category: string;
        flowType: string;
        refUnit: string;
      }
      isInput: boolean;
    },
    amount: number;
}

export interface ImpactCategoryData {
    impactCategory: {
      "@type": string;
      "@id": string;
      name: string;
      category: string;
      refUnit: string;
    };
    amount: number;
}