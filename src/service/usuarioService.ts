import { UsuarioRepository } from "../data/usuarioRepository";
import { Usuario } from "../models/usuario";

export class UsuarioService {
    private usuarioRepo = new UsuarioRepository();

    async obtenerTodos(): Promise<Usuario[]> {
        return await this.usuarioRepo.obtenerUsuarios();
    }

    async obtenerPorId(idUsuario: number): Promise<Usuario | undefined> {
        const usuarios = await this.usuarioRepo.obtenerUsuarios();

        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].idUsuario === idUsuario) {
                return usuarios[i];
            }
        }

        return undefined;
    }

    async crearUsuario(nuevoUsuario: Usuario): Promise<void> {
        if (!nuevoUsuario.nombreUsuario || nuevoUsuario.nombreUsuario.trim() === "") {
            throw new Error("El nombre de usuario no puede estar vacío.");
        }

        if (!nuevoUsuario.correoUsuario || nuevoUsuario.correoUsuario.trim() === "") {
            throw new Error("El correo del usuario no puede estar vacío.");
        }

        if (!nuevoUsuario.passwordUsuario || nuevoUsuario.passwordUsuario.length < 4) {
            throw new Error("La contraseña debe tener al menos 4 caracteres.");
        }

        const usuarios = await this.usuarioRepo.obtenerUsuarios();

        let maxId = 0;
        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].correoUsuario === nuevoUsuario.correoUsuario) {
                throw new Error("Ya existe un usuario registrado con ese correo.");
            }
            if (usuarios[i].idUsuario && usuarios[i].idUsuario > maxId) {
                maxId = usuarios[i].idUsuario;
            }
        }

        nuevoUsuario.idUsuario = maxId + 1;

        usuarios.push(nuevoUsuario);
        await this.usuarioRepo.guardarUsuarios(usuarios);
        console.log("Usuario registrado con éxito.");
    }

    async actualizarUsuario(usuarioActualizado: Usuario): Promise<void> {
        const exito = await this.usuarioRepo.actualizarUsuario(usuarioActualizado);

        if (!exito) {
            throw new Error("No se pudo actualizar, el usuario no existe.");
        }

        console.log("Usuario actualizado correctamente.");
    }

    async eliminarUsuario(idUsuario: number): Promise<void> {
        const exito = await this.usuarioRepo.eliminarUsuario(idUsuario);

        if (!exito) {
            throw new Error("No se pudo eliminar, el usuario no existe.");
        }

        console.log("Usuario eliminado correctamente.");
    }
}