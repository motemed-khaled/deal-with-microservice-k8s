import mongoose from "mongoose";



export const dbConnection = () => {
    return mongoose.connect("mongodb://auth-mongo-srv:27017/auth").then(conn => {
        console.log(`database connected in : ${conn.connection.host}`)
    }).catch(err => {
        console.log(err)
    })
}