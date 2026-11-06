import {useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import { instance } from '../auth/Axios'
import { useNavigate } from 'react-router-dom';

const UpdateaTask = () => {

    const { id } = useParams();
    const [col,setCol] = useState([])    
    const [loading, setLoading] = useState(true);
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
        let isMounted = true; 
        const fetchData = async()=>{
            try{
                const apicall = await instance.get(`/gettask/${id}`)
                const resdata = apicall.data
                console.log(resdata)
                const res = resdata?.task
                
                if (isMounted && res) {
                    setCol(res)
                    setFormData({
                                name: res.name || '',
                                description: res.description ||  '',
                                task: res.task || '',
                                comments: res.comments || '',
                                status: res.status || 'pending',
                                email:res.email || ''
                    })
            setLoading(false)
        }
            }catch(error){
                console.log(error)
                if (isMounted) setLoading(false);
            }

        }

        fetchData();

            return () => {
                isMounted = false;
            };
    },[id])
     const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    const updateTask = async(id,name,description,task,comments,status,email)=>{
            try{
                const { data } = await instance.put(`/updatetask/${id}`,{
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

    const formSubmit = async(e) => {
        e.preventDefault();

        try{
            const { name,description,task,comments,status,email } = formData;

            await updateTask(id,name,description,task,comments,status,email);

            console.log("Update done")
            navigate('/protected')
        }catch(error){
            console.log(error)
        }
    }


  return (

        <div className='max-w-4xl mx-auto p-5 border border-gray-300 rounded-lg shadow-sm bg-gray-100 mt-4 mb-4'>
        <img src='/logo.jpg' className ='h-30 w-full object-contain block p-2' alt='logo'/>
        <hr className='w-1/2 mx-auto border-pink-500'></hr>
        <h3 className='text-center text-4xl mt-4 mb-3'>Update Task</h3>
        <form onSubmit={formSubmit}>
            <div className='flex flex-col gap-3 items-center justify-center'>
                <label htmlFor='name' className='mt-2 mb-1 text-black-500'>Name of the task</label>
                <input type="text" name="name" id="name" className='border border-gray-300 p-2 rounded-md w-100 placeholder:text-center' placeholder='Enter the name of the task...' value={formData.name} onChange={handleChange} />
                
            </div>
            <div className='flex flex-col gap-3 items-center justify-center'>
                <label htmlFor='description' className='mt-2 mb-1 text-black-500'>Description of the task</label>
                <textarea rows="4" className="rounded-md border border-gray-300 p-2 rounded-md w-100 placeholder:text-center'" placeholder="Enter your multi-line task description here..." name='description' id='description' value={formData.description} onChange={handleChange}></textarea>
            </div>
            <div className='flex flex-col gap-3 items-center justify-center'>
                <label htmlFor='task' className='mt-2 mb-1 text-black-500'>Task</label>
                <input type="text" name="task" id="task" className='border border-gray-300 p-2 rounded-md w-100 h-12 placeholder:text-center' placeholder='Enter the the task...' value={formData.task} onChange={handleChange}/>
            </div>
            <div className='flex flex-col gap-3 items-center justify-center'>
                <label htmlFor='comments' className='mt-2 mb-1 text-black-500'>Comments</label>
                <textarea rows="4" className="rounded-md border border-gray-300 p-2 rounded-md w-100 placeholder:text-center'" placeholder="Enter your comments here..." name='comments' id='comments' value={formData.comments} onChange={handleChange}></textarea>
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
                    
                        <option value={formData.email} className='rounded-md border border-gray-300 p-2 rounded-md w-100'>{formData.email}</option>
                   
                </select>
            </div>
            <div className='flex flex-col gap-3 items-center justify-center mt-4 mb-3 text-blue '>
                <button className='px-5 py-3 border rounded-lg hover:bg-green-400 cursor-pointer transition-colors w-50 text-xl'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default UpdateaTask