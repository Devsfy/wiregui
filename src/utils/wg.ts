import { run } from "./run";

export async function getActiveTunnelName(): Promise<string> {
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
    const tunnelName = lines[0].split(" ")[1]?.replace(/(\r\n|\n|\r)/gm, "");
  
    return tunnelName;
  } catch (e) {
    if (!e.stderr) {
      throw new Error(e.message);
    }

    let tunnelName = "";

    if (process.platform === "win32") {
      const splittedText: string[] = e.stderr.split("Unable to access interface");

      if (splittedText.length < 2) {
        return tunnelName;
      }

      const indexOfSymbol = splittedText[1].indexOf(":");
      tunnelName = splittedText[1].substring(1, indexOfSymbol);
    } else {
      const splittedText: string[] = e.stderr.split(":");

      if (splittedText.length < 1) {
        return tunnelName;
      }

      const indexOfName = splittedText[0].lastIndexOf(" ");
      tunnelName = splittedText[0].substring(indexOfName + 1, splittedText[0].length);
    }

    return tunnelName;
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
  const tunnelName = getNameFromPath(filePath);
  const activeTunnelName = await getActiveTunnelName();

  if (activeTunnelName && activeTunnelName !== tunnelName) {
    throw new Error("Another tunnel is already running, deactivate it first.");
  }

  let started = false;

  if (activeTunnelName === tunnelName) {
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
