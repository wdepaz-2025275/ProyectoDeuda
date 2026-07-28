import { readFile, writeFile } from "fs/promises";
import { Contacto } from "../models/contacto";

export class ContactoRepository {
    private readonly ruta = "./src/data/contacto.json";

    async obtenerContactos(): Promise<Contacto[]> {
        try {
            const datos = await readFile(this.ruta, "utf-8");
            return JSON.parse(datos) as Contacto[];
        } catch (error) {
            console.error("Error al leer el archivo de contactos:", error);
            return [];
        }
    }

    async guardarContactos(contacto: Contacto[]): Promise<void> {
        try {
            await writeFile(
                this.ruta,
                JSON.stringify(contacto, null, 4),
                "utf-8"
            );
        } catch (error) {
            console.error("Error al guardar el contacto:", error);
        }
    }

    async eliminarContacto(idContacto: number): Promise<boolean> {
        try {
            const contactos = await this.obtenerContactos();
            const contactosFiltrados = contactos.filter(
                c => c.idContacto !== idContacto
            );

            if (contactos.length === contactosFiltrados.length) {
                return false;
            }

            await this.guardarContactos(contactosFiltrados);
            return true;
        } catch (error) {
            console.error("Error al eliminar contacto:", error);
            return false;
        }
    }

    async actualizarContacto(contactoActualizado: Contacto): Promise<boolean> {
        try {
            const contacto = await this.obtenerContactos();
            const index = contacto.findIndex(
                c => c.idContacto === contactoActualizado.idContacto
            );

            if (index === -1) {
                return false;
            }

            contacto[index] = contactoActualizado;
            await this.guardarContactos(contacto);
            return true;
        } catch (error) {
            console.error("Error al actualizar contacto:", error);
            return false;
        }
    }
}