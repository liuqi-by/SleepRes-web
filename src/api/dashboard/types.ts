export interface AdherenceProportion {
    // 0=所有，1=年，2=月
    type: number;
    // 	type为1传2024，为2传2024-11
    date?: string;
}

export interface AdherenceProportionResponse {
    compliant0: number;
    compliant1: number;
    compliant2: number;
}
