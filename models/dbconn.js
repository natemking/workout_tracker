//*** Dependencies ***//
//====================//
const mongoose = require("mongoose");

//Connect to the DB
(async () => {
    try {
        await mongoose.connect(process.env.dbURI, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
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
    console.log(`> '${ process.env.dbName }' connection closed`)
});
//Notify if error in connection
mongoose.connection.on('error', (err) => {
    console.log(`ERROR: ${err}`)
});

module.exports = mongoose;