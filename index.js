const fs = require('fs');
const unzip = require('unzip2');
const rmdir = require('rmdir');
const ctj = require('csvtojson');
const twitter = require('twitter');

const screenName = process.argv[3];

fs.createReadStream(process.argv[2]).pipe(unzip.Parse()).on('entry', function (entry) {
    var fileName = entry.path;
    var type = entry.type; // 'Directory' or 'File' 
    var size = entry.size;
    if (fileName === "tweets.csv") {
        entry.pipe(fs.createWriteStream('./tmp/tweets.csv'));
        convert();
    } else {
        entry.autodrain();
    }
});

function convert() {
    let convertedJSON = {};
    ctj().fromFile('./tmp/tweets.csv').on('json', (jsonObj) => {
        if (jsonObj.text.indexOf("#コンテンツ応用論2017") >= 0) {
            console.log('https://twitter.com/' + screenName + '/status/' + jsonObj.tweet_id);
        }
    }).on('done', (error) => {
        console.log('end');
        console.log(error);
    })
}