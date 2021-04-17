import { exec } from "sudo-prompt";

interface ExecResponse {
  stdout?: string | Buffer;
  stderr?: string | Buffer;
}

class ExecError extends Error {
  constructor(
    public error: Error,
    public stdout?: string | Buffer,
    public stderr?: string | Buffer,
  ) {
    super(error.message);
  }
}

export async function run(command: string) {
  return new Promise<ExecResponse>((resolve, reject) => {
    exec(command, { name: "wiregui" }, function (error?: Error, stdout?: string | Buffer, stderr?: string | Buffer) {
        if (!error) {
          resolve({ stdout, stderr });
        } else {
          reject(new ExecError(error, stdout, stderr));
        }
      }
    );
  });
}
