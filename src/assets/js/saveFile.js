const fs = require('fs');

fs.writeFile('', 'This is my text',  function (err) {

    if(err) throw err;
    console.log('Result Received')


})