import { readFile, writeFile } from 'fs/promises';
import { Deuda } from '../models/deuda';

export class DeudaRepository {
    private readonly ruta = './src/data/deuda.json';

    async obtenerDeudas(): Promise<Deuda[]> {
        try{
            const datos = await readFile(this.ruta, 'utf-8');
            return JSON.parse(datos) as Deuda[];
        } catch (error) {
            console.error('Error al leer el archivo de deudas:', error);
            return [];
        }
    }

    async guardarDeudas(deudas: Deuda[]): Promise<void> {
        try {
            await writeFile(
                this.ruta,
                JSON.stringify(deudas, null, 4),
                'utf-8'
            );
        } catch (error) {
            console.error('Error al guardar la deuda:', error);
        }
    }

    async eliminarDeuda(idDeuda: number): Promise<boolean> {
        try {
            const deudas = await this.obtenerDeudas();
            const deudasFiltrados = deudas.filter(d => d.idDeuda !== idDeuda);

            if (deudas.length === deudasFiltrados.length) {
                return false;
            }

            await this.guardarDeudas(deudasFiltrados);
            return true;
        } catch (error) {
            console.error('Error al eliminar la deuda:', error);
            return false;
        }
    }

    async actualizarDeuda(deudaActualizada: Deuda): Promise<boolean> {
        try {
            const deudas = await this.obtenerDeudas();
            const index = deudas.findIndex(d => d.idDeuda === deudaActualizada.idDeuda);

            if (index === -1) {
                return false;
            }

            deudas[index] = deudaActualizada;
            await this.guardarDeudas(deudas);
            return true;
        } catch (error) {
            console.error('Error al actualizar la deuda:', error);
            return false;
        }
    }
}