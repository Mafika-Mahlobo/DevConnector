const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = () => {
    try {
        mongoose.connect(db).then(() => {
            console.log('Database connected');
        }).catch(() => {
            console.log('Cannot connect to DB');
        });
        
    } catch(err) {
        console.log(err.message);
        // Exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;