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
    // 0=0H,1=0.1-2,2=2.1-4,3=4.1-6,4=6.1-8,5=大于8
    sta0: number;
    sta1: number;
    sta2: number;
    sta3: number;
    sta4: number;
    sta5: number;
}

export interface NoConnectResponse {
    // 0=<3D,1=3-5D,2=6-10D,3=11-15D,4=16-20D,5=>21D
    sta0: number;
    sta1: number;
    sta2: number;
    sta3: number;
    sta4: number;
    sta5: number;
}

export interface HighLeakageResponse {
    sta0: number;
    sta1: number;
    sta2: number;
    sta3: number;
    sta4: number;
}

export interface HignAHIResponse {
    sta0: number;
    sta1: number;
    sta2: number;
    sta3: number;
    sta4: number;
}

export interface AdherenceList {
    // type为1传2024，为2传2024-11
    type: number;
    // 0=符合,1=监测,2=X
    compliant: number;
    // type为1传2024，为2传2024-11
    date?: string;
}

export interface AdherenceMonthList {
    hapdate: string;
    compliant: number;
}
