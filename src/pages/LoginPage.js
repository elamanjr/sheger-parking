import React from 'react'
import Button from '../Button'

import '../../css/login.css'
import '../../css/common.css'


export default function LoginPage() {
  return (
    <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6 loginContainer">
            <form
              className="form loginForm "
              id="login-form"
              onSubmit={(event)=>{ event.preventDefault()
                  window.location.replace('/overview')}}
              action=""
              method=""
            >
              <h1 className="text-center">Login</h1>

              <div className="form-group">
                <label for="username">Username:</label>
                <input
                  type="text"
                  className="form-control username"
                  id="username"
                  placeholder="Username"
                  name="username"
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
