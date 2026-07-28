import { PagoRepository } from "../data/pagoRepository";
import { Pago } from "../models/pago";

export class PagoService {
    private pagoRepo = new PagoRepository();

    async obtenerTodos(): Promise<Pago[]> {
        return await this.pagoRepo.obtenerPagos();
    }

    async obtenerPorId(idPago: number): Promise<Pago | undefined> {
        const pagos = await this.pagoRepo.obtenerPagos();

        for (let i = 0; i < pagos.length; i++) {
            if (pagos[i].idPago === idPago) {
                return pagos[i];
            }
        }

        return undefined;
    }

    async obtenerPorDeuda(idDeuda: number): Promise<Pago[]> {
        const pagos = await this.pagoRepo.obtenerPagos();
        const pagosDeuda: Pago[] = [];

        for (let i = 0; i < pagos.length; i++) {
            if (pagos[i].idDeuda === idDeuda) {
                pagosDeuda.push(pagos[i]);
            }
        }

        return pagosDeuda;
    }

    async crearPago(nuevoPago: Pago): Promise<void> {
        if (nuevoPago.montoPago <= 0) {
            throw new Error("El monto del pago debe ser mayor a 0.");
        }

        const pagos = await this.pagoRepo.obtenerPagos();

        let maxId = 0;
        for (let i = 0; i < pagos.length; i++) {
            if (pagos[i].idPago && pagos[i].idPago > maxId) {
                maxId = pagos[i].idPago;
            }
        }

        nuevoPago.idPago = maxId + 1;

        pagos.push(nuevoPago);
        await this.pagoRepo.guardarPagos(pagos);
        console.log("Pago registrado con éxito.");
    }

    async actualizarPago(pagoActualizado: Pago): Promise<void> {
        const exito = await this.pagoRepo.actualizarPago(pagoActualizado);

        if (!exito) {
            throw new Error("No se pudo actualizar, el pago no existe.");
        }

        console.log("Pago actualizado correctamente.");
    }

    async eliminarPago(idPago: number): Promise<void> {
        const exito = await this.pagoRepo.eliminarPago(idPago);

        if (!exito) {
            throw new Error("No se pudo eliminar, el pago no existe.");
        }

        console.log("Pago eliminado correctamente.");
    }
}