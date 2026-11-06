
import './App.css'
import Footer from './parts/Footer'
import { Header } from './parts/Header'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Main from './parts/Main'
import Login from './parts/Login'
import Register from './parts/Register'
import Protectedpage from './parts/Protectedpage'
import { LoginProvider } from './auth/Context'
import User from './auth/LoggedIn'
import Guest from './auth/Guest'
import Logout from './parts/Logout'
import Tasks from './parts/Tasks'
import AddaTask from './parts/AddaTask'
import Board from './parts/Board'
import BoardDesign from './parts/BoardDesign'
import UpdateaTask from './parts/UpdateaTask'

function App() {
  

  return (
    <Router>
      <LoginProvider>
      <Header/>
        <Routes>
          <Route path = '/' element= {<Main/>}/>  
          <Route element = {<Guest/>}>
            <Route path = '/login' element = {<Login/>}/>
            <Route path = '/register' element = {<Register/>}/>
          </Route>
          <Route element = {<User/>}>
            <Route path = '/protected' element = {<Protectedpage/>}/>
            <Route path = '/logout' element = {<Logout/>}/>
            <Route path = '/boarddesign' element = {<BoardDesign/>}/>
            <Route path = '/updatetask/:id' element = {<UpdateaTask/>}/>
            {/* <Route path = '/tasks' element = {<Tasks/>}/> */}
            <Route path = '/addatask' element = {<AddaTask/>}/>
            <Route path = '/board' element = {<Board/>}/>
          </Route>
        </Routes>
      <Footer/>
      </LoginProvider>
    </Router>
  )
}

export default App
