import { readFile, writeFile } from 'fs/promises';
import { Recordatorio } from '../models/recordatorio';

export class RecordatorioRepository {
    private readonly ruta = './src/data/recordatorio.json';

    async obtenerRecordatorios(): Promise<Recordatorio[]> {
        try {
            const datos = await readFile(this.ruta, 'utf-8');
            return JSON.parse(datos) as Recordatorio[];
        } catch (error) {
            console.error('Error al leer el archivo de recordatorios:', error);
            return [];
        }
    }

    async guardarRecordatorios(recordatorios: Recordatorio[]): Promise<void> {
        try {
            await writeFile(
                this.ruta,
                JSON.stringify(recordatorios, null, 4),
                'utf-8'
            );
        } catch (error) {
            console.error('Error al guardar los recordatorios:', error);
        }
    }

    async eliminarRecordatorio(idRecordatorio: number): Promise<boolean> {
        try {
            const recordatorios = await this.obtenerRecordatorios();
            const recordatoriosFiltrados = recordatorios.filter(r => r.idRecordatorio !== idRecordatorio);

            if (recordatorios.length === recordatoriosFiltrados.length) {
                return false;
            }

            await this.guardarRecordatorios(recordatoriosFiltrados);
            return true;
        } catch (error) {
            console.error('Error al eliminar el recordatorio:', error);
            return false;
        }
    }

    async actualizarRecordatorio(recordatorioActualizado: Recordatorio): Promise<boolean> {
        try {
            const recordatorios = await this.obtenerRecordatorios();
            const index = recordatorios.findIndex(r => r.idRecordatorio === recordatorioActualizado.idRecordatorio);

            if (index === -1) {
                return false;
            }

            recordatorios[index] = recordatorioActualizado;
            await this.guardarRecordatorios(recordatorios);
            return true;
        } catch (error) {
            console.error('Error al actualizar el recordatorio:', error);
            return false;
        }
    }
}