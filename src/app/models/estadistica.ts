export interface Estadistica {
    id: string;
    competicioID: string;
    equipId: string;
    equipNom: string;
    jugadorId: string;
}

export interface EstadisticaGoal extends Estadistica{
    gols: number;
    partitsJugats:number;
    targetesGrogues:number;
    targetesVermelles:number;
 }
 export interface EstadisticaBasquet extends Estadistica{
    punts: number;
    triples:number;
 }