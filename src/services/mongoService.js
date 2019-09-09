const { MongoClient } = require('mongodb');
const debug = require('debug')('EXPRESS_POC:MONGO_SERVICE');

function mongoService(){

    const DB_URL = process.env.DB_CONN;
    const DB_NAME =  process.env.DB_NAME;

    //FUNCTION TO INSERT MULTIPLE RECORDS IN DB
    async function insertMany(collectionParam, query ){
        let client;
        const collection = collectionParam;
        try{
            client = await MongoClient.connect(DB_URL);
            debug('Connected correctly to server');
            const db = client.db(DB_NAME);
            const response = await db.collection(collection).insertMany(query);
            return response;
        }
        catch(err){
            debug(err.stack);
        }
        client.close();
    }

    //FUNCTION TO INSERT SINGLE RECORDS IN DB
    async function insertOne(collectionParam, query ){
        let client;
        const collection = collectionParam;
        try{
            client = await MongoClient.connect(DB_URL);
            debug('Connected correctly to server');
            const db = client.db(DB_NAME);
            const response = await db.collection(collection).insertOne(query);
            return response;
        }
        catch(err){
            debug(err.stack);
        }
        client.close();
    }

    //FUNCTION TO FIND ONE RECORD IN DB
    async function findOne(collectionParam, query ){
        let client;
        const collection = collectionParam;
        debug(process.env.DB_CONN);
        debug(DB_URL);
        try{
            client = await MongoClient.connect(DB_URL);
            debug('Connected correctly to server');
            const db = client.db(DB_NAME);
            const response = await db.collection(collection).findOne(query);
            return response;
        }
        catch(err){
            debug(err.stack);
        }
        client.close();
    }


    // FUNCTION TO FETCH RECORDS OF A COLLECTION IN AN ARRAY
    async function getCollection(collectionParam ){
        let client;
        const collection = collectionParam || 'books';
        try{
            client  = await MongoClient.connect(DB_URL)
            debug('Connection established succesfully');
            const db = client.db(DB_NAME);
            const col = await db.collection(collection);
            const response = await col.find().toArray();
            return response;
        }
        catch(err){
            debug(err.stack)
        }
        client.close();
    }

    return {
        insertMany,
        getCollection,
        insertOne,
        findOne
    }
}

module.exports = mongoService;