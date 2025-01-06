export interface TaskRuleData {
    long_term: Longterm;
    high_leak: Longterm;
    high_ahi: Longterm;
    missed_cellular: Longterm;
    missed_wifi: Longterm;
    at_risk: Atrisk[];
    opportunity: Atrisk[];
    good: Atrisk[];
    adherencemet: Atrisk[];
}

interface Atrisk {
    id: number;
    name: string;
    num: number;
}

interface Longterm {
    id: number;
    num: number;
}
