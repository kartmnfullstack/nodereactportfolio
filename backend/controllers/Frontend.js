import UsersList from "../models/User.js";

const FrontendUsers = async(req,res)=>{
    try{
        const users = await UsersList.find();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users.map(user => ({
            name: user.name,
            email: user.email,

        }))));
    }catch(error){
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error.message }));
    }   
}

export { FrontendUsers };