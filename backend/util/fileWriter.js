const fs = require('fs');

const fileWriter = (path,data)=> {
    fs.writeFileSync(path, data, (err)=> {
        if(err) {
            console.error(err);
            return
        }
    })
}
module.exports= fileWriter