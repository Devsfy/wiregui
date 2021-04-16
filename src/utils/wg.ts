import { run } from "./run";

export async function getCurrentConnectionName(): Promise<string> {
  const data = await run("wg show");
  if (data.stderr) {
    throw new Error(data.stderr);
  }

  const lines = data.stdout.split(/\n/);
  const connectionName = lines[0].split(" ")[1];
  return connectionName;
}
