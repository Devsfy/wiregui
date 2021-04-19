import * as path from "path";

export function getIconsPath(filename: string, isDevelopement: boolean) {
  if (isDevelopement) {
    return path.resolve(path.join(__dirname, "..", "..", "src", "assets", "icons", filename));
  }
  return path.resolve(path.join(__dirname, "..", "renderer", "icons", filename));
}
