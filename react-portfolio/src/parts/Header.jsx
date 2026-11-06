import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../auth/Context';
export const Header = () => {

    const {user} = useLogin();

    const[toggle,setToggle] = useState(false)

    const toggleFunc = () => {
        setToggle(!toggle)
    }
  return (
    <div>
        <nav className='bg-black text-white'>
            {user?(
            <div className='container max-w-7xl mx-auto px-6 lg:px-8'> 
                <div className='flex items-center justify-between h-16 gap-4'>
                    <div className='flex items-center h-full shrink-0 max-w-[150px]'>
                        <Link to='/' className='flex items-center h-full'><img src='/logo2.jpg' alt='logo' className='h-14 w-full object-contain block'/></Link>
                    </div>
                    <div className='hidden lg:flex flex-1 justify-center'>  
                        <ul className='flex gap-8'>
                            <li className='text-2xl hover: cursor-pointer hover:text-green-500'><Link to='/'>Home</Link></li>
                            <li className='text-2xl hover: cursor-pointer hover:text-green-500'><Link to='/link2'>About</Link></li>
                            <li className='text-2xl hover: cursor-pointer hover:text-green-500'><Link to='/link3'>Contact</Link></li>
                            <li className='text-2xl hover: cursor-pointer hover:text-green-500'><Link to='/link4'>Updates</Link></li>
                            <li className='text-2xl hover: cursor-pointer hover:text-green-500'><Link to='/protected'>Profile</Link></li>
                        </ul>
                    </div>
                    <div className='hidden lg:block'>
                        <Link to = '/logout' className='px-5 py-3 border rounded-lg hover:bg-green-500 transition-colors'>Logout</Link>
                    </div>
                </div>
            </div>
                ):(
                        <div className='container max-w-7xl mx-auto px-6 lg:px-8'> 
                        <div className='flex items-center justify-between h-16 gap-4'>
                            <div className='flex items-center h-full shrink-0 max-w-[150px]'>
                                <Link to='/' className='flex items-center h-full'><img src='/logo2.jpg' alt='logo' className='h-14 w-full object-contain block'/></Link>
                            </div>
                            <div className='hidden lg:flex flex-1 justify-center'>  
                                <ul className='flex gap-8'>
                                    <li className='text-2xl hover: cursor-pointer hover:text-green-500'><Link to='/'>Home</Link></li>
                                    <li className='text-2xl hover: cursor-pointer hover:text-green-500'><Link to='/link2'>About</Link></li>
                                    <li className='text-2xl hover: cursor-pointer hover:text-green-500'><Link to='/link3'>Contact</Link></li>
                                    <li className='text-2xl hover: cursor-pointer hover:text-green-500'><Link to='/link4'>Updates</Link></li>
                                    <li className='text-2xl hover: cursor-pointer hover:text-green-500'><Link to='/tasks'>Tasks</Link></li>
                                </ul>
                            </div>
                            <div className='hidden lg:block'>
                                <Link to = '/login' className='px-5 py-3 border rounded-lg hover:bg-green-500 transition-colors'>Login</Link>
                            </div>
                            <div className='hidden lg:block'>
                                <Link to = '/register' className='px-5 py-3 border rounded-lg hover:bg-green-500 transition-colors'>Register</Link>
                            </div>                   
                            <div className='lg:hidden flex items-center'>
                                <button onClick={toggleFunc} className='flex flex-col gap-1 justify-center items-center w-8 h-8 relative'>{ toggle ? 
                                ( <div className='relative w-6 h-6 flex items-center justify-center'>
                                    <span className='absolute w-6 h-0.5 bg-white rounded-full rotate-45'></span>
                                    <span className='absolute w-6 h-0.5 bg-white rounded-full -rotate-45'></span>
                                </div> )
                                : (
                                <>
                                    <span className='w-6 h-0.5 bg-white rounded-full'></span>
                                    <span className='w-6 h-0.5 bg-white rounded-full'></span> 
                                    <span className='w-6 h-0.5 bg-white rounded-full'></span>
                                </>

                                )}</button>
                            </div>
                        </div>
                        {toggle && (
                            <div className='lg:hidden w-full pb-8 bg-black text-white flex flex-col justify-center items-center gap-6'>
                                <ul className='flex flex-col items-center w-full gap-4'>
                                    <li className='text-2xl py-2 hover: cursor-pointer'>Link 1</li>
                                    <li className='text-2xl py-2 hover: cursor-pointer'>Link 2</li>
                                    <li className='text-2xl py-2 hover: cursor-pointer'>Link 3</li>
                                    <li className='text-2xl py-2 hover: cursor-pointer'>Link 4</li>
                                </ul>
                                
                                <a href="#" className='px-5 py-3 border rounded-lg hover:bg-green-700 transition-colors'>CTA 1</a>
                                <a href="#" className='px-5 py-3 border rounded-lg hover:bg-green-700 transition-colors'>CTA 2</a>                   
                            </div>
                        )}
                    </div>
                )}
                </nav>
            </div>
        )
        }
