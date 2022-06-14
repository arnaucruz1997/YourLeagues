export interface Competicio {
    id: string;
    organitzador: string;
    nom: string;
    email:string;
    privacitat:boolean;
    numEquips:number;
    tipusSport:string;
    tipusCompeticio:string;
    img:string;
    solicituds:string[],
    equips:string[],
    nomOrganitzacio:string,
    estatCompeticio:string,
    numVoltes:number,
}