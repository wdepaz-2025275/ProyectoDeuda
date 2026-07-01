import { Estado } from './estado';

export interface Deuda {
    idDeuda: number;
    idCliente: number;
    montoTotal: number;
    montoPagado: number;
    descripcion: string;
    fechaVencimiento: Date;
    estado: Estado;
}