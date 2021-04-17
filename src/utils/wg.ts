import { WgConfig } from "wireguard-tools";
import { run } from "./run";

export async function getCurrentConnectionName(): Promise<string> {
  const data = await run("wg show");
  if (data.stderr) {
    throw new Error(data.stderr);
  }

  const lines = data.stdout.split(/\n/);
  const connectionName = lines[0].split(" ")[1]?.replace(/(\r\n|\n|\r)/gm, "");
  return connectionName;
}

export async function startConnection(filePath: string): Promise<void> {
  if (process.platform === "win32") {
    await run(`wireguard /installtunnelservice ${filePath}`);
  } else {
    const config = new WgConfig({});
    await config.up(getConNameFromPath(filePath));
  }
}

export async function stopConnection(filePath: string): Promise<void> {
  if (process.platform === "win32") {
    await run(`wireguard /uninstalltunnelservice ${getConNameFromPath(filePath)}`);
  } else {
    const config = new WgConfig({});
    await config.down(getConNameFromPath(filePath));
  }
}

function getConNameFromPath(filePath: string): string {
  const pathSections = filePath.split(".");
  const noextension = pathSections[pathSections.length - 2];
  const dirnames = noextension.split(process.platform === "win32" ? "\\" : "/");
  return dirnames[dirnames.length - 1];
}
