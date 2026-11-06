import {useState,useEffect} from 'react'
import { instance } from '../auth/Axios'
const Tasks = () => {
    // const [task,setTask] = useState({})
    // const [users,setUser] = useState({})

    // useEffect(()=>{
    //     const tasksList = async () => {
    //         try{
    //             const res = await instance.get('/tasks')
    //             const data = res.data
    //             setTask(data)
    //         }catch(error){
    //             console.log(error)
    //         }
    //     }

    //     const usersList = async () =>{
    //         try{
    //             const res = await instance.get('/users')
    //             const data = res.data
    //             setUser(data)
    //         }catch(error){
    //             console.log(error)
    //         }
    //     }
    //     tasksList()
    //     usersList()
    // },[])

  return (
    //name,description,task,comments,status,userId

    <div>
        Hello
    </div>
  )
}

export default Tasks