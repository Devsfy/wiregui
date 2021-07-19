import {
  app,
  BrowserWindow,
  dialog,
  MenuItem,
  MenuItemConstructorOptions,
} from "electron";
import { TrayMenu } from "./TrayMenu";

export class MenuBar {
  constructor(
    private readonly window: BrowserWindow,
    private readonly trayMenu?: TrayMenu
  ) {}

  public generateTemplate(): MenuItemConstructorOptions[] | MenuItem[] {
    return [
      {
        label: "File",
        submenu: [
          {
            label: "Import",
            accelerator: "Ctrl+O",
            click: this.import,
          },
          {
            type: "separator",
          },
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

  private import = async (): Promise<void> => {
    const result = await dialog.showOpenDialog({
      properties: ["openFile", "multiSelections"],
      filters: [{ name: "Config file", extensions: ["conf"] }],
    });

    if (!result.canceled && result.filePaths.length > 0) {
      this.window.webContents.send("importFiles", result.filePaths);
    }
  };

  private quit = (): void => {
    if (this.trayMenu) {
      this.trayMenu.isQuitting = true;
    }
    app.quit();
  };
}
