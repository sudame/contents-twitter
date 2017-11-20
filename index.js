const fs = require('fs');
const unzip = require('unzip');

console.log(process.argv[2]);

fs.createReadStream(process.argv[2]).pipe(unzip.Extract({ path: './tmp/' }));