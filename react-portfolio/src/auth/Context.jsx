import {useContext, createContext, useState} from 'react';
import {jwtDecode} from 'jwt-decode';

const LoginContext = createContext(null);

const LoginProvider = ({children})=>{
    const [user,setUser] = useState(() => {

    
        const token = localStorage.getItem('token');
        if(token){
            try{
                return jwtDecode(token)
            } catch (error) {
                console.error(error);
                localStorage.removeItem('token');
            }
        }
        return null;
    });

    const [loading, setLoading] = useState(false)

    const loginredirect = (token)=>{
        localStorage.setItem('token',token)
        const decoded = jwtDecode(token)
        setUser(decoded);
    };

    const logoutReset = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return(
        <LoginContext.Provider value={{user,loginredirect,logoutReset,loading}}>
            {children}
        </LoginContext.Provider>
    )
}

const useLogin = () => {
    return useContext(LoginContext);
}

export { useLogin,LoginProvider}