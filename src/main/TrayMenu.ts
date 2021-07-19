import {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  MenuItem,
  MenuItemConstructorOptions,
  nativeImage,
  Tray,
} from "electron";
import { getIconsPath } from "../utils";

interface TunnelInfo {
  name: string;
  active: boolean;
}

export class TrayMenu {
  public isQuitting: boolean;

  private tunnels: TunnelInfo[];

  private tray: Tray;

  private contextMenu: Menu;

  private readonly icon: nativeImage;

  private readonly iconActive: nativeImage;

  constructor(private readonly window: BrowserWindow, isDevelopement: boolean) {
    this.tunnels = [];
    this.isQuitting = false;
    this.icon = nativeImage.createFromPath(getIconsPath("icon_tray.png", isDevelopement));
    this.iconActive = nativeImage.createFromPath(getIconsPath("icon_tray_active.png", isDevelopement));

    this.tray = new Tray(this.icon);
    this.tray.setToolTip("Wire GUI");
    this.contextMenu = Menu.buildFromTemplate(this.mountTrayMenuItems());
    this.tray.setContextMenu(this.contextMenu);

    ipcMain.on("WgConfigStateChange", (event, args: TunnelInfo[]) => {
      this.tunnels = args;

      this.contextMenu = Menu.buildFromTemplate(this.mountTrayMenuItems());
      this.tray.setContextMenu(this.contextMenu);

      // When calling setContextMenu alongside setImage
      // For some reason electron reloads the tray image
      // With this hack this doesn't happen
      setTimeout(() => {
        this.tray.setImage(this.tunnels.some(tunnel => tunnel.active) ? this.iconActive : this.icon);
      }, 100);
    });

    window.on("close", (event) => {
      if (!this.isQuitting) {
        event.preventDefault();
        window.hide();
      }
      return false;
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

    const body: (MenuItemConstructorOptions | MenuItem)[] = this.tunnels.map(
      (tunnel) => {
        return {
          label: tunnel.active ? `${tunnel.name} (active)` : tunnel.name,
          type: "normal",
          click: () => {
            this.window.webContents.send("toggleTunnel", tunnel);
          },
        };
      }
    );

    const footer: (MenuItemConstructorOptions | MenuItem)[] = [
      {
        label: "Quit",
        type: "normal",
        click: () => {
          this.isQuitting = true;
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
