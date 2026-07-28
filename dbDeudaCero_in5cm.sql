drop database if exists dbdeudacero_in5cm;
create database dbdeudacero_in5cm;
use dbdeudacero_in5cm;

create table usuario (
    idusuario int auto_increment not null,
    nombreusuario varchar(50) not null,
    correousuario varchar(50) not null,
    passwordusuario varchar(100) not null,
    primary key pk_idusuario (idusuario)
);

create table contacto (
    idcontacto int auto_increment not null,
    nombrecontacto varchar(50) not null,
    correocontacto varchar(50) not null,
    telefonocontacto varchar(15) not null,
    direccioncontacto varchar(100) not null,
    idusuario int not null,
    primary key pk_idcontacto (idcontacto),
    constraint fk_contacto_usuario foreign key (idusuario)
        references usuario(idusuario) on delete cascade
);

create table deuda (
    iddeuda int auto_increment not null,
    montototal decimal(10,2) not null,
    saldopendiente decimal(10,2) not null,
    descripcion varchar(150) not null,
    fechacreacion date not null,
    fechavencimiento date not null,
    estado varchar(20) not null,
    idcontacto int not null,
    primary key pk_iddeuda (iddeuda),
    constraint fk_deuda_contacto foreign key (idcontacto)
        references contacto(idcontacto) on delete cascade
);

create table pago (
    idpago int auto_increment not null,
    montopago decimal(10,2) not null,
    fechapago date not null,
    metodopago varchar(50) not null,
    observacionpago varchar(150) not null,
    iddeuda int not null,
    primary key pk_idpago (idpago),
    constraint fk_pago_deuda foreign key (iddeuda)
        references deuda(iddeuda) on delete cascade
);

create table recordatorio (
    idrecordatorio int auto_increment not null,
    mensajerecordatorio varchar(150) not null,
    fecharecordatorio date not null,
    estadorecordatorio varchar(20) not null,
    iddeuda int not null,
    primary key pk_idrecordatorio (idrecordatorio),
    constraint fk_recordatorio_deuda foreign key (iddeuda)
        references deuda(iddeuda) on delete cascade
);

-- Usuario
delimiter $$
create procedure sp_usuario_create(
    in p_nombreusuario varchar(50), 
    in p_correousuario varchar(50), 
    in p_passwordusuario varchar(100)
)
begin
    insert into usuario(nombreusuario, correousuario, passwordusuario)
    values (p_nombreusuario, p_correousuario, p_passwordusuario);
end $$

create procedure sp_usuario_read_all()
begin
    select * from usuario order by idusuario;
end $$

create procedure sp_usuario_update(
    in p_idusuario int, 
    in p_nombreusuario varchar(50), 
    in p_correousuario varchar(50), 
    in p_passwordusuario varchar(100)
)
begin
    update usuario
    set nombreusuario = p_nombreusuario,
        correousuario = p_correousuario,
        passwordusuario = p_passwordusuario
    where idusuario = p_idusuario;
    select row_count() as filasafectadas;
end $$

create procedure sp_usuario_delete(in p_idusuario int)
begin
    delete from usuario where idusuario = p_idusuario;
    select row_count() as filasafectadas;
end $$
delimiter ;

-- Contacto
delimiter $$
create procedure sp_contacto_create(
    in p_nombrecontacto varchar(50), 
    in p_correocontacto varchar(50), 
    in p_telefonocontacto varchar(15), 
    in p_direccioncontacto varchar(100), 
    in p_idusuario int
)
begin
    insert into contacto(nombrecontacto, correocontacto, telefonocontacto, direccioncontacto, idusuario)
    values (p_nombrecontacto, p_correocontacto, p_telefonocontacto, p_direccioncontacto, p_idusuario);
end $$

create procedure sp_contacto_read_all()
begin
    select * from contacto order by idcontacto;
end $$

create procedure sp_contacto_update(
    in p_idcontacto int, 
    in p_nombrecontacto varchar(50), 
    in p_correocontacto varchar(50), 
    in p_telefonocontacto varchar(15), 
    in p_direccioncontacto varchar(100), 
    in p_idusuario int
)
begin
    update contacto
    set nombrecontacto = p_nombrecontacto,
        correocontacto = p_correocontacto,
        telefonocontacto = p_telefonocontacto,
        direccioncontacto = p_direccioncontacto,
        idusuario = p_idusuario
    where idcontacto = p_idcontacto;
    select row_count() as filasafectadas;
end $$

create procedure sp_contacto_delete(in p_idcontacto int)
begin
    delete from contacto where idcontacto = p_idcontacto;
    select row_count() as filasafectadas;
end $$
delimiter ;

-- Deuda
delimiter $$
create procedure sp_deuda_create(
    in p_montototal decimal(10,2), 
    in p_saldopendiente decimal(10,2), 
    in p_descripcion varchar(150), 
    in p_fechacreacion date, 
    in p_fechavencimiento date, 
    in p_estado varchar(20), 
    in p_idcontacto int
)
begin
    insert into deuda(montototal, saldopendiente, descripcion, fechacreacion, fechavencimiento, estado, idcontacto)
    values (p_montototal, p_saldopendiente, p_descripcion, p_fechacreacion, p_fechavencimiento, p_estado, p_idcontacto);
