import { app, BrowserWindow, ipcMain, Menu, MenuItem, MenuItemConstructorOptions, Tray } from "electron";
import { getIconsPath } from "../utils";

interface TunnelInfo {
  name: string;
  active: boolean;
}

export class TrayMenu {
  private tunnels: TunnelInfo[];

  private tray: Tray;

  private contextMenu: Menu;

  constructor(private readonly window: BrowserWindow, isDevelopement: boolean) {
    this.tunnels = [];

    this.tray = new Tray(getIconsPath("icon_tray.png", isDevelopement));
    this.tray.setToolTip("Wire GUI")
    this.contextMenu = Menu.buildFromTemplate(this.mountTrayMenuItems());
    this.tray.setContextMenu(this.contextMenu);

    ipcMain.on("WgConfigStateChange", (event, args: TunnelInfo[]) => {
      this.tunnels = args;
      this.contextMenu = Menu.buildFromTemplate(this.mountTrayMenuItems());
      this.tray.setContextMenu(this.contextMenu);
    });
  }

  private mountTrayMenuItems(): (MenuItemConstructorOptions | MenuItem)[] {
    const header: (MenuItemConstructorOptions | MenuItem)[] = [
      {
        label: "Open Wire GUI",
        type: "normal",
        click: () => {
          this.window.show();
          this.window.focus();
        },
      },
    ];

    const body: (MenuItemConstructorOptions | MenuItem)[] = this.tunnels.map((tunnel) => {
      return {
        label: tunnel.active ? `${tunnel.name} (active)` : tunnel.name,
        type: "normal",
        click: () => {
          this.window.webContents.send("toggleTunnel", tunnel);
        }
      }
    });

    const footer: (MenuItemConstructorOptions | MenuItem)[] = [
      {
        label: "Quit Wire GUI",
        type: "normal",
        click: () => {
          app.quit();
        },
      },
    ];

    header.push({ type: "separator" });
    if (body.length > 0) {
      footer.unshift({ type: "separator" });
    }

    return header.concat(body, footer);
  }
}
