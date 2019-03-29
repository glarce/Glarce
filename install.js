const exec = require('child_process').exec;
exec('npm install').on('exit', () => exec('echo installed'));
