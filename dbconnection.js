const { MongoClient } = require('mongodb');

async function connectToMongoDB() {
  const uri = "mongodb://192.168.29.156:3001/thm"; // Replace with your server's IP and database name

  const client = new MongoClient(uri);
  // http://192.168.29.156:3002
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    // Access the database
    const database = client.db('thm');

    // Access the collection
    // const orgCollection = database.collection('Organization');
    // await orgCollection.drop(); //Drop the collection
    // const orgResult = await orgCollection.findOne({});
    // console.log(orgResult)

    // const siteCollection = database.collection('Sites');
    // await siteCollection.drop(); //Drop the collection
    // const siteResult = await siteCollection.findOne({});
    // console.log(siteResult);

    // const unitCollection = database.collection('Unit');
    // await unitCollection.drop(); //Drop the collection
    // const unitResult = await unitCollection.findOne({});
    // console.log(unitResult);

    // const userCollection = database.collection('Users');
    // await userCollection.drop(); //Drop the collection
    // const userResult = await userCollection.findOne({});
    // console.log(userResult);

    const sensorCollection = database.collection('Sensor');
    await sensorCollection.drop(); //Drop the collection
    const sensorResult = await sensorCollection.findOne({});
    console.log(sensorResult);

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    // await client.close(); //It is good practice to close the client when you are done.
  }
}

connectToMongoDB();