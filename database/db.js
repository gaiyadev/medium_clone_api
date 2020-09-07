require('dotenv').config();
const mongoose = require('mongoose');

const ConnectDb = async () => {
    await mongoose.connect(process.env.APP_DB_CONNECTION,
        {
            useNewUrlParser: true,

        }).
        then(() => console.log('Connected to Database Successfully...'))
        .catch(err => console.error('Failed Could not connect to Database', err));
}

ConnectDb();