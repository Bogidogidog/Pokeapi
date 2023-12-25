const fs = require('fs');

const fileReader = (path) => {
    console.log("data", path);
    return fs.readFileSync(path,"utf8", (err, data) => {
    if(err) {
        console.error(err);
        return;
    }
});
}
module.exports = fileReader;