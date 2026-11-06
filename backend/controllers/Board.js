import TaskList from "../models/Board.js";
const CreateTask = async(req,res)=>{
    try{
        const { name, description, task, comments, status,email } = req.body;

        const userId = req.user.id; 

        const createTask = await TaskList.create({
            name,
            description,
            task,
            comments,
            status,
            userId,
            email
        });

        if (createTask) {
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Task created successfully' }));
        }
    }catch(error){
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error.message }));
    }
}


const GetTasks = async(req,res)=>{
    const tasks = await TaskList.find().populate('userId')
    try{
    if(tasks){
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Task return successfully',tasks:tasks}));
    }}catch(error){
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error.message }));
    }
}

const GetSingleTask = async(req,res)=>{
    const id = req.params.id
    const task = await TaskList.findById(id);
    try{
        

        if (task){
            res.writeHead(201,{ 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Task returned successfully', task: task }))
        }
    }catch(error){
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error.message }));
    }
}

const UpdateTasks = async(req,res)=>{
    const id = req.params.id;
    const { name, description, task, comments, status,email } = req.body;

    try{
        const update = await TaskList.findByIdAndUpdate(
            id,
            {name,description,task,comments,status,email},
            {new: true}
        )

        if ( update ) {
         res.writeHead(201, { 'Content-Type': 'application/json' });
         res.end(JSON.stringify({ message: 'Task updated successfully'}));
        }
       
    }catch(error){
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error.message }));
    }
}


const DeleteTask = async(req,res)=>{
    const id = req.params.id

    const b = await TaskList.findByIdAndDelete(id)
    try{
    if(b){
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Task return successfully'}));
    }else{
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message:"Task doesn't exist"}))
    }

    }catch(error){
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error.message }));
    }
}
export { CreateTask, GetTasks, UpdateTasks, GetSingleTask, DeleteTask};
