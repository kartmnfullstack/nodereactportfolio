import {useState} from 'react';
import { instance } from '../auth/Axios';
import { useNavigate } from 'react-router-dom';
const Register = () => {

    const [passwordSecret, setPasswordsecret] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
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

    const registerUser = async(name,email,password)=>{
        try{
            const { data } = await instance.post('/register',{
                name,
                email,
                password
            })
        }catch(error){
            console.log(error)
        }
    }


    const submitHandler = async (e) => {
        e.preventDefault();
        const validationErrors = {}

        const { name, email, password, confirmPassword } = formData;


        if(!name.trim()) {
            validationErrors.name = 'Enter a valid username';
        }
        if(!email.trim()) {
            validationErrors.email = 'Enter a valid email';
        }
        if(!password.trim()) {
            validationErrors.password = 'Enter a valid password';
        }
        if(password !== confirmPassword) {
            validationErrors.confirmPassword = 'Passwords do not match';
        }
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        try{
            await registerUser(name,email,password);
            console.log("User registered")
            navigate('/')
        }catch(error){
            console.log(error)
        }
        
    }

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-white text-black'>
        <div className='w-full max-w-xs flex flex-col gap-5'>
            <h1 className = 'text-4xl font-bold text-center mb-5'>Register</h1>
            <form onSubmit={submitHandler} className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="name" className='block text-2xl font-medium text-gray-700 mb-1'>Username</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className='border border-gray-300 rounded-md px-3 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder="Enter your name..." />
                    {errors.name && <p className='text-red-500 text-sm'>{errors.name}</p>}

                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="email" className='block text-2xl font-medium text-gray-700 mb-1'>Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className='border border-gray-300 rounded-md px-3 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder="Enter your email..." />
                    {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}
                </div>
                <div className='flex flex-col gap-1.5'> 
                        <label htmlFor="password" className='block text-2xl font-medium text-gray-700'>Password</label> 
                        <input type={passwordSecret ? "text" : "password"}  id="password" name="password" value={formData.password} onChange={handleChange} className='border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500' 
                            placeholder="Enter your password..."
                            /> 
                        {errors.password && <p className='text-red-500 text-sm'>{errors.password}</p>}
                        <div className='flex items-center gap-1.5 select-none mt-1 self-start'>
                            <input type="checkbox" id="showPassword" checked={passwordSecret} onChange={togglePasswordVisibility} name="showPassword" className='w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300' 
                                /> 
                            <label htmlFor="showPassword" className='text-sm font-medium text-gray-700 select-none'>Show Password</label> 
                        </div>
                </div> 
                
                <div className='flex flex-col gap-2'>
                    <label htmlFor="confirmPassword" className='block text-2xl font-medium text-gray-700 mb-1'>Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className='border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder="Confirm your password..."/>
                    {errors.confirmPassword && <p className='text-red-500 text-sm'>{errors.confirmPassword}</p>}
        
                </div>
                <div className='flex justify-center mt-5'>
                    <button className='bg-black text-white text-lg px-6 py-2 rounded-md hover:bg-green-600 cursor-pointer transition-colors w-30 h-15' >Register</button>
                </div>
            </form>
        </div>
        
    </div>
  )
}

export default Register