import mongoose from "mongoose";

const conectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const url = `${db.connection.host}:${db.connection.port}/${db.connection.name}`;
        console.log(`Connected to ${url}`);
    } catch (error) {
        console.error(`Error to connect DB: ${error}`);
        process.exit(1);
    }
}

export default conectDB;