import { useEffect, useState } from 'react'
import { instance } from '../auth/Axios'
import { Link } from 'react-router-dom'

const Board = () => {
    const [col,setCol] = useState([])
    const [drag,setDrag] = useState(null)
    const columns = ['pending','in-progress','completed']

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
            
                }catch(error){
                    console.error("Error deleting task:", error.response?.data?.message || error.message);
                }
            }

        const handleDragAndDrop = (colId,task) => {
            setDrag({colId,task})
        } 

        const handleDrag = (e) => {
            e.preventDefault();
        }

        const handleDrop = (e,colID) => {
            e.preventDefault();

            if(!drag) return;

            const {colID: presentcolId, task} = drag

            if(presentcolId === colID) return;

            const updatedCol = {...col}

            updatedCol[presentcolId].tasks = updatedCol[presentcolId].tasks.filter((i) => i._id != task._id)

            updatedCol[colID].tasks.push(task)

            setCol(updatedCol)
            setDrag(null)
        }


  return (
    <div>
            <div className='flex flex-col gap-3 items-center justify-center mt-4 mb-3 text-blue '>
                <Link to='/addatask'><button className='px-5 py-3 border rounded-lg hover:bg-green-400 cursor-pointer transition-colors w-50 text-xl'>Add a Task</button></Link>
            </div>
            
            {/* <div>
                {col.tasks?.map((e,i)=>{
                    return(
                        <div key={i}>
                            <p>{e.name}</p>
                            <button onClick={()=> deleteTask(e._id)}>Delete</button>
                        </div>
                    )
                })}
            </div> */}
    </div>
  )
}

export default Board