end $$

create procedure sp_deuda_read_all()
begin
    select * from deuda order by iddeuda;
end $$

create procedure sp_deuda_update(
    in p_iddeuda int, 
    in p_montototal decimal(10,2), 
    in p_saldopendiente decimal(10,2), 
    in p_descripcion varchar(150), 
    in p_fechacreacion date, 
    in p_fechavencimiento date, 
    in p_estado varchar(20), 
    in p_idcontacto int
)
begin
    update deuda
    set montototal = p_montototal,
        saldopendiente = p_saldopendiente,
        descripcion = p_descripcion,
        fechacreacion = p_fechacreacion,
        fechavencimiento = p_fechavencimiento,
        estado = p_estado,
        idcontacto = p_idcontacto
    where iddeuda = p_iddeuda;
    select row_count() as filasafectadas;
end $$

create procedure sp_deuda_delete(in p_iddeuda int)
begin
    delete from deuda where iddeuda = p_iddeuda;
    select row_count() as filasafectadas;
end $$
delimiter ;

-- Pago
delimiter $$
create procedure sp_pago_create(
    in p_montopago decimal(10,2), 
    in p_fechapago date, 
    in p_metodopago varchar(50), 
    in p_observacionpago varchar(150), 
    in p_iddeuda int
)
begin
    insert into pago(montopago, fechapago, metodopago, observacionpago, iddeuda)
    values (p_montopago, p_fechapago, p_metodopago, p_observacionpago, p_iddeuda);
end $$

create procedure sp_pago_read_all()
begin
    select * from pago order by idpago;
end $$

create procedure sp_pago_update(
    in p_idpago int, 
    in p_montopago decimal(10,2), 
    in p_fechapago date, 
    in p_metodopago varchar(50), 
    in p_observacionpago varchar(150), 
    in p_iddeuda int
)
begin
    update pago
    set montopago = p_montopago,
        fechapago = p_fechapago,
        metodopago = p_metodopago,
        observacionpago = p_observacionpago,
        iddeuda = p_iddeuda
    where idpago = p_idpago;
    select row_count() as filasafectadas;
end $$

create procedure sp_pago_delete(in p_idpago int)
begin
    delete from pago where idpago = p_idpago;
    select row_count() as filasafectadas;
end $$
delimiter ;

--  Recordatorio 
delimiter $$
create procedure sp_recordatorio_create(
    in p_mensajerecordatorio varchar(150), 
    in p_fecharecordatorio date, 
    in p_estadorecordatorio varchar(20), 
    in p_iddeuda int
)
begin
    insert into recordatorio(mensajerecordatorio, fecharecordatorio, estadorecordatorio, iddeuda)
    values (p_mensajerecordatorio, p_fecharecordatorio, p_estadorecordatorio, p_iddeuda);
end $$

create procedure sp_recordatorio_read_all()
begin
    select * from recordatorio order by idrecordatorio;
end $$

create procedure sp_recordatorio_update(
    in p_idrecordatorio int, 
    in p_mensajerecordatorio varchar(150), 
    in p_fecharecordatorio date, 
    in p_estadorecordatorio varchar(20), 
    in p_iddeuda int
)
begin
    update recordatorio
    set mensajerecordatorio = p_mensajerecordatorio,
        fecharecordatorio = p_fecharecordatorio,
        estadorecordatorio = p_estadorecordatorio,
        iddeuda = p_iddeuda
    where idrecordatorio = p_idrecordatorio;
    select row_count() as filasafectadas;
end $$

create procedure sp_recordatorio_delete(in p_idrecordatorio int)
begin
    delete from recordatorio where idrecordatorio = p_idrecordatorio;
    select row_count() as filasafectadas;
end $$
delimiter ;

-- 1. Usuarios
CALL sp_Usuario_create('Kevin López', 'kevinlopez@email.com', '12345');
CALL sp_Usuario_create('María González', 'mariagonzalez@email.com', '12345');
CALL sp_Usuario_create('Carlos Méndez', 'carlosmendez@email.com', '12345');
CALL sp_Usuario_create('Ana Ramírez', 'anaramirez@email.com', '12345');
CALL sp_Usuario_create('Luis Hernández', 'luishernandez@email.com', '12345');
CALL sp_Usuario_create('Sofía Castillo', 'sofiacastillo@email.com', '12345');
CALL sp_Usuario_create('Jorge Morales', 'jorgemorales@email.com', '12345');
CALL sp_Usuario_create('Paola Díaz', 'paoladiaz@email.com', '12345');
CALL sp_Usuario_create('Miguel Pérez', 'miguelperez@email.com', '12345');
CALL sp_Usuario_create('Valeria Flores', 'valeriaflores@email.com', '12345');

