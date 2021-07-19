import { app, MenuItem, MenuItemConstructorOptions } from "electron";
import { TrayMenu } from "./TrayMenu";

export class MenuBar {
  constructor(private trayMenu: TrayMenu) {}

  public generateTemplate(): MenuItemConstructorOptions[] | MenuItem[] {
    return [
      {
        label: "File",
        submenu: [
          {
            label: "Quit",
            accelerator: "Ctrl+Q",
            click: this.quit,
          },
        ],
      },
      {
        label: "Edit",
        submenu: [
          { role: "undo" },
          { role: "redo" },
          { type: "separator" },
          { role: "cut" },
          { role: "copy" },
          { role: "paste" },
          { role: "delete" },
          { type: "separator" },
          { role: "selectAll" },
        ],
      },
      {
        label: "View",
        submenu: [
          { role: "resetZoom" },
          { role: "zoomIn" },
          { role: "zoomOut" },
          { type: "separator" },
          { role: "togglefullscreen" },
        ],
      },
      {
        label: "Window",
        submenu: [{ role: "minimize" }, { role: "close" }],
      },
      {
        role: "help",
        submenu: [
          {
            label: "Learn More",
            click: async () => {
              (await import("electron")).shell.openExternal(
                "https://github.com/Devsfy/wiregui"
              );
            },
          },
        ],
      },
    ];
  }

  private quit = (): void => {
    this.trayMenu.isQuitting = true;
    app.quit();
  };
}
