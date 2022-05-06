import React, { useEffect, useState } from 'react';
import Button from '../Button';

import '../../css/login.css';
import '../../css/common.css';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [phoneNo,setPhoneNo]=useState("")
  const [password,setPassword]=useState("")
  const token = "token:qwhu67fv56frt5drfx45e"

  // useEffect(()=>{
  //   if (localStorage.getItem('user-info')){
  //     navigate('/user');
  //   }
  // },{})


  function submitFunc(){
    navigate('/user');
    // let data={password,phoneNo}

    // let result = await fetch(`http://127.0.0.1:5000/${token}/admins/login`
    // // ,{
    // //   method:"GET",
    // //   headers: {
    // //     "Content-Type": "application/json",
    // //     "Accept" : "application/json"
    // //   },
    // //   // body: JSON.stringify(data)
    // // }
    // )

    // result = await result.json();
    // // localStorage.setItem(JSON.stringify(result))
    // console.log(result)
  }

  const navigate = useNavigate();
  return (
    <div className="container h-100">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-10 col-md-8 col-lg-6 loginContainer">
          <form
            className="form loginForm "
            id="login-form"
            onSubmit={(event) => {
              event.preventDefault();
              submitFunc()
            }}
            action=""
            method=""
          >
            <h1 className="text-center">Login</h1>

            <div className="form-group">
              <label for="phoneNo">Username:</label>
              <input
                type="text"
                className="form-control username"
                id="phoneNo"
                placeholder="Phone Number"
                name="phoneNo"
                onChange={(e)=>setPhoneNo(e.target.value)}
              />
              <div id="usernameError"></div>
            </div>

            <div className="form-group">
              <label for="password">Password:</label>
              <input
                type="password"
                className="form-control password"
                id="password"
                placeholder="Password"
                name="password"
                onChange={(e)=>setPassword(e.target.value)}
              />
              <div id="passwordError"></div>
            </div>
            <div
              id="forgotPassword"
              className="form-group d-flex justify-content-end mt-md-5"
            >
              <span className="">forgot password?</span>
            </div>
            <Button
              type="submit"
              color=""
              bgColor="var(--primary-color)"
              name="Login"
              id="loginBtn"
              className="btn btn-customized text-center px-5"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
