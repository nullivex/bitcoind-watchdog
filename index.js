#!/usr/bin/env node
'use strict';
var cp = require('child_process')
var program = require('commander')

var pkg = require('./package.json')

program
  .version(pkg.version)
  .option('-i, --interval <n>','Interval in seconds to restart process')
  .parse(process.argv)


var errorHandler = function(err){
  console.log(err,err.trace)
  process.exit(1)
}

var bitcoind
var spawnBitcoind = function(){
  bitcoind = cp.spawn('bitcoind',[],{stdio: [0,1,2], uid: 0, gid: 0})
}

//setup our restart function
var restartBitcoind = function(done){
  cp.exec('bitcoin-cli stop',function(err){
    if(err) console.log('Failed to stop bitcoind',err,err.trace)
    bitcoind.kill(9)
    spawnBitcoind()
    done()
  })
}

//check for an interval and setup a restart if we want
var interval = program.interval || null
if(interval){
  setInterval(function(){
    restartBitcoind(errorHandler)
  },interval)
}
