import { createInterface } from "readline";
import { ContactoService } from "../service/contactoService";
import { DeudaService } from "../service/deudaService";
import { PagoService } from "../service/pagoService";
import { RecordatorioService } from "../service/recordatorioService";

export class Menu {
    private contactoService = new ContactoService();
    private deudaService = new DeudaService();
    private pagoService = new PagoService();
    private recordatorioService = new RecordatorioService();

    private rl = createInterface({
        input: process.stdin,
        output: process.stdout
    });

    private preguntar(mensaje: string): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question(mensaje, (respuesta) => resolve(respuesta));
        });
    }

    public async iniciar(): Promise<void> {
        let salir = false;

        while (!salir) {
            console.log("\n=================================");
            console.log("      SISTEMA DE GESTIÓN        ");
            console.log("=================================");
            console.log("1. Módulo Contactos");
            console.log("2. Módulo Deudas");
            console.log("3. Módulo Pagos");
            console.log("4. Módulo Recordatorios");
            console.log("5. Salir");
            console.log("=================================");

            const opcion = await this.preguntar("Seleccione una opción: ");

            switch (opcion.trim()) {
                case "1":
                    await this.menuContactos();
                    break;
                case "2":
                    await this.menuDeudas();
                    break;
                case "3":
                    await this.menuPagos();
                    break;
                case "4":
                    await this.menuRecordatorios();
                    break;
                case "5":
                    console.log("\n¡Saliendo del programa!");
                    salir = true;
                    this.rl.close();
                    break;
                default:
                    console.log("\nOpción no válida, intente de nuevo.");
                    break;
            }
        }
    }

    private async menuContactos(): Promise<void> {
        let volver = false;

        while (!volver) {
            console.log("\n--- MENÚ CONTACTOS ---");
            console.log("1. Listar contactos");
            console.log("2. Buscar contacto por ID");
            console.log("3. Agregar contacto");
            console.log("4. Editar contacto");
            console.log("5. Eliminar contacto");
            console.log("6. Volver al menú principal");

            const opcion = await this.preguntar("Seleccione una opción: ");

            try {
                switch (opcion.trim()) {
                    case "1": {
                        const contactos = await this.contactoService.obtenerTodos();
                        console.log("\n--- LISTA DE CONTACTOS ---");
                        console.table(contactos);
                        break;
                    }
                    case "2": {
                        const id = Number(await this.preguntar("Ingrese el ID del contacto: "));
                        const contacto = await this.contactoService.obtenerPorId(id);
                        if (contacto) {
                            console.table([contacto]);
                        } else {
                            console.log("Contacto no encontrado.");
                        }
                        break;
                    }
                    case "3": {
                        console.log("\n--- AGREGAR CONTACTO ---");
                        const idContacto = Number(await this.preguntar("ID Contacto: "));
                        const nombreContacto = await this.preguntar("Nombre: ");
                        const correoContacto = await this.preguntar("Correo: ");
                        const telefonoContacto = await this.preguntar("Teléfono: ");
                        const direccionContacto = await this.preguntar("Dirección: ");
                        const idUsuario = Number(await this.preguntar("ID Usuario: "));

                        await this.contactoService.crearContacto({
                            idContacto,
                            nombreContacto,
                            correoContacto,
                            telefonoContacto,
                            direccionContacto,
                            idUsuario
                        });
                        break;
                    }
                    case "4": {
                        console.log("\n--- EDITAR CONTACTO ---");
                        const idContacto = Number(await this.preguntar("ID del contacto a editar: "));
                        const nombreContacto = await this.preguntar("Nuevo Nombre: ");
                        const correoContacto = await this.preguntar("Nuevo Correo: ");
                        const telefonoContacto = await this.preguntar("Nuevo Teléfono: ");
                        const direccionContacto = await this.preguntar("Nueva Dirección: ");
                        const idUsuario = Number(await this.preguntar("ID Usuario: "));

                        await this.contactoService.actualizarContacto({
                            idContacto,
                            nombreContacto,
                            correoContacto,
                            telefonoContacto,
                            direccionContacto,
                            idUsuario
                        });
                        break;
                    }
                    case "5": {
                        const id = Number(await this.preguntar("ID del contacto a eliminar: "));
                        await this.contactoService.eliminarContacto(id);
                        break;
                    }
                    case "6":
                        volver = true;
                        break;
                    default:
                        console.log("Opción no válida.");
                        break;
                }
            } catch (error) {
                console.log("Error:", (error as Error).message);
            }
        }
    }

    private async menuDeudas(): Promise<void> {
        let volver = false;

        while (!volver) {
            console.log("\n--- MENÚ DEUDAS ---");
            console.log("1. Listar deudas");
            console.log("2. Buscar deuda por ID");
            console.log("3. Agregar deuda");
            console.log("4. Editar deuda");
            console.log("5. Eliminar deuda");
            console.log("6. Volver al menú principal");

            const opcion = await this.preguntar("Seleccione una opción: ");

            try {
                switch (opcion.trim()) {
                    case "1": {
                        const deudas = await this.deudaService.obtenerTodas();
                        console.log("\n--- LISTA DE DEUDAS ---");
                        console.table(deudas);
                        break;
                    }
                    case "2": {
                        const id = Number(await this.preguntar("Ingrese el ID de la deuda: "));
                        const deuda = await this.deudaService.obtenerPorId(id);
                        if (deuda) {
                            console.table([deuda]);
                        } else {
                            console.log("Deuda no encontrada.");
                        }
                        break;
                    }
                    case "3": {
                        console.log("\n--- AGREGAR DEUDA ---");
                        const idDeuda = Number(await this.preguntar("ID Deuda: "));
                        const montoTotal = Number(await this.preguntar("Monto Total: "));
                        const saldoPendiente = Number(await this.preguntar("Saldo Pendiente: "));
                        const descripcion = await this.preguntar("Descripción: ");
                        const fechaCreacion = await this.preguntar("Fecha Creación (AAAA-MM-DD): ");
                        const fechaVencimiento = await this.preguntar("Fecha Vencimiento (AAAA-MM-DD): ");
                        const estado = await this.preguntar("Estado (PENDIENTE/PAGADO): ");
                        const idPersona = Number(await this.preguntar("ID Persona: "));

                        await this.deudaService.crearDeuda({
                            idDeuda,
                            montoTotal,
                            saldoPendiente,
                            descripcion,
                            fechaCreacion,
                            fechaVencimiento,
                            estado,
                            idPersona
                        });
                        break;
                    }
                    case "4": {
                        console.log("\n--- EDITAR DEUDA ---");
                        const idDeuda = Number(await this.preguntar("ID de la deuda a editar: "));
                        const montoTotal = Number(await this.preguntar("Nuevo Monto Total: "));
                        const saldoPendiente = Number(await this.preguntar("Nuevo Saldo Pendiente: "));
                        const descripcion = await this.preguntar("Nueva Descripción: ");
                        const fechaCreacion = await this.preguntar("Fecha Creación (AAAA-MM-DD): ");
                        const fechaVencimiento = await this.preguntar("Fecha Vencimiento (AAAA-MM-DD): ");
                        const estado = await this.preguntar("Nuevo Estado: ");
                        const idPersona = Number(await this.preguntar("ID Persona: "));

                        await this.deudaService.actualizarDeuda({
                            idDeuda,
                            montoTotal,
                            saldoPendiente,
                            descripcion,
                            fechaCreacion,
                            fechaVencimiento,
                            estado,
                            idPersona
                        });
                        break;
                    }
                    case "5": {
                        const id = Number(await this.preguntar("ID de la deuda a eliminar: "));
                        await this.deudaService.eliminarDeuda(id);
                        break;
                    }
                    case "6":
                        volver = true;
                        break;
                    default:
                        console.log("Opción no válida.");
                        break;
                }
            } catch (error) {
                console.log("Error:", (error as Error).message);
            }
        }
    }

    private async menuPagos(): Promise<void> {
        let volver = false;

        while (!volver) {
            console.log("\n--- MENÚ PAGOS ---");
            console.log("1. Listar pagos");
            console.log("2. Buscar pago por ID");
            console.log("3. Registrar pago");
            console.log("4. Editar pago");
            console.log("5. Eliminar pago");
            console.log("6. Volver al menú principal");

            const opcion = await this.preguntar("Seleccione una opción: ");

            try {
                switch (opcion.trim()) {
                    case "1": {
                        const pagos = await this.pagoService.obtenerTodos();
                        console.log("\n--- LISTA DE PAGOS ---");
                        console.table(pagos);
                        break;
                    }
                    case "2": {
                        const id = Number(await this.preguntar("Ingrese el ID del pago: "));
                        const pago = await this.pagoService.obtenerPorId(id);
                        if (pago) {
                            console.table([pago]);
                        } else {
                            console.log("Pago no encontrado.");
                        }
                        break;
                    }
                    case "3": {
                        console.log("\n--- REGISTRAR PAGO ---");
                        const idPago = Number(await this.preguntar("ID Pago: "));
                        const montoPago = Number(await this.preguntar("Monto del Pago: "));
                        const fechaPago = await this.preguntar("Fecha Pago (AAAA-MM-DD): ");
                        const metodoPago = await this.preguntar("Método de Pago: ");
                        const observacionPago = await this.preguntar("Observación: ");
                        const idDeuda = Number(await this.preguntar("ID Deuda: "));

                        await this.pagoService.crearPago({
                            idPago,
                            montoPago,
                            fechaPago,
                            metodoPago,
                            observacionPago,
                            idDeuda
                        });
                        break;
                    }
                    case "4": {
                        console.log("\n--- EDITAR PAGO ---");
                        const idPago = Number(await this.preguntar("ID del pago a editar: "));
                        const montoPago = Number(await this.preguntar("Nuevo Monto: "));
                        const fechaPago = await this.preguntar("Nueva Fecha (AAAA-MM-DD): ");
                        const metodoPago = await this.preguntar("Nuevo Método: ");
                        const observacionPago = await this.preguntar("Nueva Observación: ");
                        const idDeuda = Number(await this.preguntar("ID Deuda: "));

                        await this.pagoService.actualizarPago({
                            idPago,
                            montoPago,
                            fechaPago,
                            metodoPago,
                            observacionPago,
                            idDeuda
                        });
                        break;
                    }
                    case "5": {
                        const id = Number(await this.preguntar("ID del pago a eliminar: "));
                        await this.pagoService.eliminarPago(id);
                        break;
                    }
                    case "6":
                        volver = true;
                        break;
                    default:
                        console.log("Opción no válida.");
                        break;
                }
            } catch (error) {
                console.log("Error:", (error as Error).message);
            }
        }
    }

    private async menuRecordatorios(): Promise<void> {
        let volver = false;

        while (!volver) {
            console.log("\n--- MENÚ RECORDATORIOS ---");
            console.log("1. Listar recordatorios");
            console.log("2. Buscar recordatorio por ID");
            console.log("3. Crear recordatorio");
            console.log("4. Editar recordatorio");
            console.log("5. Eliminar recordatorio");
            console.log("6. Volver al menú principal");

            const opcion = await this.preguntar("Seleccione una opción: ");

            try {
                switch (opcion.trim()) {
                    case "1": {
                        const recordatorios = await this.recordatorioService.obtenerTodos();
                        console.log("\n--- LISTA DE RECORDATORIOS ---");
                        console.table(recordatorios);
                        break;
                    }
                    case "2": {
                        const id = Number(await this.preguntar("Ingrese el ID del recordatorio: "));
                        const recordatorio = await this.recordatorioService.obtenerPorId(id);
                        if (recordatorio) {
                            console.table([recordatorio]);
                        } else {
                            console.log("Recordatorio no encontrado.");
                        }
                        break;
                    }
                    case "3": {
                        console.log("\n--- CREAR RECORDATORIO ---");
                        const idRecordatorio = Number(await this.preguntar("ID Recordatorio: "));
                        const mensajeRecordatorio = await this.preguntar("Mensaje: ");
                        const fechaRecordatorio = await this.preguntar("Fecha Recordatorio (AAAA-MM-DD): ");
                        const estadoRecordatorio = await this.preguntar("Estado (PENDIENTE/ENVIADO): ");
                        const idDeuda = Number(await this.preguntar("ID Deuda: "));

                        await this.recordatorioService.crearRecordatorio({
                            idRecordatorio,
                            mensajeRecordatorio,
                            fechaRecordatorio,
                            estadoRecordatorio,
                            idDeuda
                        });
                        break;
                    }
                    case "4": {
                        console.log("\n--- EDITAR RECORDATORIO ---");
                        const idRecordatorio = Number(await this.preguntar("ID a editar: "));
                        const mensajeRecordatorio = await this.preguntar("Nuevo Mensaje: ");
                        const fechaRecordatorio = await this.preguntar("Nueva Fecha (AAAA-MM-DD): ");
                        const estadoRecordatorio = await this.preguntar("Nuevo Estado: ");
                        const idDeuda = Number(await this.preguntar("ID Deuda: "));

                        await this.recordatorioService.actualizarRecordatorio({
                            idRecordatorio,
                            mensajeRecordatorio,
                            fechaRecordatorio,
                            estadoRecordatorio,
                            idDeuda
                        });
                        break;
                    }
                    case "5": {
                        const id = Number(await this.preguntar("ID a eliminar: "));
                        await this.recordatorioService.eliminarRecordatorio(id);
                        break;
                    }
                    case "6":
                        volver = true;
                        break;
                    default:
                        console.log("Opción no válida.");
                        break;
                }
            } catch (error) {
                console.log("Error:", (error as Error).message);
            }
        }
    }
}