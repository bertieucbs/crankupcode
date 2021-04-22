// Node.js program to demonstrate the	
// gzip() method


const fs = require('fs');

let rawdata = fs.readFileSync('logs_sample.json');
let logsObj = JSON.parse(rawdata);
console.log(logsObj);

var myJSON = JSON.stringify(logsObj);
console.log(myJSON)

// Including zlib module
const zlib = require("zlib");

// Declaring input and assigning
// it a value string

var input = myJSON

// Calling gzip method
zlib.gzip(input, (err, buffer) => {

if (!err) {

	console.log(buffer.toString('base64'));
}
else {
	console.log(err);
}
});
console.log("Data Compressed...");

