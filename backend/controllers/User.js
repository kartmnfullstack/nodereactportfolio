import { StatusCodes } from "http-status-codes";
import bcrypt from 'bcryptjs';
import UsersList from "../models/User.js";
import jwt from 'jsonwebtoken';

const RegisterUser = async (req,res)=>{
    try{
    const { name,email,password } = req.body;

    const userexists = await UsersList.findOne({ email });

    if(userexists){
        res.writeHead(StatusCodes.BAD_REQUEST, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User already exists' }));
        return;
    }

    const hashedpassword = await bcrypt.hash(password,10);

    const createusers = await UsersList.create({
        name,
        email,
        password: hashedpassword
        
    })

    if(createusers){
        res.writeHead(StatusCodes.CREATED, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User created successfully' }));
    }else{
        res.writeHead(StatusCodes.BAD_REQUEST, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Failed to create user' }));
    }


    } catch (error) {
        res.writeHead(StatusCodes.BAD_REQUEST, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error.message }));
}

}

const LoginUser = async(req,res)=>{
    const {email,password} = req.body;

    const findemail = await UsersList.findOne({email:email});

    if(!findemail){
        res.writeHead(StatusCodes.BAD_REQUEST, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User doesn\'t exist' }));
        return;
        
    }

    const passwordcompare = await bcrypt.compare(password,findemail.password)

    if(!passwordcompare){
         res.writeHead(StatusCodes.BAD_REQUEST, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Password is incorrect.' }));
        return;
    }

    const token = jwt.sign({id: findemail._id,name: findemail.name,email:findemail.email}, process.env.S_K,{ expiresIn: '1h' });

   
    if(token){
        res.writeHead(StatusCodes.CREATED, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User logged in successfully.' ,token: token}));
    }else{
        res.writeHead(StatusCodes.BAD_REQUEST, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User login failed.' }));
    }
    
}

const LogoutUser = async(req,res)=>{
    res.writeHead(StatusCodes.CREATED, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User logged out successfully.' }));
}

export {RegisterUser,LoginUser,LogoutUser}