
// const {spawn} = require('child_process');

const { exec } = require('child_process');
const { error } = require('console');
const { stderr } = require('process');


// function createFile() {


// var largeDataSet = [];
//  // spawn new child process to call the python script
//  const python = spawn('python', ['../py/AppRunning.py']);
//  // collect data from script
//  python.stdout.on('data', function (data) {
//   console.log('Pipe data from python script ...');
//   largeDataSet.push(data);
//  });

 
//  // in close event we are sure that stream is from child process is closed
//  python.on('close', function (code) {
//  console.log(`child process close all stdio with code ${code}`);

//  });
 


// }

// createFile();

const execFile = require('child_process').execFile;

execFile('python', ['./AppRunning.py'], (error, stdout, stderr) => {

  if(error) {

    console.error('stderr', stderr);
    throw error;
  }

  console.log('stdout', stdout)

});


