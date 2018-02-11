import path from "path";

/*
  This file contains values of some resources to be used everywhere else.

  The following named exports are made:
    - lansharkd: Path to utils/lanshark/client.py program.
    - lansharkc: Path to utils/lanshark/daemon.py program.
*/

// Path to folder where lanshard and lansharc programs are present
var pathLansharkBinary = path.join(__dirname, 'lanshark');

export var lansharkd = path.join(pathLansharkBinary, 'daemon.py');
export var lansharkc = path.join(pathLansharkBinary, 'client.py');
