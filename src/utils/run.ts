import child from "child_process";
import sudo from "sudo-prompt";

interface ExecResponse {
  stdout?: string | Buffer;
  stderr?: string | Buffer;
}

class ExecError extends Error {
  constructor(
    public error: Error,
    public stdout?: string | Buffer,
    public stderr?: string | Buffer
  ) {
    super(error.message);
  }
}

export async function run(command: string, sudoPrompt = true) {
  return new Promise<ExecResponse>((resolve, reject) => {
    if (sudoPrompt) {
      sudo.exec(
        command,
        { name: "wiregui" },
        function (
          error?: Error,
          stdout?: string | Buffer,
          stderr?: string | Buffer
        ) {
          if (!error) {
            resolve({ stdout, stderr });
          } else {
            reject(new ExecError(error, stdout, stderr));
          }
        }
      );
    } else {
      child.exec(
        command,
        function (
          error: child.ExecException | null,
          stdout: string,
          stderr: string
        ) {
          if (!error) {
            resolve({ stdout, stderr });
          } else {
            reject(new ExecError(error, stdout, stderr));
          }
        }
      );
    }
  });
}
