import { readFile, writeFile } from 'fs/promises';
import { Pago } from '../models/pago';

export class PagoRepository {
    private readonly ruta = './src/data/pago.json';

    async obtenerPagos(): Promise<Pago[]> {
        try {
            const datos = await readFile(this.ruta, 'utf-8');
            return JSON.parse(datos) as Pago[];
        } catch (error) {
            console.error('Error al leer el archivo de pagos:', error);
            return [];
        }
    }

    async guardarPagos(pagos: Pago[]): Promise<void> {
        try {
            await writeFile(
                this.ruta,
                JSON.stringify(pagos, null, 4),
                'utf-8'
            );
        } catch (error) {
            console.error('Error al guardar los pagos:', error);
        }
    }

    async eliminarPago(idPago: number): Promise<boolean> {
        try {
            const pagos = await this.obtenerPagos();
            const pagosFiltrados = pagos.filter(p => p.idPago !== idPago);

            if (pagos.length === pagosFiltrados.length) {
                return false;
            }

            await this.guardarPagos(pagosFiltrados);
            return true;
        } catch (error) {
            console.error('Error al eliminar el pago:', error);
            return false;
        }
    }

    async actualizarPago(pagoActualizado: Pago): Promise<boolean> {
        try {
            const pagos = await this.obtenerPagos();
            const index = pagos.findIndex(p => p.idPago === pagoActualizado.idPago);

            if (index === -1) {
                return false;
            }

            pagos[index] = pagoActualizado;
            await this.guardarPagos(pagos);
            return true;
        } catch (error) {
            console.error('Error al actualizar el pago:', error);
            return false;
        }
    }
}