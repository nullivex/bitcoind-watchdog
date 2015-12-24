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



## Changelog

### 0.1.0
* Initial Release
