import pkg from 'mongoose';
const { connect, connection,disconnect } = pkg;
const uri = "mongodb+srv://chrisleearaujo:l5XmLMJIFvX8RbsQ@cluster0.zsno3yi.mongodb.net/DataBase?retryWrites=true&w=majority&appName=Cluster0";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await connect(uri, clientOptions);
    await connection.db.admin().command({ ping: 1 });
    console.log("Conectado ao MongoDB");
  } catch (error) {
    console.log("Error:", error);
  }
}
run().catch((error) => console.log(error));
