import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Login = (props) => {

  const [credentials, setCredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = fetch("http://localhost:5100/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    // const json = await response.json();
    // console.log(json)
    var json = await response
    json = await json.json();
    console.log(json)

    setCredentials({email:"",password:""})

    if(json.success){
      //redirect
      localStorage.setItem('token',json.authtoken)
      console.log(localStorage.getItem("token"))
      props.showAlert("Logged in Successfully","success");
      navigate("/");
    }
    else{
      props.showAlert(`Invalid Credentials ${json.error}`,"danger");
    }
  }


  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className='mt-3'>
      <h2>Login to continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" value={credentials.email} name="email" onChange={onchange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onchange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Login
