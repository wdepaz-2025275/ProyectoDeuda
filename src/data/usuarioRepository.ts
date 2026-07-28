import { readFile, writeFile } from "fs/promises";
import { Usuario } from "../models/usuario";

export class UsuarioRepository {
    private readonly ruta = "./src/data/usuario.json";

    async obtenerUsuarios(): Promise<Usuario[]> {
        try {
            const datos = await readFile(this.ruta, "utf-8");
            return JSON.parse(datos) as Usuario[];
        } catch (error) {
            console.error("Error al leer el archivo de usuarios:", error);
            return [];
        }
    }

    async guardarUsuarios(usuarios: Usuario[]): Promise<void> {
        try {
            await writeFile(
                this.ruta,
                JSON.stringify(usuarios, null, 4),
                "utf-8"
            );
        } catch (error) {
            console.error("Error al guardar los usuarios:", error);
        }
    }

    async eliminarUsuario(idUsuario: number): Promise<boolean> {
        try {
            const usuarios = await this.obtenerUsuarios();
            const usuariosFiltrados = usuarios.filter(
                u => u.idUsuario !== idUsuario
            );

            if (usuarios.length === usuariosFiltrados.length) {
                return false;
            }

            await this.guardarUsuarios(usuariosFiltrados);
            return true;
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            return false;
        }
    }

    async actualizarUsuario(usuarioActualizado: Usuario): Promise<boolean> {
        try {
            const usuarios = await this.obtenerUsuarios();
            const index = usuarios.findIndex(
                u => u.idUsuario === usuarioActualizado.idUsuario
            );

            if (index === -1) {
                return false;
            }

            usuarios[index] = usuarioActualizado;
            await this.guardarUsuarios(usuarios);
            return true;
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            return false;
        }
    }
}