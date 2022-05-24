import { Equip } from "./equip";

export interface Partit {
    id: string;
    competicioID: string;
    jornada: number;
    equipLocal: string;
    equipVisitant: string;
    lloc: string;
    horari: Date;
    infoLocal: Equip;
    infoVis: Equip;
}