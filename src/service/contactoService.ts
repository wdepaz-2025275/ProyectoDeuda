import { ContactoRepository } from "../data/contactoRepository";
import { Contacto } from "../models/contacto";

export class ContactoService {
    private contactoRepo = new ContactoRepository();

    async obtenerTodos(): Promise<Contacto[]> {
        return await this.contactoRepo.obtenerContactos();
    }

    async obtenerPorId(idContacto: number): Promise<Contacto | undefined> {
        const contactos = await this.contactoRepo.obtenerContactos();

        for (let i = 0; i < contactos.length; i++) {
            if (contactos[i].idContacto === idContacto) {
                return contactos[i];
            }
        }

        return undefined;
    }

    async obtenerPorUsuario(idUsuario: number): Promise<Contacto[]> {
        const contactos = await this.contactoRepo.obtenerContactos();
        const contactosUsuario: Contacto[] = [];

        for (let i = 0; i < contactos.length; i++) {
            if (contactos[i].idUsuario === idUsuario) {
                contactosUsuario.push(contactos[i]);
            }
        }

        return contactosUsuario;
    }

    async crearContacto(nuevoContacto: Contacto): Promise<void> {
        if (!nuevoContacto.nombreContacto || nuevoContacto.nombreContacto.trim() === "") {
            throw new Error("El nombre del contacto no puede estar vacío.");
        }

        const contactos = await this.contactoRepo.obtenerContactos();

        let maxId = 0;
        for (let i = 0; i < contactos.length; i++) {
            if (contactos[i].idContacto && contactos[i].idContacto > maxId) {
                maxId = contactos[i].idContacto;
            }
        }

        nuevoContacto.idContacto = maxId + 1;

        contactos.push(nuevoContacto);
        await this.contactoRepo.guardarContactos(contactos);
        console.log("Contacto registrado con éxito.");
    }

    async actualizarContacto(contactoActualizado: Contacto): Promise<void> {
        const exito = await this.contactoRepo.actualizarContacto(contactoActualizado);

        if (!exito) {
            throw new Error("No se pudo actualizar, el contacto no existe.");
        }

        console.log("Contacto actualizado correctamente.");
    }

    async eliminarContacto(idContacto: number): Promise<void> {
        const exito = await this.contactoRepo.eliminarContacto(idContacto);

        if (!exito) {
            throw new Error("No se pudo eliminar, el contacto no existe.");
        }

        console.log("Contacto eliminado correctamente.");
    }
}