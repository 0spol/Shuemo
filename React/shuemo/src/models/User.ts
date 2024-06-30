export type UserProfileToken = {
    token: string;
    email: string,
    username: string,
    password: string,
    ciudad: string,
    direccion: string,
    telefono: string,
    ambito: string,
    tipoEmpresa: string,
    cuantos: string,
    accion: string,
}
export type UserProfile = {
    idUsuario : number;
    username: string;
    email: string;
    roles: number[];
    idEmpresa:number;
    idTipoEmpresa:number;
}