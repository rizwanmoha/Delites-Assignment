// const mongoose=require("mongoose");

// async function connectDB()
// {
//     try
//     {
       
//         await mongoose.connect(process.env.MONGO_URL);

//         console.log('MongoDB connection established');
//     }
//     catch(err)
//     {
//         console.error("Error connecting to MongoDB",err);
//     }
// }

// module.exports=connectDB;

// import mongoose from "mongoose";

// async function connectDB(): Promise<void> {
//     try {
//         await mongoose.connect(process.env.MONGO_URL );
//         console.log('MongoDB connection established');
//     } catch (err) {
//         console.error("Error connecting to MongoDB", err);
//     }
// }

// export default connectDB;


import mongoose from "mongoose";

async function connectDB(): Promise<void> {
    try {
        const mongoURL: string | undefined = process.env.MONGO_URL;
        if (!mongoURL) {
            throw new Error("MongoDB URL is not defined in the environment variables.");
        }
        await mongoose.connect(mongoURL);
        console.log('MongoDB connection established');
    } catch (err) {
        console.error("Error connecting to MongoDB", err);
    }
}

export default connectDB;
