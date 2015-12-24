#!/usr/bin/env node
'use strict';
var infant = require('infant')
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

var child = infant.parent('bitcoind')

//wire up io
process.stdin.pipe(child.cp.stdin)
child.cp.stdout.pipe(process.stdout)
child.cp.stderr.pipe(process.stderr)

//start bitcoind
child.start(function(err){
  if(err) return errorHandler(err)
  console.log('Bitcoind running')
})

//setup our restart function
var restartBitcoind = function(done){
  child.restart(function(err){
    done(err)
  })
}

//check for an interval and setup a restart if we want
var interval = program.interval || null
if(interval){
  setInterval(function(){
    restartBitcoind(errorHandler)
  },interval)
}
