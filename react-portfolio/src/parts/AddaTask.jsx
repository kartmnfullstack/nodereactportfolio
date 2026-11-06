import {useState,useEffect} from 'react'
import { instance } from '../auth/Axios'
import { useNavigate } from 'react-router-dom';

const AddaTask = () => {
    const [usersList,setUsersList] = useState([])
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        task: '',
        comments: '',
        status:'pending',
        email:''
    });
    const navigate = useNavigate()
    useEffect(()=>{
        const usersList = async () =>{
            try{
                const res = await instance.get('/users')
                const data = res.data
                setUsersList(data)

                if(data && data.length > 0){
                    setFormData(prev=>({
                        ...prev,
                        user: data[0]
                    }))
                }
            }catch(error){
                console.log(error)
            }
        }

        usersList()
    },[])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const addTask = async(name,description,task,comments,status,email)=>{
        try{
            const { data } = await instance.post('/tasks',{
                name,
                description,
                task,
                comments,
                status,
                email
            })
        }catch(error){
            console.log(error)
        }
    }
    console.log(usersList)

    const submitForm = async (e) => {
        const formfielderrors = {}
        e.preventDefault();

        const { name,description,task,comments,status,email } = formData;

        if(!name.trim()) {
            formfielderrors.name = 'Enter a valid task name.';
        }
        if(!description.trim()) {
            formfielderrors.description = 'This cannot be blank.';
        }
        if(!task.trim()) {
            formfielderrors.task = 'Task field cannot be blank.';
        }
        if(!comments.trim()) {
            formfielderrors.comments = 'Comments field cannot be blank.';
        }
        if(!email.trim()) {
            formfielderrors.email = 'Enter a valid task name.';
        }
        setErrors(formfielderrors);

        if (Object.keys(formfielderrors).length > 0) return;

        try{
            await addTask(name,description,task,comments,status,email);
            console.log("task registered")
            navigate('/protected')
        }catch(error){
            console.log(error)
        }
        

    }
  return (
    <div className='max-w-4xl mx-auto p-5 border border-gray-300 rounded-lg shadow-sm bg-gray-100 mt-4 mb-4'>
        <img src='/logo.jpg' className ='h-30 w-full object-contain block p-2' alt='logo'/>
        <hr className='w-1/2 mx-auto border-pink-500'></hr>
        <h3 className='text-center text-4xl mt-4 mb-3'>Add a Task</h3>
        <form onSubmit={submitForm}>
            <div className='flex flex-col gap-3 items-center justify-center'>
                <label htmlFor='name' className='mt-2 mb-1 text-black-500'>Name of the task</label>
                <input type="text" name="name" id="name" className='border border-gray-300 p-2 rounded-md w-100 placeholder:text-center' placeholder='Enter the name of the task...' value={formData.name} onChange={handleChange} />
                {errors.name && <p className='text-red-500 text-sm'>{errors.name}</p>}
            </div>
            <div className='flex flex-col gap-3 items-center justify-center'>
                <label htmlFor='description' className='mt-2 mb-1 text-black-500'>Description of the task</label>
                <textarea rows="4" className="rounded-md border border-gray-300 p-2 rounded-md w-100 placeholder:text-center'" placeholder="Enter your multi-line task description here..." name='description' id='description' value={formData.description} onChange={handleChange}></textarea>
                {errors.description && <p className='text-red-500 text-sm'>{errors.description}</p>}
            </div>
            <div className='flex flex-col gap-3 items-center justify-center'>
                <label htmlFor='task' className='mt-2 mb-1 text-black-500'>Task</label>
                <input type="text" name="task" id="task" className='border border-gray-300 p-2 rounded-md w-100 h-12 placeholder:text-center' placeholder='Enter the the task...' value={formData.task} onChange={handleChange}/>
                {errors.task && <p className='text-red-500 text-sm'>{errors.task}</p>}
            </div>
            <div className='flex flex-col gap-3 items-center justify-center'>
                <label htmlFor='comments' className='mt-2 mb-1 text-black-500'>Comments</label>
                <textarea rows="4" className="rounded-md border border-gray-300 p-2 rounded-md w-100 placeholder:text-center'" placeholder="Enter your comments here..." name='comments' id='comments' value={formData.comments} onChange={handleChange}></textarea>
                {errors.comments && <p className='text-red-500 text-sm'>{errors.comments}</p>}
            </div>
            <div className='flex flex-col gap-3 items-center justify-center'>
                <label htmlFor='status' className='mt-2 mb-1 text-black-500'>Status</label>
                <select name="status" id="status" className='rounded-md border border-gray-300 p-2 rounded-md w-100' value={formData.status} onChange={handleChange}>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In-progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            <div className='flex flex-col gap-3 items-center justify-center'>
                <label htmlFor='email' className='mt-2 mb-1 text-black-500'>Assign Task</label>
                <select name="email" id="email" className='rounded-md border border-gray-300 p-2 rounded-md w-100' value={formData.email} onChange={handleChange}>
                    <option value="">-- Choose a Team Member --</option>
                    {Array.isArray(usersList) && usersList.map((a,index)=>(
                        <option key={index} value={a.email} className='rounded-md border border-gray-300 p-2 rounded-md w-100'>{a.email}</option>
                    ))}
                </select>
            </div>
            <div className='flex flex-col gap-3 items-center justify-center mt-4 mb-3 text-blue '>
                <button className='px-5 py-3 border rounded-lg hover:bg-green-400 cursor-pointer transition-colors w-50 text-xl'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddaTask