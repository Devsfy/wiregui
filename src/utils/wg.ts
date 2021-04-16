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
    const config = new WgConfig({ filePath });
    await config.parseFile();
    await config.up();
  }
}

export async function stopConnection(filePath: string): Promise<void> {
  if (process.platform === "win32") {
    const noextension = filePath.split(".")[0];
    const dirnames = noextension.split("\\");
    const name = dirnames[dirnames.length - 1];
    await run(`wireguard /uninstalltunnelservice ${name}`);
  } else {
    const config = new WgConfig({ filePath });
    await config.parseFile();
    await config.down();
  }
}
