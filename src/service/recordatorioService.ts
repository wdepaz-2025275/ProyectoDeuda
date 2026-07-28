import { RecordatorioRepository } from "../data/recordatorioRepository";
import { Recordatorio } from "../models/recordatorio";

export class RecordatorioService {
    private recordatorioRepo = new RecordatorioRepository();

    async obtenerTodos(): Promise<Recordatorio[]> {
        return await this.recordatorioRepo.obtenerRecordatorios();
    }

    async obtenerPorId(idRecordatorio: number): Promise<Recordatorio | undefined> {
        const recordatorios = await this.recordatorioRepo.obtenerRecordatorios();

        for (let i = 0; i < recordatorios.length; i++) {
            if (recordatorios[i].idRecordatorio === idRecordatorio) {
                return recordatorios[i];
            }
        }

        return undefined;
    }

    async obtenerPorDeuda(idDeuda: number): Promise<Recordatorio[]> {
        const recordatorios = await this.recordatorioRepo.obtenerRecordatorios();
        const recordatoriosDeuda: Recordatorio[] = [];

        for (let i = 0; i < recordatorios.length; i++) {
            if (recordatorios[i].idDeuda === idDeuda) {
                recordatoriosDeuda.push(recordatorios[i]);
            }
        }

        return recordatoriosDeuda;
    }

    async crearRecordatorio(nuevoRecordatorio: Recordatorio): Promise<void> {
        if (!nuevoRecordatorio.mensajeRecordatorio || nuevoRecordatorio.mensajeRecordatorio.trim() === "") {
            throw new Error("El mensaje del recordatorio no puede estar vacío.");
        }

        const recordatorios = await this.recordatorioRepo.obtenerRecordatorios();

        let maxId = 0;
        for (let i = 0; i < recordatorios.length; i++) {
            if (recordatorios[i].idRecordatorio && recordatorios[i].idRecordatorio > maxId) {
                maxId = recordatorios[i].idRecordatorio;
            }
        }

        nuevoRecordatorio.idRecordatorio = maxId + 1;

        recordatorios.push(nuevoRecordatorio);
        await this.recordatorioRepo.guardarRecordatorios(recordatorios);
        console.log("Recordatorio registrado con éxito.");
    }

    async actualizarRecordatorio(recordatorioActualizado: Recordatorio): Promise<void> {
        const exito = await this.recordatorioRepo.actualizarRecordatorio(recordatorioActualizado);

        if (!exito) {
            throw new Error("No se pudo actualizar, el recordatorio no existe.");
        }

        console.log("Recordatorio actualizado correctamente.");
    }

    async eliminarRecordatorio(idRecordatorio: number): Promise<void> {
        const exito = await this.recordatorioRepo.eliminarRecordatorio(idRecordatorio);

        if (!exito) {
            throw new Error("No se pudo eliminar, el recordatorio no existe.");
        }

        console.log("Recordatorio eliminado correctamente.");
    }
}