bitcoind-watchdog
========

NodeJS process designed to run on top of (ndt)[https://github.com/nullivex/ndt]

## Installation

We assume you already have bitcoind installed and available on your system.

We also assume you already have node and npm installed and available.

Next we want daemontools to run ndt.

On Debian (adapt as neccessary)
```
$ apt-get install daemontools daemontools-run
$ ln -s /etc/service /service
```

Now we need ndt and bitcoind-watchdog

```
$ npm -g install ndt bitcoind-watchdog
```

Now we want ndt to use bitcoind watchdog or you can use it in the foreground

**foreground**
```
$ bitcoind-watchdog -i 300 //restart every 300 seconds 5 mins
<ctl + c to shutdown>
```

**background**

We need to setup ndt for this

```
$ mkdir /opt/bitcoind-watchdog
$ cd /opt/bitcoind-watchdog
``

Make `/opt/bitcoind-watchdog/dt.json` like so

```json
{
  "name": "bitcoind-watchdog",
  "cwd": "/opt/bitcoind-watchdog",
  "user": "root",
  "command": "bitcoind-watchdog",
  "env": {
    "NODE_ENV": "production"
  },
  "log": {
    "user": "root",
    "command": "multilog s16777215 t /opt/bitcoind-watchdog/log"
  }
}
```

Now install it

```
$ cd /opt/bitcoind-watchdog
$ ndt install
$ ndt save
```

It should be running now see `tail -f /opt/bitcoind-watchdog/log/current`

This will now start on reboots and automatically watch and restart the process.

## Changelog

### 0.1.0
* Initial Release
