import runPythonScript from 'utils/pythonScript';
import path from 'path';
import * as log from 'loglevel';

/*
  This script is used to manage the lanshark daemon. This script is usually made
  use of in the main process.
*/

// resources uses remote to correctly set path for render process thus it won't
// work in main process. Since this script is usually called within the main
// process we can use __dirname
const PATH_DAEMON = path.join(__dirname, 'lanshark', 'daemon.py');

/*
  Starts the daemon in the background.

  Return Value:
  It returns a Promise that is resolved when the program finishes execution.
  Since the daemon program (python script) redirects I/O automatically the
  Promise is not resovled to any value nor is it rejected on error.

  TODO: Fix error handling and I/O
*/
export function startDaemon() {     // eslint-disable-line
  return runPythonScript([PATH_DAEMON]).then(() => {
    log.info('lansharkInterface.js/startDaemon: Start daemon script executed.');
  });
}
