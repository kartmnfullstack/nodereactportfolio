import {useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../auth/Context';


const Logout = () => {

  const { logoutReset } = useLogin();
  const navigate = useNavigate();

useEffect(()=>{
  const handleLogout = async () => {
  try {
    // 1. Tell the backend the user is logging out
    await axios.get('/logout'); 
  } catch (error) {
    console.error("Backend logout failed, proceeding with client cleanup", error);
  } finally {
    // 2. Clear frontend token regardless of API success/failure

    logoutReset();
    
    // 3. Redirect to login page
    navigate('/login',{ replace:true }) 
  }
};
handleLogout();
},[])



  return (
    <></>
  )
}

export default Logout