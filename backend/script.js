import http from 'http';
import 'dotenv/config';
import {RegisterUser,LoginUser,LogoutUser} from './controllers/User.js';
import {BoardMiddleware,FrontendMiddleware} from './BoardMiddleware.js';
import {CreateTask, GetTasks, GetSingleTask, UpdateTasks, DeleteTask} from './controllers/Board.js';
import {FrontendUsers} from './controllers/Frontend.js';
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('MongoDB connected successfully');
        
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

const parseRequestBody = (req) => {
    return new Promise((resolve, reject) => {
        let content = '';
        req.on('data', (text) => {
            content += text.toString();
        });
        req.on('end', () => {
            try {
                const parsedContent = JSON.parse(content);
                resolve(parsedContent);
            } catch (error) {
                reject(error);
            }
        });
    });
};

const startServer = http.createServer(async (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // 
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true'); 
    if (req.method === 'POST' && req.url === '/api/register') {
        req.body = await parseRequestBody(req);
        await RegisterUser(req, res);
    }else if (req.method === 'OPTIONS') {
        res.writeHead(204); 
        res.end();
        return;
    }else if(req.method === 'POST' && req.url === '/api/login') {
        req.body = await parseRequestBody(req);
        await LoginUser(req, res);
    }else if(req.method === 'POST' && req.url === '/api/logout') {
        await LogoutUser(req, res);
    }else if(req.method === 'POST' && req.url === '/api/tasks') {
        req.body = await parseRequestBody(req);
        await BoardMiddleware(req,res,async()=>{
            await CreateTask(req, res);
        })
    }else if(req.method === 'DELETE' && req.url.startsWith('/api/deletetask/')) {
        
        const url_split = req.url.split('/')
        const taskid = url_split[url_split.length - 1]

        req.params = { id:taskid }

        await BoardMiddleware(req,res,async()=>{
            await DeleteTask(req, res);
    })}else if( req.method === 'GET' && req.url === '/'){
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Server is running');
    }else if(req.method === 'GET' && req.url === '/api/gettasks') {
        await BoardMiddleware(req,res,async()=>{
            await GetTasks(req, res);
        })
    }else if(req.method === 'GET' && req.url.startsWith('/api/gettask/')) {
        
        const url_split = req.url.split('/')
        const taskid = url_split[url_split.length - 1]

        req.params = { id:taskid }
        await BoardMiddleware(req,res,async()=>{
            await GetSingleTask(req, res);
        })
    }else if(req.method === 'PUT' && req.url.startsWith('/api/updatetask/')) {
        
        const url_split = req.url.split('/')
        const taskid = url_split[url_split.length - 1]

        req.params = { id:taskid }
        req.body = await parseRequestBody(req);
        await BoardMiddleware(req,res,async()=>{
            await UpdateTasks(req, res);
        })
    }else if(req.method === 'GET' && req.url === '/api/users'){

        await FrontendMiddleware(req,res,async()=>{
            await FrontendUsers(req, res);
        });
    }else{
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
});

startServer.listen(process.env.PORT || 6000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    connectDB();
});

export default startServer;