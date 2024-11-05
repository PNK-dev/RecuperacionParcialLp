export class Coche {
    id: number;
    matricula: string;
    numPuertas: number;
    marca_id: number;
    tipocoche_id: number;

    constructor(
        id: number = 0,
        matricula: string = '',
        numPuertas: number = 0,
        marca_id: number = 0,
        tipocoche_id: number = 0
    ) {
        this.id = id;
        this.matricula = matricula;
        this.numPuertas = numPuertas;
        this.marca_id = marca_id;
        this.tipocoche_id = tipocoche_id;
    }
}
