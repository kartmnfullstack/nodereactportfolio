import jwt from "jsonwebtoken";

const BoardMiddleware = async(req,res,next)=>{
    let token = '';

     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    } else {
        const raw_cookies = req.headers.cookie || '';
        const match = raw_cookies.match(/(?:^|; )token=([^;]*)/);
        const token = match ? match[1] : '';

    }

    if(!token){
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Unauthorized' }));
        return;
    }

    try{
        const decode = jwt.verify(token,process.env.S_K);

        req.user = decode

        next();
    }catch{
        res.writeHead(302, {'Location': '/login'});
        return res.end();
    }

}

const FrontendMiddleware = async(req,res,next)=>{

    let token = '';

     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    } else {
        const raw_cookies = req.headers.cookie || '';
        const match = raw_cookies.match(/(?:^|; )token=([^;]*)/);
        const token = match ? match[1] : null;
    }

    if(!token){
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Unauthorized' }));
        return;
    }

    try{
        const decode = jwt.verify(token,process.env.S_K);
        req.user = decode;
        next();
    }catch{
         res.writeHead(401, { 'Content-Type': 'application/json' });
         return res.end(JSON.stringify({ message: 'Session expired, please login again.' }));
    }
}

export { BoardMiddleware, FrontendMiddleware };
