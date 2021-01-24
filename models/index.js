//*** Dependencies ***//
//====================//
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const basename = path.basename(__filename);
let models = {};

//Connect to the DB
(async () => {
    try {
        await mongoose.connect(process.env.dbURI, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
    } catch (err) {
        err => console.error(err);
    }
}
)();

//Notify of successful DB connection
mongoose.connection.on('connected', () => {
    console.log(`> Mongoose connection to '${process.env.dbName}' established`)
});
//Notify when DB is disconnected
mongoose.connection.on('disconnected', () => {
    console.log(`> Mongoose connection to '${process.env.dbName}' disconnected`)
});
//Notify when DB is reconnected
mongoose.connection.on('reconnected', () => {
    console.log(`> Mongoose connection to '${process.env.dbName}' reestablished`)
});
//Notify when DB is closed
mongoose.connection.on('close', () => {
    console.log(`> '${process.env.dbName}' connection closed`)
});
//Notify if error in connection
mongoose.connection.on('error', (err) => {
    console.log(`ERROR: ${err}`)
});

fs
    .readdirSync(__dirname)
    .filter((filename) => {
        // Get file's name that lives in the same directory without myself.
        return (filename.indexOf('.') !== 0) && (filename !== basename);
    })
    .forEach((filename) => {
        // If file's extension is not 'js', break.
        if (filename.slice(-3) !== '.js') return;

        var filepath = path.join(__dirname, filename)

        // When imported file use 'export default', object is assinged 'default'.
        var imported = (require(filepath).default) ?
            require(filepath).default :
            require(filepath);

        if (typeof imported.modelName !== 'undefined') {
            // Model definition file is expected exporting 'Model' of mongoose.
            models[imported.modelName] = imported;
        }
    });


models._mongoose = mongoose;

module.exports = models;