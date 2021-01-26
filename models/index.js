//*** Dependencies ***//
//====================//
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const basename = path.basename(__filename);
const Schema  = mongoose.Schema

//*** Models Object ***//
//=====================//
let db = {};

// Connect to the DB
(async () => {
    try {
        await mongoose.connect(process.env.dbURI, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
    } catch (err) { err => console.error(err) }
})();

//Notify of successful DB connection
mongoose.connection.on('connected', () => {
    console.log(`> Mongoose connection to '${process.env.dbName}' connected`)
});
//Notify when DB is disconnected
mongoose.connection.on('disconnected', () => {
    console.log(`> Mongoose connection to '${process.env.dbName}' disconnected`)
});
//Notify when DB is closed
mongoose.connection.on('close', () => {
    console.log(`> '${process.env.dbName}' connection closed`)
});
//Notify if error in connection
mongoose.connection.on('error', (err) => {
    console.log(`ERROR: ${err}`)
});

fs.readdirSync(__dirname)
    .filter((filename) => {
        // Get file's name that lives in the same directory that are not index.js
        return (filename.indexOf('.') !== 0) && (filename !== basename) && (filename.slice(-3) === '.js');
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(mongoose, Schema);
        db[model.name] = model;
    });

 db = mongoose.models;
 db._mongoose = mongoose;


module.exports = db;


