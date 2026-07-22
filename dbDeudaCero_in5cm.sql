drop database dbDeudaCero_in5cm;
create database dbDeudaCero_in5cm;
use dbDeudaCero_in5cm;

create table cliente (
	idCliente int auto_increment not null,
    nombreCliente varchar(45) not null,
    correoCliente varchar(45) not null,
    telefonoCliente varchar(9) not null,
    primary key PK_idCLiente (idCliente)
);

create table deuda (
	idDeuda int auto_increment not null,
    idCliente int not null,
    montoTotal decimal(10,2) not null,
    montoPagado decimal(10,2) not null,
    descripcion varchar(150) not null,
    fechaVencimiento date not null,
    estado enum ('Pendiente', 'Pagada'),
    primary key PK_idDeuda (idDeuda),
    constraint FK_deuda_cliente foreign key (idCliente)	
		references cliente(idCliente) on delete cascade
);

create table pago (
	idPago int auto_increment not null,
    idDeuda int not null,
    montopago decimal(10,2) not null,
    fechapago date not null,
    primary key PK_idPago (idPago),
    constraint FK_pago_deuda foreign key (idDeuda)
		references deuda(idDeuda) on delete cascade
);

create table recordatorio (
	idRecordatorio int auto_increment not null,
    idDeuda int not null,
    fechaEnvio date not null,
    mensaje varchar(150) not null,
    primary key PK_idRecordatorio (idRecordatorio),
    constraint FK_recordatorio_deuda foreign key (idDeuda)
		references deuda(idDeuda) on delete cascade
);

-- Procedimientos almacenados

-- Cliente
-- Create
delimiter $$ 
    create procedure sp_cliente_create(p_nombreCliente varchar(45), p_correoCliente varchar(45), p_telefonoCliente varchar(9))
    begin 
        insert into cliente(nombreCliente, correoCliente, telefonoCliente)
        values (p_nombreCliente, p_correoCliente, p_telefonoCliente);
    end $$
delimiter ;

-- Read All
delimiter $$
    create procedure sp_cliente_read_all()
    begin 
        select * from cliente order by idCliente;
    end $$
delimiter ;

-- Update
delimiter $$
    create procedure sp_cliente_update(in p_idCliente int, in p_nombreCliente varchar(45), in p_correoCliente varchar(45), in p_telefonoCliente varchar(9))
    begin 
        update cliente
        set nombreCliente = p_nombreCliente,
            correoCliente = p_correoCliente,
            telefonoCliente = p_telefonoCliente
        where idCliente = p_idCliente;
        select row_count() as filas_afectadas;
    end $$
delimiter ;

-- Delete
delimiter $$
    create procedure sp_cliente_delete(in p_idCliente int)
    begin
        delete from cliente where idCliente = p_idCliente;
        select row_count() as filas_afectadas;
    end $$
delimiter ;

-- Deuda
-- Create
delimiter $$ 
    create procedure sp_deuda_create(p_idCliente int, p_montoTotal decimal(10,2), p_montoPagado decimal(10,2), p_descripcion varchar(150), p_fechaVencimiento date, p_estado enum ('Pendiente', 'Pagada'))
    begin 
        insert into deuda(idCliente, montoTotal, montoPagado, descripcion, fechaVencimiento, estado)
        values (p_idCliente, p_montoTotal, p_montoPagado, p_descripcion, p_fechaVencimiento, p_estado);
    end $$
delimiter ;

-- Read All
delimiter $$
    create procedure sp_deuda_read_all()
    begin 
        select * from deuda order by idDeuda;
    end $$
delimiter ;

-- Update
delimiter $$
    create procedure sp_deuda_update(in p_idDeuda int, in p_idCliente int, in p_montoTotal decimal(10,2), in p_montoPagado decimal(10,2), in p_descripcion varchar(150), in p_fechaVencimiento date, in p_estado enum ('Pendiente', 'Pagada'))
    begin 
        update deuda
        set idCliente = p_idCliente,
            montoTotal = p_montoTotal,
            montoPagado = p_montoPagado,
            descripcion = p_descripcion,
            fechaVencimiento = p_fechaVencimiento,
            estado = p_estado
        where idDeuda = p_idDeuda;
        select row_count() as filas_afectadas;
    end $$
delimiter ;

-- Delete
delimiter $$
    create procedure sp_deuda_delete(in p_idDeuda int)
    begin
        delete from deuda where idDeuda = p_idDeuda;
        select row_count() as filas_afectadas;
    end $$
delimiter ;

-- Pago
-- Create
delimiter $$ 
    create procedure sp_pago_create(p_idDeuda int, p_monto decimal(10,2), p_fecha date)
    begin 
        insert into pago(idDeuda, monto, fecha)
        values (p_idDeuda, p_monto, p_fecha);
    end $$
delimiter ;

-- Read All
delimiter $$
    create procedure sp_pago_read_all()
    begin 
        select * from pago order by idPago;
    end $$
delimiter ;

-- Update
delimiter $$
    create procedure sp_pago_update(in p_idPago int, in p_idDeuda int, in p_monto decimal(10,2), in p_fecha date)
    begin 
        update pago
        set idDeuda = p_idDeuda,
            monto = p_monto,
            fecha = p_fecha
        where idPago = p_idPago;
        select row_count() as filas_afectadas;
    end $$
delimiter ;

-- Delete
delimiter $$
    create procedure sp_pago_delete(in p_idPago int)
    begin
        delete from pago where idPago = p_idPago;
        select row_count() as filas_afectadas;
    end $$
delimiter ;

