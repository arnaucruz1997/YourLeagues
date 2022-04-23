export interface UserData {
    uid: string;
    email: string;
}
export interface User {
    id: string;
    email: string;
    nom: string;
    cognoms: string;
    dni: string;
    date: Date;
    sexe: string;
    localitat: string;
    rol: string;
}

export interface Jugador extends User{
    altura: number;
    pes:number;
 }

export interface Organitzador extends User{
    orgName: string;
    orgEmail: string;
    orgTelefon: string;
    orgDesc: string;
}
