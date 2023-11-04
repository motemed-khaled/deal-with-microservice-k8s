import { dbConnection } from "./config/database-connection";
import { app } from "./app";


const start = async () => {
    //connect to database
    await dbConnection();

    // check env file

    if (!process.env.JWT_KEY) {
        throw new Error("jwt key must be defined");
    };

    app.listen(3000, () => {
        console.log("app listen in port 3000");
    });
};

start();