# Proyecto: DeudaCero

**Estudiante:** Wilfred De Paz  
**Grado:** 5to Diversificado en  Informática    

---

## Descripción del Proyecto

Este proyecto consiste en el desarrollo de un sistema integral backend y de interfaz por consola (CLI) utilizando **Node.js** y **TypeScript**. La aplicación combina la ejecución de un servidor HTTP nativo junto con una interfaz de comandos interactiva que permite administrar el ciclo completo de contactos, deudas, pagos y recordatorios de cobro de forma organizada.

El propósito principal es relacionar las distintas entidades del dominio (vinculando deudas a contactos específicos y pagos a sus respectivas deudas), garantizando una persistencia de datos estructurada y permitiendo realizar operaciones CRUD completas de forma sencilla.

---

## Objetivos Alcanzados

* **Servidor HTTP Nativo:** Creación y arranque de un servidor HTTP mediante el módulo nativo de Node.js, coordinando su inicio asíncrono con la interfaz del menú principal.
* **Interfaz Interactiva (CLI):** Uso del módulo `readline` para procesar entradas y salidas en tiempo real desde la consola mediante promesas y flujos asíncronos (`async/await`).
* **Lógica de Negocio y Relación de Entidades:** Vinculación de información en tiempo de ejecución entre módulos (cruzar `idPersona` de deudas con `idContacto` de contactos) para mostrar resúmenes completos.
* **Manejo de Operaciones CRUD:** Implementación completa de las funciones de consulta, búsqueda por ID, registro, actualización y eliminación para cada una de las clases de servicio.
* **Arquitectura Limpia por Capas:** Separación formal entre modelos de datos, servicios de lógica de negocio, enrutamiento/servidor y la capa de presentación o consola.

---

## Detalle de Módulos y Funcionalidades

### 1. Módulo de Contactos
Permite administrar el directorio de personas o clientes. Cuenta con listados consolidados, búsqueda individual por ID, registro de nuevos contactos, edición de información de contacto (correo, teléfono, dirección) y eliminación de registros existentes.

### 2. Módulo de Deudas
Gestiona las obligaciones financieras registradas en el sistema. Cada deuda incluye montos totales, saldos pendientes, fechas de creación/vencimiento, estados de pago y la vinculación con el contacto responsable.

### 3. Módulo de Pagos
Permite registrar abonados o liquidaciones de deudas existentes. Almacena la fecha de la transacción, el monto pagado, el método de pago utilizado y observaciones adicionales para llevar la trazabilidad del saldo.

### 4. Módulo de Recordatorios
Administra las notificaciones o alertas de cobro vinculadas a las deudas pendientes. Permite la creación y actualización de estados para gestionar el seguimiento con cada cliente.

---

## Tecnologías y Herramientas Utilizadas

* **Entorno de ejecución:** Node.js
* **Lenguaje de programación:** TypeScript 
* **Control de Consola:** Módulo nativo `readline`
* **Servidor de Red:** Módulo nativo `http`
* **Herramientas de ejecución:** `ts-node` / `tsx`
* **Gestor de paquetes:** pnpm
