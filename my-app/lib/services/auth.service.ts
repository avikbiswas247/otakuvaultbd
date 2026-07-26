import { hashPassword } from "../utils/password";
import {  FrontendRegisterUserInput, RegisterUserInput } from "../../types/user";
import {RegisterUser} from "../repositories/user.repository";

export async function registerUser(userInput:FrontendRegisterUserInput): Promise<RegisterUserInput> {
    console.log("registerUser called");
    const {username,email,password} = userInput;    
    console.log("Before hash");
    const password_hash = await hashPassword(password);
    console.log("After hash");
    const newUser = await RegisterUser({username,email,password_hash} );
    console.log("After DB");
    console.log(newUser)

    return {
        username:newUser.username,
        email:newUser.email,
        password_hash:newUser.password_hash



    };
}
