import { readFile, writeFile } from "fs/promises";
import { Cliente } from "../models/cliente";

export class ClienteRepository {
    private readonly ruta = "./src/data/clientes.json";

    async obtenerClientes(): Promise<Cliente[]> {
        try {
            const datos = await readFile(this.ruta, "utf-8");
            return JSON.parse(datos) as Cliente[];
        } catch (error) {
            console.error("Error al leer el archivo de clientes:", error);
            return [];
        }
    }

    async guardarClientes(clientes: Cliente[]): Promise<void> {
        try {
            await writeFile(
                this.ruta,
                JSON.stringify(clientes, null, 4),
                "utf-8"
            );
        } catch (error) {
            console.error("Error al guardar clientes:", error);
        }
    }

    async eliminarCliente(idCliente: number): Promise<boolean> {
        try {
            const clientes = await this.obtenerClientes();
            const clientesFiltrados = clientes.filter(c => c.idCliente !== idCliente);

            if (clientes.length === clientesFiltrados.length) {
                return false; 
            }

            await this.guardarClientes(clientesFiltrados);
            return true;
        } catch (error) {
            console.error("Error al eliminar cliente:", error);
            return false;
        }
    }

    async actualizarCliente(clienteActualizado: Cliente): Promise<boolean> {
        try {
            const clientes = await this.obtenerClientes();
            const index = clientes.findIndex(c => c.idCliente === clienteActualizado.idCliente);

            if (index === -1) {
                return false;
            }

            clientes[index] = clienteActualizado;
            await this.guardarClientes(clientes);
            return true;
        } catch (error) {
            console.error("Error al actualizar cliente:", error);
            return false;
        }
    }
}