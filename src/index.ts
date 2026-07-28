import { iniciarServidor } from "./api/server";
import { Menu } from "./menu/menu";

iniciarServidor(() => {
    const menu = new Menu();
    menu.iniciar();
});