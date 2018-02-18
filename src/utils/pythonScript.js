import { spawn } from 'child_process';
import * as log from 'loglevel';

/*
  Wrapper function to run python scripts.

  Arguments:
      Prameters to child_process.spawn

  Return Value:
      A promise that is resolved when an error occurs or when the script is
      completely run. On success promise resolves to output else promise is
      resolved to error.
*/
export default function runPythonScript(params) {
    return new Promise(function(resolve, reject) {
        let shell = false;
        // Creating a shell is required in Windows. In UNIX systems
        // its faster if 'shell' is set to 'false'.
        if (process.platform === "win32") shell = true;

        log.debug(
            "Command executed in runPythonScript: ",
            `python ${params}`
        );

        spawn("python", params, {
            shell: shell
        }).on("exit", function() {
            // On exit event extract output
            let output = this.stdout.read();

            // If output exists then convert it to string
            // and resolve Promise to output
            if (output)
                resolve(output.toString());
            else resolve("");
        }).on("error", function(err) {
            // An 'exit' event might not be emitted for all errors
            // In case of error reject Promise
            reject(err);
        });
    });
}