-- 2. Contactos
CALL sp_Contacto_create('Juan Pérez', 'juanperez@email.com', '55559876', 'zona 13', 1);
CALL sp_Contacto_create('Carlos Méndez', 'carlosmendez@email.com', '4444-5678', 'Zona 2', 2);
CALL sp_Contacto_create('María Pérez', 'mariaperez@email.com', '3333-9012', 'Zona 3', 3);
CALL sp_Contacto_create('Luis García', 'luisgarcia@email.com', '2222-3456', 'Zona 4', 4);
CALL sp_Contacto_create('Sofía Ramírez', 'sofiaramirez@email.com', '6666-7890', 'Zona 5', 5);
CALL sp_Contacto_create('Jorge Castillo', 'jorgecastillo@email.com', '7777-2345', 'Zona 6', 6);
CALL sp_Contacto_create('Paola Díaz', 'paoladiaz@email.com', '8888-6789', 'Zona 7', 7);
CALL sp_Contacto_create('Miguel Hernández', 'miguelhernandez@email.com', '9999-0123', 'Zona 8', 8);
CALL sp_Contacto_create('Elena Morales', 'elenamorales@email.com', '4444-4567', 'Zona 9', 9);

-- 3. Deudas
CALL sp_Deuda_create(500.00, 500.00, 'Compra de productos', '2026-07-01', '2026-08-01', 'Pendiente', 1);
CALL sp_Deuda_create(1200.00, 700.00, 'Préstamo personal', '2026-07-02', '2026-08-02', 'Pendiente', 2);
CALL sp_Deuda_create(850.00, 0.00, 'Compra de materiales', '2026-07-03', '2026-08-03', 'Pagada', 3);
CALL sp_Deuda_create(300.00, 300.00, 'Venta al crédito', '2026-07-04', '2026-08-04', 'Pendiente', 4);
CALL sp_Deuda_create(1500.00, 900.00, 'Préstamo para negocio', '2026-07-05', '2026-08-05', 'Pendiente', 5);
CALL sp_Deuda_create(450.00, 0.00, 'Compra de accesorios', '2026-07-06', '2026-08-06', 'Pagada', 6);
CALL sp_Deuda_create(950.00, 450.00, 'Compra de herramientas', '2026-07-07', '2026-08-07', 'Pendiente', 7);
CALL sp_Deuda_create(600.00, 600.00, 'Préstamo familiar', '2026-07-08', '2026-08-08', 'Pendiente', 8);
CALL sp_Deuda_create(780.00, 0.00, 'Compra de electrodomésticos', '2026-07-09', '2026-08-09', 'Pagada', 9);
CALL sp_Deuda_create(2000.00, 1200.00, 'Financiamiento de equipo', '2026-07-10', '2026-08-10', 'Pendiente', 1);

-- 4. Pagos
CALL sp_Pago_create(500.00, '2026-07-18', 'Transferencia', 'Abono parcial', 1);
CALL sp_Pago_create(850.00, '2026-07-20', 'Efectivo', 'Pago completo', 2);
CALL sp_Pago_create(100.00, '2026-07-21', 'Tarjeta', 'Primer pago', 3);
CALL sp_Pago_create(600.00, '2026-07-22', 'Transferencia', 'Abono', 4);
CALL sp_Pago_create(450.00, '2026-07-23', 'Efectivo', 'Pago total', 5);
CALL sp_Pago_create(500.00, '2026-07-24', 'Tarjeta', 'Abono parcial', 6);
CALL sp_Pago_create(300.00, '2026-07-25', 'Efectivo', 'Primer abono', 7);
CALL sp_Pago_create(780.00, '2026-07-26', 'Transferencia', 'Pago completo', 8);
CALL sp_Pago_create(800.00, '2026-07-27', 'Efectivo', 'Abono inicial', 9);

-- 5. Recordatorios
CALL sp_Recordatorio_create('Recordar al contacto que la deuda vence pronto.', '2026-07-30', 'Pendiente', 1);
CALL sp_Recordatorio_create('Enviar recordatorio de pago.', '2026-07-31', 'Pendiente', 2);
CALL sp_Recordatorio_create('La deuda ya fue cancelada.', '2026-07-20', 'Completado', 3);
CALL sp_Recordatorio_create('Recordar el próximo abono.', '2026-08-01', 'Pendiente', 4);
CALL sp_Recordatorio_create('Notificar que el pago está próximo a vencer.', '2026-08-02', 'Pendiente', 5);
CALL sp_Recordatorio_create('Pago recibido correctamente.', '2026-07-23', 'Completado', 6);
CALL sp_Recordatorio_create('Enviar aviso de saldo pendiente.', '2026-08-03', 'Pendiente', 7);
CALL sp_Recordatorio_create('Recordar el pago antes del vencimiento.', '2026-08-04', 'Pendiente', 8);
CALL sp_Recordatorio_create('La deuda fue liquidada.', '2026-07-26', 'Completado', 9);
CALL sp_Recordatorio_create('Recordar realizar el siguiente abono.', '2026-08-05', 'Pendiente', 10);

CALL sp_Usuario_read_all();
CALL sp_Contacto_read_all();
CALL sp_Deuda_read_all();
CALL sp_Pago_read_all();
CALL sp_Recordatorio_read_all();