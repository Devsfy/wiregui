import { run } from "./run";

export async function getCurrentConnectionName(): Promise<string> {
  const data = await run("wg show");

  if (data.stderr) {
    throw new Error(Buffer.isBuffer(data.stderr) ? data.stderr.toString("utf-8") : data.stderr);
  }

  if (!data.stdout) {
    return "";
  }

  if (Buffer.isBuffer(data.stdout)) {
    data.stdout = data.stdout.toString("utf-8");
  }

  const lines = data.stdout.split(/\n/);
  const connectionName = lines[0].split(" ")[1]?.replace(/(\r\n|\n|\r)/gm, "");
  return connectionName;
}

export async function start(filePath: string): Promise<void> {
  if (process.platform === "win32") {
    await run(`wireguard /installtunnelservice ${filePath}`);
  } else {
    await run(`wg-quick up ${filePath.replace(" ", "\\ ")}`);
  }
}

export async function stop(filePath: string): Promise<void> {
  if (process.platform === "win32") {
    await run(`wireguard /uninstalltunnelservice ${getNameFromPath(filePath)}`);
  } else {
    await run(`wg-quick down ${filePath.replace(" ", "\\ ")}`);
  }
}

function getNameFromPath(filePath: string): string {
  const filename = filePath.replace(/^.*[\\/]/, "");
  return filename.substring(0, filename.lastIndexOf("."))
}
