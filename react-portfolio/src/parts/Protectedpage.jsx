import { Link } from "react-router-dom"
import { useLogin } from "../auth/Context"

const Protectedpage = () => {
    const {user,loading} = useLogin()
  return (
    <div className = 'min-h-screen bg-gray-100 text-white'>
        <div className = 'flex h-screen'>
            <div className = 'flex flex-col relative z-10 bg-white text-black border-r border-gray-200'>
                <div className = 'p-6 border-b border-gray-300'>
                    <div className = 'flex items-center space-x-3'>
                        <div className = 'w-10 h-10 bg-gray-300 rounded-md overflow-hidden flex-shrink-0'>
                            <Link to ='/protected'><img src = '/logo2.jpg' alt = 'Logo' /></Link>
                        </div>
                        <div>
                            <h1 className = 'text-2xl font-bold'>Admin Dashboard</h1>
                            <p className="text-xs">Welcome {user.name}!</p>
                        </div>
                    </div>
                </div>  
                <nav className = 'flex-1 p-4 overflow-y-auto'>
                    <ul className = 'flex flex-col space-y-1 gap-5'>
                        <li>
                            <Link to = "/link1" className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium px-4 py-3 rounded-lg transition-colors text-4xl">TimeLine(Coming Soon)</Link>
                        </li>
                        <li>
                            <Link to = "/link1" className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium px-4 py-3 rounded-lg transition-colors text-4xl">Pending(Coming Soon)</Link>
                        </li>
                        <li>
                            <Link to = "/boarddesign" className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium px-4 py-3 rounded-lg transition-colors text-4xl">Board</Link>
                        </li>
                        <li>
                            <Link to = "/link1" className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium px-4 py-3 rounded-lg transition-colors text-4xl">Tasks(Coming Soon)</Link>
                        </li>
                        <li>
                            <Link to = "/addatask" className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium px-4 py-3 rounded-lg transition-colors text-4xl">Add a Task</Link>
                        </li>
                    </ul>
                </nav>
                <div className = 'p-4 border-t border-gray-300'>
                    <div className = 'flex-1 min-w-0'>
                        <div className = 'flex-1 min-w-0'>
                            <p className="text-sm text-gray-500">
                                {user.name}
                            </p>
                            <p className = "text-xs truncate">{user.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Protectedpage