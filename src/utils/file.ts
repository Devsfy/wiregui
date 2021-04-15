import * as fs from "fs";

export interface ConfFile {
  name: string;
  path: string;
  data: string;
}

export async function readFile(name: string, path: string): Promise<ConfFile> {
  const data = fs.readFileSync(path, "utf-8");

  return {
    name,
    path,
    data,
  };
}
