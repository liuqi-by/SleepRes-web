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

export interface AdherenceProportionByMonth {
    start_date: string;
    end_date: string;
}

export interface AdherenceProportionByMonthResponse {
    [key: string]: AdherenceData;
}

interface AdherenceData {
    compliant0: number;
    compliant1: number;
    compliant2: number;
}

export interface UseMonth {
    // 0=所有，1=年，2=月
    type: number;
    // type为1传2024，为2传2024-11
    date?: string;
}

export interface UseMonthResponse {
    [key: string]: UseTimeData;
}

interface UseTimeData {
    sta0: number;
    sta1: number;
    sta2: number;
    sta3: number;
    sta4: number;
    sta5: number;
}
