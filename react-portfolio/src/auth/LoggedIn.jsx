import {Navigate,Outlet} from "react-router-dom";
import {useLogin} from "./Context";

const User = () => {
    const {user,loading} = useLogin();

     if (loading){
        return <div>Loading...</div>
    }


  return user?<Outlet/>:<Navigate to='/login' replace />
}

export default User;