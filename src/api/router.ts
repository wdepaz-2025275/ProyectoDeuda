import { IncomingMessage, ServerResponse } from "http";
import { ContactoService } from "../service/contactoService";
import { DeudaService } from "../service/deudaService";
import { PagoService } from "../service/pagoService";
import { RecordatorioService } from "../service/recordatorioService";
import { UsuarioService } from "../service/usuarioService";

const contactoService = new ContactoService();
const deudaService = new DeudaService();
const pagoService = new PagoService();
const recordatorioService = new RecordatorioService();
const usuarioService = new UsuarioService();

// Función auxiliar para leer el body en peticiones POST / PUT
function obtenerBody(req: IncomingMessage): Promise<any> {
    return new Promise((resolve, reject) => {
        let body = "";
        req.on("data", chunk => {
            body += chunk;
        });
        req.on("end", () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (error) {
                reject(new Error("Formato JSON inválido"));
            }
        });
        req.on("error", (err) => reject(err));
    });
}

export async function router(req: IncomingMessage, res: ServerResponse) {
    res.setHeader("Content-Type", "application/json");

    const url = req.url ?? "";
    const metodo = req.method ?? "";

    try {

        // RUTAS DE CONTACTOS
        if (metodo === "GET" && url === "/contactos") {
            const contactos = await contactoService.obtenerTodos();
            res.writeHead(200);
            res.end(JSON.stringify(contactos));
            return;
        }

        if (metodo === "GET" && url.startsWith("/contactos/")) {
            const id = Number(url.split("/")[2]);
            const contacto = await contactoService.obtenerPorId(id);

            if (!contacto) {
                res.writeHead(404);
                res.end(JSON.stringify({ mensaje: "Contacto no encontrado" }));
                return;
            }

            res.writeHead(200);
            res.end(JSON.stringify(contacto));
            return;
        }

        if (metodo === "POST" && url === "/contactos") {
            const body = await obtenerBody(req);
            await contactoService.crearContacto(body);
            res.writeHead(201);
            res.end(JSON.stringify({ mensaje: "Contacto registrado con éxito" }));
            return;
        }

        if (metodo === "PUT" && url.startsWith("/contactos/")) {
            const id = Number(url.split("/")[2]);
            const body = await obtenerBody(req);
            body.idContacto = id;

            await contactoService.actualizarContacto(body);
            res.writeHead(200);
            res.end(JSON.stringify({ mensaje: "Contacto actualizado con éxito" }));
            return;
        }

        if (metodo === "DELETE" && url.startsWith("/contactos/")) {
            const id = Number(url.split("/")[2]);
            await contactoService.eliminarContacto(id);
            res.writeHead(200);
            res.end(JSON.stringify({ mensaje: "Contacto eliminado con éxito" }));
            return;
        }


        // RUTAS DE DEUDAS
        if (metodo === "GET" && url === "/deudas") {
            const deudas = await deudaService.obtenerTodas();
            res.writeHead(200);
            res.end(JSON.stringify(deudas));
            return;
        }

        if (metodo === "GET" && url.startsWith("/deudas/")) {
            const id = Number(url.split("/")[2]);
            const deuda = await deudaService.obtenerPorId(id);

            if (!deuda) {
                res.writeHead(404);
                res.end(JSON.stringify({ mensaje: "Deuda no encontrada" }));
                return;
            }

            res.writeHead(200);
            res.end(JSON.stringify(deuda));
            return;
        }

        if (metodo === "POST" && url === "/deudas") {
            const body = await obtenerBody(req);
            await deudaService.crearDeuda(body);
            res.writeHead(201);
            res.end(JSON.stringify({ mensaje: "Deuda registrada con éxito" }));
            return;
        }

        if (metodo === "PUT" && url.startsWith("/deudas/")) {
            const id = Number(url.split("/")[2]);
            const body = await obtenerBody(req);
            body.idDeuda = id;

            await deudaService.actualizarDeuda(body);
            res.writeHead(200);
            res.end(JSON.stringify({ mensaje: "Deuda actualizada con éxito" }));
            return;
        }

        if (metodo === "DELETE" && url.startsWith("/deudas/")) {
            const id = Number(url.split("/")[2]);
            await deudaService.eliminarDeuda(id);
            res.writeHead(200);
            res.end(JSON.stringify({ mensaje: "Deuda eliminada con éxito" }));
            return;
        }


        // RUTAS DE PAGOS
        if (metodo === "GET" && url === "/pagos") {
            const pagos = await pagoService.obtenerTodos();
            res.writeHead(200);
            res.end(JSON.stringify(pagos));
            return;
        }

        if (metodo === "GET" && url.startsWith("/pagos/")) {
            const id = Number(url.split("/")[2]);
            const pago = await pagoService.obtenerPorId(id);

            if (!pago) {
                res.writeHead(404);
                res.end(JSON.stringify({ mensaje: "Pago no encontrado" }));
                return;
            }

            res.writeHead(200);
            res.end(JSON.stringify(pago));
            return;
        }

        if (metodo === "POST" && url === "/pagos") {
            const body = await obtenerBody(req);
            await pagoService.crearPago(body);
            res.writeHead(201);
            res.end(JSON.stringify({ mensaje: "Pago registrado con éxito" }));
            return;
        }

        if (metodo === "PUT" && url.startsWith("/pagos/")) {
            const id = Number(url.split("/")[2]);
            const body = await obtenerBody(req);
            body.idPago = id;

            await pagoService.actualizarPago(body);
            res.writeHead(200);
            res.end(JSON.stringify({ mensaje: "Pago actualizado con éxito" }));
            return;
        }

        if (metodo === "DELETE" && url.startsWith("/pagos/")) {
            const id = Number(url.split("/")[2]);
            await pagoService.eliminarPago(id);
            res.writeHead(200);
            res.end(JSON.stringify({ mensaje: "Pago eliminado con éxito" }));
            return;
        }


        // RUTAS DE RECORDATORIOS
        if (metodo === "GET" && url === "/recordatorios") {
            const recordatorios = await recordatorioService.obtenerTodos();
            res.writeHead(200);
            res.end(JSON.stringify(recordatorios));
            return;
        }

        if (metodo === "GET" && url.startsWith("/recordatorios/")) {
            const id = Number(url.split("/")[2]);
            const recordatorio = await recordatorioService.obtenerPorId(id);

            if (!recordatorio) {
                res.writeHead(404);
                res.end(JSON.stringify({ mensaje: "Recordatorio no encontrado" }));
                return;
            }

            res.writeHead(200);
            res.end(JSON.stringify(recordatorio));
            return;
        }

        if (metodo === "POST" && url === "/recordatorios") {
            const body = await obtenerBody(req);
            await recordatorioService.crearRecordatorio(body);
            res.writeHead(201);
            res.end(JSON.stringify({ mensaje: "Recordatorio registrado con éxito" }));
            return;
        }

        if (metodo === "PUT" && url.startsWith("/recordatorios/")) {
            const id = Number(url.split("/")[2]);
            const body = await obtenerBody(req);
            body.idRecordatorio = id;

            await recordatorioService.actualizarRecordatorio(body);
            res.writeHead(200);
            res.end(JSON.stringify({ mensaje: "Recordatorio actualizado con éxito" }));
            return;
        }

        if (metodo === "DELETE" && url.startsWith("/recordatorios/")) {
            const id = Number(url.split("/")[2]);
            await recordatorioService.eliminarRecordatorio(id);
            res.writeHead(200);
            res.end(JSON.stringify({ mensaje: "Recordatorio eliminado con éxito" }));
            return;
        }


        // RUTAS DE USUARIOS
        if (metodo === "GET" && url === "/usuarios") {
            const usuarios = await usuarioService.obtenerTodos();
            res.writeHead(200);
            res.end(JSON.stringify(usuarios));
            return;
        }

        if (metodo === "GET" && url.startsWith("/usuarios/")) {
            const id = Number(url.split("/")[2]);
            const usuario = await usuarioService.obtenerPorId(id);

            if (!usuario) {
                res.writeHead(404);
                res.end(JSON.stringify({ mensaje: "Usuario no encontrado" }));
                return;
            }

            res.writeHead(200);
            res.end(JSON.stringify(usuario));
            return;
        }

        if (metodo === "POST" && url === "/usuarios") {
            const body = await obtenerBody(req);
            await usuarioService.crearUsuario(body);
            res.writeHead(201);
            res.end(JSON.stringify({ mensaje: "Usuario registrado con éxito" }));
            return;
        }

        if (metodo === "PUT" && url.startsWith("/usuarios/")) {
            const id = Number(url.split("/")[2]);
            const body = await obtenerBody(req);
            body.idUsuario = id;

            await usuarioService.actualizarUsuario(body);
            res.writeHead(200);
            res.end(JSON.stringify({ mensaje: "Usuario actualizado con éxito" }));
            return;
        }

        if (metodo === "DELETE" && url.startsWith("/usuarios/")) {
            const id = Number(url.split("/")[2]);
            await usuarioService.eliminarUsuario(id);
            res.writeHead(200);
            res.end(JSON.stringify({ mensaje: "Usuario eliminado con éxito" }));
            return;
        }


        // Ruta no encontrada
        res.writeHead(404);
        res.end(JSON.stringify({ mensaje: "Ruta no encontrada" }));

    } catch (error) {
        res.writeHead(400);
        res.end(JSON.stringify({
            mensaje: (error as Error).message
        }));
    }
}