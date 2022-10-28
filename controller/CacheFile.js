const fs = require('fs');

function Write(file, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, function (err) {
            if (err) {
                reject(err)
            } else {
                resolve({
                    status: 'success',
                    file: file
                })
            }
        })
    })
}

function Read(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data.toString())
            }
        })
    })
}

module.exports = { Write, Read }