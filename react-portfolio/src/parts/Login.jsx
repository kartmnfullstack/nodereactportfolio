import {useState} from 'react';
import { instance } from '../auth/Axios';
import { useLogin } from '../auth/Context';
import { useNavigate } from 'react-router-dom';

const Login = () => {
        const [passwordSecret, setPasswordsecret] = useState(false);
        const [errors, setErrors] = useState({});
        const [formData, setFormData] = useState({
            email: '',
            password: '',
        });
        const { loginredirect } = useLogin();
        const navigate = useNavigate();
    
        const togglePasswordVisibility = () => {
            setPasswordsecret(!passwordSecret);
        };
    
        const handleChange = (e) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        }
        
        const loginUser = async(email,password)=>{
            try{
                const d = await instance.post('/login',{email,password});
                console.log(d)
                return d.data
            }catch(error){
                console.log(error)
            }
        }
    
        const submitHandler = async(e) => {
            e.preventDefault();
            const validationErrors = {}

            const { email, password } = formData;

    
            if(!email.trim()) {
                validationErrors.email = 'Enter a valid email';
            }

            if(!password.trim()) {
                validationErrors.password = 'Enter a valid password';
                }
            setErrors(validationErrors);
            
            if(Object.keys(validationErrors).length > 0) return ;

            try{
                const c = await loginUser(email,password)
                loginredirect(c.token)

                alert("Logged In")
                navigate("/protected",{replace: true})
            }catch(error){
                console.error("Login failed:", error.response?.data?.message || error.message); 
                alert(error.response?.data?.message || "Invalid Credentials");
            }
        }
        
    

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-white text-black p-4'>
         <div className='w-full max-w-xs flex flex-col gap-5'>
            <h1 className = 'text-4xl font-bold text-center mb-5'>Login</h1>
            <form onSubmit={submitHandler} className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="email" className='block text-2xl font-medium text-gray-700 mb-1'>Email</label>
                    <input type="text" id="email"  name="email" value={formData.email} onChange={handleChange} className='border border-gray-300 rounded-md px-3 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder="Enter your email..." />
                    {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}

                </div>
                <div className='flex flex-col gap-1.5'> 
                    <label htmlFor="password" className='block text-2xl font-medium text-gray-700'>Password</label> 
            
                        <input type={passwordSecret ? "text" : "password"} id="password" name="password" value={formData.password} onChange={handleChange} className='border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500' 
                        placeholder="Enter your password..."
                        /> 
                        
                        <div className='flex items-center gap-1.5 select-none mt-1 self-start'>
                        <input type="checkbox" id="showPassword" name="showPassword" checked={passwordSecret} onChange={togglePasswordVisibility} className='w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300' 
                        /> 
                        <label htmlFor="showPassword" className='text-sm font-medium text-gray-700 select-none'>Show Password</label> 
                        </div>
                </div> 
                <div className='flex justify-center mt-3'>
                    <button className='bg-black text-white text-lg px-6 py-2 rounded-md hover:bg-green-600 cursor-pointer transition-colors w-30 h-15'>Login</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login