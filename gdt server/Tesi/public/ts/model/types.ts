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