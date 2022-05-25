import { Missatge } from "./missatge";

export interface Xat {
    id: string;
    organitzadorID: string;
    partitID: string
    capLocalId: string;
    capVisId: string;
    missatges: Missatge[];
    
}