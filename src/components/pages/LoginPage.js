import React, { useEffect, useState } from 'react';
import Button from '../Button';
import * as ReactDOM from 'react-dom/client';

import '../../css/login.css';
import '../../css/common.css';
import { useNavigate } from 'react-router-dom';
import ErrorDisplay from '../ErrorDisplay';
import { Hash } from '../functions/Hash';

export default function LoginPage() {
  const [phoneNo, setPhoneNo] = useState('');
  const [password, setPassword] = useState('');

  const token = 'token:qwhu67fv56frt5drfx45e';
  const baseURL=`http://127.0.0.1:5000/${token}/admins/login`;


  function checkApiResponse(apiResponse) {

    const root = ReactDOM.createRoot(document.getElementById('errorDisplay'));

    switch (apiResponse.status) {
      case 200:
        root.render(<ErrorDisplay design="text-success" message="Success" />);
        localStorage.setItem('loggedIn',true)        
        navigate("/")
        window.location.reload()

        break;

      case 400:
        root.render(
          <ErrorDisplay
            design="text-danger"
            message="You have incomplete credentials"
          />
        );
        break;

      case 404:
        root.render(
          <ErrorDisplay
            design="text-danger"
            message="You have invalid credentials, check them again!"
          />
        );
        break;
      case 501:
        root.render(
          <ErrorDisplay
            design="text-danger"
            message="Sorry we're currently experiencing technical difficulties"
          />
        );
        break;
      default:
        break;
    }

  }

  async function submitFunc() {
    let headersList = {
      Accept: '/Application/json',
      'Content-Type': 'application/json',
    };

    let finalHash= await Hash(password)
    let bodyContent = JSON.stringify({
      phone: phoneNo,
      passwordHash: finalHash,
    });

    fetch(
      `${baseURL}`,
      {
        method: 'POST',
        body: bodyContent,
        headers: headersList,
      }
    ).then(function(response) {
      checkApiResponse(response);
      return response.text();
    }).then(function (data) {
       localStorage.setItem("userData",data);
    });
    
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
              submitFunc();
            }}
            action=""
            method=""
          >
            <h1 className="text-center">Login</h1>

            <div className="form-group">
              <label for="phoneNo">Phone Number:</label>
              <input
                type="text"
                className="form-control username"
                id="phoneNo"
                placeholder="Phone Number"
                name="phoneNo"
                onChange={(e) => setPhoneNo(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
              />
              <div id="passwordError"></div>
            </div>
            <div id="errorDisplay"></div>
            <div
              id="forgotPassword"
              className="form-group d-flex justify-content-end mt-md-5"
            >
              <span className=""></span>
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
