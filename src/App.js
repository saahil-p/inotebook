import React, {  useState } from 'react'
import "./App.css"
import Navbar from './components/Navbar'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import About from './components/About'
import NoteState from './context/notes/noteState'
import Login from './components/Login'
import Signup from './components/Signup'
import Alert from './components/Alert'


const App = () => {
  const [alert,setAlert] = useState(null);
  // const message = "Hi";
  // const type = "success"
  const showAlert = (message,type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null)
    },1000)
  }
  return (
    <div className='App'>
      <Navbar/>
      <NoteState>
      <Alert text = {alert}/>
      <Routes>
        <Route exact path = "/" element = {<Home showAlert = {showAlert} />}></Route>
        <Route exact path='/about' element = {<About/>}></Route>
        <Route exact path ='/login' element = {<Login showAlert = {showAlert} />}></Route>
        <Route exact path ='/signup' element = {<Signup showAlert = {showAlert} />}></Route>
      </Routes>
      </NoteState>
    </div>
  )
}

export default App
