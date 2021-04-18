import { run } from "./run";

export async function getCurrentConnectionName(): Promise<string> {
  try {
    const data = await run("wg show", false);
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
  } catch (e) {
    if (!e.stderr) {
      throw new Error(e.message);
    }

    const splittedText: string[] = e.stderr.split(":");
    const indexOfName = splittedText[0].lastIndexOf(" ");
    const connectionName = splittedText[0].substring(indexOfName + 1, splittedText[0].length);

    return connectionName;
  }
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
