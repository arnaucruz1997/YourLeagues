export interface Classificacio {
    id: string;
    competicioID: string;
    equipId: string;
    partitsJugats: number;
    partitsGuanyats: number;
    partitsPerduts: number;
    puntuacio: number;
    equipImg: string,
    equipNom: string,
}

export interface ClassificacioPunts extends Classificacio{
    partitsEmpatats: number;
    golsAFavor:number;
    golsEnContra:number;
 }
 export interface ClassificacioSets extends Classificacio{
    setsGuanyats: number;
    setsPerduts:number;
 }