import { dbConnection } from "./config/database-connection";
import { app } from "./app";


const start = async () => {
    console.log("start up...");
    
    //connect to database
    await dbConnection();

    // check env file

    if (!process.env.JWT_KEY) {
        throw new Error("jwt key must be defined");
    };
    if (!process.env.MONGO_URI) {
        throw new Error("mongo uri must be defined");
    };

    app.listen(3000, () => {
        console.log("app listen in port 3000");
    });
};

start();