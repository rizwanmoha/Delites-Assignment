// const jwt=require("jsonwebtoken");

// const  generateToken = (user) =>
// {
//     return jwt.sign({ userId: user._id },process.env.ACCESS_TOKEN_SECRET,{ expiresIn: "15d"});
// }


// module.exports = {generateToken};

/**
 * The function generates a JWT token for a user with a specified expiration time.
 * @param {UserDocument} user - The `user` parameter is of type `UserDocument`, which is a document
 * representing a user in the database. It likely contains information such as the user's _id,
 * username, email, password, etc.
 * @returns The `generateToken` function is being exported, which takes a `UserDocument` object as a
 * parameter and returns a JSON Web Token (JWT) string generated using the `jsonwebtoken` library. The
 * JWT payload contains the `userId` extracted from the `user._id` field of the provided user object.
 * The token is signed using the `ACCESS_TOKEN_SECRET` environment variable or an empty string if
 */
import jwt from "jsonwebtoken";
import  userModel , { User }  from "../models/userModel";


const generateToken = (user: User): string => {
    
    return jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET || '', { expiresIn: "15d" });
};

export { generateToken };




