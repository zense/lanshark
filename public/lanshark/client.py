from __future__ import with_statement
import os
import sys
import json

from lanshark.config import config
from lanshark import lib

config.set_prefix(os.path.abspath(os.path.join(
    os.path.dirname(__file__), os.pardir)))

"""This script provides client related functionality. Most of the functions
have been copied from bin/lansharkc but modified to return data rather than
print it. The script also provides a more "nodejs" favourable I/O than
lansharkc"""


def discover():
    """Discover other hosts in the network"""
    discoveredHosts = []
    for client in lib.discover():
        discoveredHosts.append(client)

    return discoveredHosts


def search(what):
    """Search for files"""
    what = what.decode(config.SYS_ENCODING)
    results = []
    for result in lib.search(what):
        results.append(result)

    return results


def ls(url, recursive=False):
    """List directory contents resursive is optional"""
    if recursive:
        listing = lib.ls_r(url)

    else:
        listing = lib.ls_l(url)

    return listing


def get(url):
    """Download url if url is - read urls from stdin"""
    urls = []
    if url == "-":
        for line in sys.stdin:
            try:
                urls.append(line[line.index("http://"):].strip())
            except ValueError:
                pass
    else:
        urls.append(url)
    # flatten recursive urls
    for url in urls:
        if url.endswith("/"):
            urls.remove(url)
            for suburl in lib.ls_r(url):
                urls.append(suburl)
    # and finaly download them
    for url in urls:
        try:
            download = lib.download(url)
            dest, bytes = download.next()
            sys.stdout.write("downloading %s from %s \n%i bytes left"
                             % (url, dest, bytes))
            for downloaded in download:
                bytes -= downloaded
                sys.stdout.write(("\r%i bytes left" % bytes).ljust(40))
                sys.stdout.flush()
            print ""
        except lib.DownloadException, e:
            print "skipping %s: %s" % (url, e.message)


def main():
    # Seperate function name from parameters
    command = sys.argv[1]
    params = sys.argv[2:]

    # Call function and print return value
    print json.dumps(globals()[command](*params))


if __name__ == "__main__":
    main()
