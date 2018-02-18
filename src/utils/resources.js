import { remote } from 'electron';
import path from 'path';
import log from 'loglevel';

/*
  This file contains values of some resources to be used everywhere else.

  The following named exports are made:
  - lansharkd: Path to utils/lanshark/client.py program.
  - lansharkc: Path to utils/lanshark/daemon.py program.
*/

// Get path to src from main.js so that resource paths can be constructed
const pathToSrc = remote.getGlobal('pathToSrc');

// Path to folder where lanshard and lansharc programs are present
const pathLansharkBinary = path.join(pathToSrc, 'lanshark');

export const lansharkd = path.join(pathLansharkBinary, 'daemon.py');
log.debug('util/resources.js lansharkd: ', lansharkd);

export const lansharkc = path.join(pathLansharkBinary, 'client.py');
log.debug('util/resources.js lansharkc: ', lansharkc);
