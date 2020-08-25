const { Server } = require('./server');
const mongoose = require('mongoose');
const config = require('./config/config');


process.on('uncaughtException', (err) => {
    console.error('Unhandled Exception', err.stack);
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection', err);
    process.exit(1);
});

process.on('SIGINT', async () => {
    try {
        console.log('User Termination');
        process.exit(0);
    } catch (error) {
        console.error('Failed to close connections', error);
    }
});


(async () => {

    await mongoose.connect(
        config.config.db.connectionString,
        { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true  },
    );

    console.log(`[MongoDB] connected successfuly`);
    console.log('Starting server');
    const serverInstance = new Server();

    serverInstance.app.on('close', () => {
        mongoose.disconnect();
        console.log('Server closed');
    });
})();



// (() => {
//     console.log('Starting server');
//     const serverInstance = new Server();
//     serverInstance.app.on('close', () => {
//         console.log('Server closed');
//         process.exit(0);
//     });
// })();