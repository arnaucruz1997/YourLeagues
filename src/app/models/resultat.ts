import { Evento } from "./evento";
import { Part } from "./part";

export interface Resultat {
    id: string;
    partitID: string;
    jugat: boolean;
    guanyador: string;
    puntsEquipLocal: number;
    puntsEquipVis: number;
    events: Evento[];
    parts: Part[];
}