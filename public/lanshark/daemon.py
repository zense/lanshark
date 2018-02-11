from __future__ import with_statement
import errno
import os
import sys
import signal

import lanshark
import lanshark.daemon
from lanshark.config import config

config.set_prefix(os.path.abspath(os.path.join(
    os.path.dirname(__file__), os.pardir)))

"""This script start the lanshard daemon. Most of the functions have been
copied from bin/lanshard. This script only makes it easier to start the daemon
since there isn't any need for giving command line arguments."""


# Copied from bin/lansharkd
def daemonize():
    """daemonize process, really minimal implementation"""
    pid = os.fork()
    if pid > 0:
        sys.exit(0)

    # clear environment
    os.chdir("/")
    os.setsid()
    os.umask(0)
    pid = os.fork()
    if pid > 0:
        sys.exit(0)

    si = file('/dev/null', 'r')
    so = file('/dev/null', 'a+')
    se = file('/dev/null', 'a+', 0)

    os.dup2(si.fileno(), sys.stdin.fileno())
    os.dup2(so.fileno(), sys.stdout.fileno())
    os.dup2(se.fileno(), sys.stderr.fileno())


# Copied from bin/lansharkd
def start():
    """start the lanshark daemon foreground is optional"""
    if os.path.exists(config.PID_FILE):
        with open(config.PID_FILE, "r") as f:
            pid = int(f.read())
        try:
            os.kill(pid, 0)
            running = True
        except OSError, e:
            running = (e.errno == errno.EPERM)
        if running:
            raise SystemExit("already running with pid %i" % pid)
        else:
            os.remove(config.PID_FILE)

    with open(config.PID_FILE, "w") as f:
        daemonize()
        f.write(str(os.getpid()))
    signal.signal(signal.SIGTERM, shutdown)
    lanshark.daemon.Daemon().run()


# Copied from bin/lansharkd
def shutdown(n, frame):
    os.remove(config.PID_FILE)
    sys.exit(0)


# Starts main process
def main():
    start()


if __name__ == "__main__":
    main()
