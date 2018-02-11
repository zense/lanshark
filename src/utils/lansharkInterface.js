import { spawn } from "child_process";
import * as log from 'loglevel';
import * as resources from "utils/resources";

/*
  This file contains functions to call the lanshark python programs.

  The following named exports are made:
    - startDaemon: Starts the daemon.
    - discover: Returns list of available hosts
    - ls: Returns listing of directory
    - search: Search for file or directory across available hosts
*/

/*
  Wrapper function to run python scripts.

  Arguments:
      Prameters to child_process.spawn

  Return Value:
      A promise that is resolved when an error occurs or when the script is
      completely run. On success promise resolves to output else promise is
      resolved to error.
*/
function runPythonScript(params) {
    return new Promise(function(resolve, reject) {
        var shell = false;
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
            var output = this.stdout.read();

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

/*
  Starts the daemon in the background.

  Return Value:
      It returns a Promise that is resolved when the program finishes execution.
      Since the daemon program (python script) redirects I/O automatically the
      Promise is not resovled to any value nor is it rejected on error.

  TODO: Fix error handling and I/O
*/
export function startDaemon() {
    return runPythonScript([resources.lansharkd]).then(function() {
        log.info(
            "lansharkInterface.js/startDaemon: Start daemon script executed."
        );
    });
}

/*
  Lists available hosts.

  Return Value:
      A Promise that is resovled to the list of available hosts. Each value in
      the array is a tuple of the form: (host_name, URL_of_Root)

      In case of error the error is logged and the promise is resolved to an
      empty error.
*/
export function discover() {
    return runPythonScript([
        resources.lansharkc,
        'discover'
    ]).then(function(hosts) {
        log.info(
            "lansharkInterface.js/discover: Recieved available hosts list"
        );
        log.debug(hosts);

        return JSON.parse(hosts);
    }).catch(function(err) {
        log.error(
            "An error occured in lansharkInterface.js/discover: ",
            err
        );

        // Return a valid result to prevent errors in calling functions
        return [];
    });
}

/*
  Lists the contents of a directory

  Arguments:
      The url whose listing is to be retrieved. URL should be a directory
      (i.e. it should end with a '/')

  Return Value:
      A Promise that is resolved to an Array of the contents of the directory.
      Each value is a tuple of the form: (name, size, icon)
      
      Size is a tuple in case name is a directory of the form:
      (num_subfolders, num_files)

      In case of error the error is logged and the promise is resolved to an
      empty array.
*/
export function ls(url) {
    return runPythonScript([
        resources.lansharkc,
        'ls',
        url
    ]).then(function(listing) {
        log.info("lansharkInterface.js/ls: Recieved listing of ", url);
        log.debug(listing);

        // Convert to JS Array
        return JSON.parse(listing);
    }).catch(function(err) {
        // Catch and log any errors
        log.error(
            "lansharkInterface.js/ls: ",
            err
        );

        // Return a valid result to prevent errors in calling functions
        return [];
    });
}

/*
  Lists the matches of a search across all hosts

  Arguments:
    The searchString which is matched with file names.

  Return Value:
    A Promise that is resolved to an Array of matched URLs.

    In case of error the error is logged and the promise is resolved to an
    empty array.
*/
export function search(searchString) {
    return runPythonScript([
        resources.lansharkc,
        'search',
        searchString
    ]).then(function(matches) {
        log.info("lanshark/Interface.jsRecieved matches for search: ", searchString);
        log.debug(matches);

        return JSON.parse(matches);
    }).catch(function(err) {
        log.error(
            "An error occurred in lansharkInterface.js/search: ",
            err
        );

        // Return a valid result to prevent errors in calling functions
        return [];
    });
}