-- Recordatorio
-- Create
delimiter $$ 
    create procedure sp_recordatorio_create(p_idDeuda int, p_fechaEnvio date, p_mensaje varchar(150))
    begin 
        insert into recordatorio(idDeuda, fechaEnvio, mensaje)
        values (p_idDeuda, p_fechaEnvio, p_mensaje);
    end $$
delimiter ;

-- Read All
delimiter $$
    create procedure sp_recordatorio_read_all()
    begin 
        select * from recordatorio order by idRecordatorio;
    end $$
delimiter ;

-- Update
delimiter $$
    create procedure sp_recordatorio_update(in p_idRecordatorio int, in p_idDeuda int, in p_fechaEnvio date, in p_mensaje varchar(150))
    begin 
        update recordatorio
        set idDeuda = p_idDeuda,
            fechaEnvio = p_fechaEnvio,
            mensaje = p_mensaje
        where idRecordatorio = p_idRecordatorio;
        select row_count() as filas_afectadas;
    end $$
delimiter ;

-- Delete
delimiter $$
    create procedure sp_recordatorio_delete(in p_idRecordatorio int)
    begin
        delete from recordatorio where idRecordatorio = p_idRecordatorio;
        select row_count() as filas_afectadas;
    end $$
delimiter ;

CALL sp_cliente_create('Ana López', 'analopez@email.com', '5555-1234');
CALL sp_cliente_create('Carlos Méndez', 'carlosmendez@email.com', '4444-5678');
CALL sp_cliente_create('María Pérez', 'mariaperez@email.com', '3333-9012');
CALL sp_cliente_create('Luis García', 'luisgarcia@email.com', '2222-3456');
CALL sp_cliente_create('Sofía Ramírez', 'sofiaramirez@email.com', '6666-7890');
CALL sp_cliente_create('Jorge Castillo', 'jorgecastillo@email.com', '7777-2345');
CALL sp_cliente_create('Paola Díaz', 'paoladiaz@email.com', '8888-6789');
CALL sp_cliente_create('Miguel Hernández', 'miguelhernandez@email.com', '9999-0123');
CALL sp_cliente_create('Elena Morales', 'elenamorales@email.com', '4444-4567');
CALL sp_cliente_create('Ricardo Flores', 'ricardoflores@email.com', '5555-8901');

CALL sp_cliente_read_all();

CALL sp_deuda_create(1, 1500.00, 500.00, 'Préstamo personal comercial', '2026-07-15', 'Pendiente');
CALL sp_deuda_create(2, 3000.00, 3000.00, 'Pago de membresía anual', '2026-05-20', 'Pagada');
CALL sp_deuda_create(3, 450.50, 0.00, 'Servicios de mantenimiento', '2026-06-30', 'Pendiente');
CALL sp_deuda_create(4, 12000.00, 4000.00, 'Financiamiento de equipo', '2026-12-01', 'Pendiente');
CALL sp_deuda_create(5, 850.00, 850.00, 'Compra de suministros', '2026-04-10', 'Pagada');
CALL sp_deuda_create(6, 2500.00, 0.00, 'Saldo de línea de crédito', '2026-08-18', 'Pendiente');
CALL sp_deuda_create(7, 600.00, 200.00, 'Suscripción de software empresarial', '2026-07-05', 'Pendiente');
CALL sp_deuda_create(8, 5000.00, 5000.00, 'Anticipo de contrato de obra', '2026-05-02', 'Pagada');
CALL sp_deuda_create(9, 175.00, 0.00, 'Cargo por mora administrativa', '2026-06-25', 'Pendiente');
CALL sp_deuda_create(10, 3400.00, 1400.00, 'Seguro vehicular trimestral', '2026-09-10', 'Pendiente');

CALL sp_deuda_read_all();

CALL sp_pago_create(1, 500.00, '2026-06-10');
CALL sp_pago_create(2, 3000.00, '2026-05-18');
CALL sp_pago_create(4, 2000.00, '2026-05-25');
CALL sp_pago_create(4, 2000.00, '2026-06-12');
CALL sp_pago_create(5, 850.00, '2026-04-09');
CALL sp_pago_create(7, 200.00, '2026-06-01');
CALL sp_pago_create(8, 5000.00, '2026-04-30');
CALL sp_pago_create(10, 1400.00, '2026-06-05');
CALL sp_pago_create(1, 250.00, '2026-06-15');
CALL sp_pago_create(4, 1500.00, '2026-06-16'); 

CALL sp_pago_read_all();

CALL sp_recordatorio_create(1, '2026-06-15', 'Estimado cliente, le recordamos su saldo pendiente en el préstamo.');
CALL sp_recordatorio_create(3, '2026-06-10', 'Aviso: Su factura por servicios de mantenimiento vence pronto.');
CALL sp_recordatorio_create(4, '2026-06-01', 'Recordatorio de cuota mensual para su financiamiento de equipo.');
CALL sp_recordatorio_create(6, '2026-06-16', 'Su línea de crédito presenta un saldo pendiente próximo a vencer.');
CALL sp_recordatorio_create(7, '2026-06-20', 'Evite la suspensión de su software, recuerde realizar su pago.');
CALL sp_recordatorio_create(9, '2026-06-12', 'Primer aviso formal sobre su cargo por mora administrativa.');
CALL sp_recordatorio_create(10, '2026-06-02', 'Notificación de emisión de factura para su seguro vehicular.');
CALL sp_recordatorio_create(1, '2026-07-01', 'Segundo aviso: Su cuota mensual se encuentra próxima al límite.');
CALL sp_recordatorio_create(3, '2026-06-25', 'Último aviso: Su pago de mantenimiento vence en 5 días.');
CALL sp_recordatorio_create(6, '2026-07-01', 'Actualización de estado de cuenta para su saldo pendiente.');

CALL sp_recordatorio_read_all();