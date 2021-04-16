import util from "util";
import { exec } from "child_process";
export const run = util.promisify(exec);
