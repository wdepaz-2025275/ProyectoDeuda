import { DeudaRepository } from "../data/deudaRepository";
import { Deuda } from "../models/deuda";

export class DeudaService {
    private deudaRepo = new DeudaRepository();

    async obtenerTodas(): Promise<Deuda[]> {
        return await this.deudaRepo.obtenerDeudas();
    }

    async obtenerPorId(idDeuda: number): Promise<Deuda | undefined> {
        const deudas = await this.deudaRepo.obtenerDeudas();

        for (let i = 0; i < deudas.length; i++) {
            if (deudas[i].idDeuda === idDeuda) {
                return deudas[i];
            }
        }

        return undefined;
    }

    async obtenerPorPersona(idPersona: number): Promise<Deuda[]> {
        const deudas = await this.deudaRepo.obtenerDeudas();
        const deudasPersona: Deuda[] = [];

        for (let i = 0; i < deudas.length; i++) {
            if (deudas[i].idPersona === idPersona) {
                deudasPersona.push(deudas[i]);
            }
        }

        return deudasPersona;
    }

    async crearDeuda(nuevaDeuda: Deuda): Promise<void> {
        if (nuevaDeuda.montoTotal <= 0) {
            throw new Error("El monto total de la deuda debe ser mayor a 0.");
        }

        if (nuevaDeuda.saldoPendiente < 0) {
            throw new Error("El saldo pendiente no puede ser menor a 0.");
        }

        const deudas = await this.deudaRepo.obtenerDeudas();

        let maxId = 0;
        for (let i = 0; i < deudas.length; i++) {
            if (deudas[i].idDeuda && deudas[i].idDeuda > maxId) {
                maxId = deudas[i].idDeuda;
            }
        }

        nuevaDeuda.idDeuda = maxId + 1;

        deudas.push(nuevaDeuda);
        await this.deudaRepo.guardarDeudas(deudas);
        console.log("Deuda registrada con éxito.");
    }

    async actualizarDeuda(deudaActualizada: Deuda): Promise<void> {
        const exito = await this.deudaRepo.actualizarDeuda(deudaActualizada);

        if (!exito) {
            throw new Error("No se pudo actualizar, la deuda no existe.");
        }

        console.log("Deuda actualizada correctamente.");
    }

    async eliminarDeuda(idDeuda: number): Promise<void> {
        const exito = await this.deudaRepo.eliminarDeuda(idDeuda);

        if (!exito) {
            throw new Error("No se pudo eliminar, la deuda no existe.");
        }

        console.log("Deuda eliminada correctamente.");
    }
}