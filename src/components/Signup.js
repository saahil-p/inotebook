import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({name: "",email:"",password:"",uconfirmpassword:""})
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name,email,password} = credentials;
    const response = fetch("http://localhost:5100/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email,name,password})
    });
    var json = await response
    json = await json.json();
    console.log(json)

    // setCredentials({ email: "", password: "" })

    if (json.success) {
      //redirect
      localStorage.setItem('token', json.authtoken)
      navigate("/");
      props.showAlert("Account created successfully","success")
    }
    else {
      props.showAlert(`Invalid credentials: ${json.error}`,"danger")
    }
  }


  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  } 


  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name = "name" aria-describedby="emailHelp" onChange={onchange}  required />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" name = "email" aria-describedby="emailHelp" onChange={onchange} required minLength={3} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name = "password" onChange={onchange} />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="confirmpassword" name = "uconfirmpassword" onChange={onchange} required minLength={5} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
