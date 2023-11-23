import mongoose from 'mongoose';

function DbConnect() {
    const DB_URL = process.env.DB_URL as string || 'mongodb://0.0.0.0:27017/hackerNews';
    mongoose.connect(DB_URL);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('DB connected...');
    });
}

export default DbConnect;
