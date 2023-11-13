import mongoose from "mongoose";
import { DatabaseConnectionError } from "@mkproject/common";


export const dbConnection = () => {
    return mongoose.connect(process.env.MONGO_URI!).then(conn => {
        console.log(`database connected in : ${conn.connection.host}`)
    }).catch(err => {
        console.log(true)
        throw new DatabaseConnectionError();
    })
}