import { useEffect, useState } from 'react';
import { instance } from '../auth/Axios';
import { useNavigate } from 'react-router-dom';

const BoardDesign = () => {

  const [col,setCol] = useState([])
  const columns = ['pending','in-progress','completed']
  const navigate = useNavigate()

   useEffect(()=> {
            const getTasks = async () => {
        try{
            const res = await instance.get('/gettasks')
            const data = res.data
            setCol(data)
        }catch(error){
            console.log(error)
        }
        }

        getTasks();
        },[])
        console.log(col)

        const deleteTask = async (taskid) => {
                try{
                    const res = await instance.delete(`/deletetask/${taskid}`)
                    console.log(res.data.message)
                    navigate('/protected')
                }catch(error){
                    console.error("Error deleting task:", error.response?.data?.message || error.message);
                }
            }

  return (
    <div className='bg-gray-300 w-full h-screen flex gap-6 justify-center items-center  p-4 overflow-x-auto'>
            {columns.length > 0 ? (
                columns.map((name,id)=> {
                  
                const task = col.tasks?.filter(t=>t.status === name) || []
                
                return(

                  <div key={id} className="w-2/10 h-3/4 bg-white rounded-xl p-4 flex flex-col overflow-y-auto">
                    <h1 className='text-2xl text-center mb-4 font-bold'>{name}</h1>
                    {task.map((e,i)=>(
                      <div key={i} className='w-full mx-auto mt-2 p-3 rounded-lg flex flex-col justify-center items-center text-black bg-blue-300 shrink-0'>
                      <div className='mb-2 flex flex-col mt-3 justify-center items-center w-full text-center'>
                        <h2 className='text-2xl font-semibold'>{e.name}</h2>
                        <hr className='w-3/4 mx-auto border-pink-500 my-2' />
                        <p>Task: {e.task}</p>
                        <h5>Comments: {e.comments}</h5>
                        <h6>Created by: {e.userId?.name}</h6>
                        <h6>Assigned to: {e.email}</h6>
                        <div className='flex gap-3 mt-2'>
                          <button onClick={() => navigate(`/updatetask/${e._id}`)} className="bg-white px-2 py-1 rounded text-sm font-medium hover:bg-gray-100 cursor-pointer">Update</button>
                          <button onClick={() => deleteTask(e._id)} className="bg-red-500 text-white px-2 py-1 rounded text-sm font-medium hover:bg-red-600 cursor-pointer">Delete</button>
                        </div>
                      </div>
                    </div>
                    ))}
                  </div>
                )

               }) 
               
              ) : (
              
                          <div className="w-2/10 h-3/4 bg-white rounded-xl p-4 overflow-y-auto">
                        {col.tasks?.map((e, i) => (
                          <div key={i} className='w-full mx-auto mt-2 p-3 rounded-lg flex flex-col justify-center items-center text-black bg-blue-300'>
                            <div className='mb-2 flex flex-col mt-3 justify-center items-center'>
                              <h2 className='text-2xl'>{e.name}</h2>
                              <hr className='w-3/4 mx-auto border-pink-500 my-2' />
                              <p>Task: {e.task}</p>
                              <h5>Comments: {e.comments}</h5>
                              <h6>Created by: {e.userId?.name}</h6>
                              <h6>Assigned to: {e.email}</h6>
                              <div className='flex gap-3 mt-2'>
                                <button>Update</button>
                                <button onClick={() => deleteTask(e._id)}>Delete</button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
    )}
  </div>
);
}

export default BoardDesign