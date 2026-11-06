import {Navigate,Outlet} from "react-router-dom";
import {useLogin} from "./Context";

const Guest = () => {
    const {user,loading} = useLogin();

    if(loading){
        return <div>
            Loading...
        </div>
        
    }

    return user ? <Navigate to="/protected" /> : <Outlet />;
}

export default Guest;