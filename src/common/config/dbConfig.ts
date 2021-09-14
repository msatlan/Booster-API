import mongoose from 'mongoose';
import { MONGO } from '../constants/constants';

let database: mongoose.Connection;

export const dbConnection = () => {
    if (database) {
        return;
    }

    mongoose.connect(MONGO.url, MONGO.configuration);

    database = mongoose.connection;

    database.once('open', async () => {
        console.log('Connected to database');
    });

    database.on('error', () => {
        console.log('Error connecting to database');
    });
};

export const disconnectFromDb = () => {
    if (!database) {
        return;
    }

    mongoose.disconnect();

    database.once('close', async () => {
        console.log('Diconnected from database');
    });
};
