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

    let connectionName = "";

    if (process.platform === "win32") {
      const splittedText: string[] = e.stderr.split("Unable to access interface");
      const indexOfSymbol = splittedText[1].indexOf(":");
      connectionName = splittedText[1].substring(1, indexOfSymbol);
    } else {
      const splittedText: string[] = e.stderr.split(":");
      const indexOfName = splittedText[0].lastIndexOf(" ");
      connectionName = splittedText[0].substring(indexOfName + 1, splittedText[0].length);
    }

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

export async function toggle(filePath: string): Promise<boolean> {
  const connectionName = getNameFromPath(filePath);
  const currentConnectionName = await getCurrentConnectionName();

  if (currentConnectionName && currentConnectionName !== connectionName) {
    throw new Error("Another tunnel is already running, deactivate it first.");
  }

  let started = false;

  if (currentConnectionName === connectionName) {
    await stop(filePath);
    started = false;
  } else {
    await start(filePath);
    started = true;
  }

  return started;
}

function getNameFromPath(filePath: string): string {
  const filename = filePath.replace(/^.*[\\/]/, "");
  return filename.substring(0, filename.lastIndexOf("."))
}
