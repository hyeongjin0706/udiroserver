import { mgconfig } from '../config.js';
import MongoDb from 'mongodb';

let db;
export async function connectDB(){
    return MongoDb.MongoClient.connect(mgconfig.db.host)
        .then((client) => {
            db = client.db()
        });
}

export function getUsers(){
    return db.collection('users');
}

export function getCultures(){
    return db.collection('Cultures');
}