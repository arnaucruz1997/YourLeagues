import { Equip } from "./equip";
import { Resultat } from "./resultat";
import { Xat } from "./xat";

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
    resultat: Resultat;
}