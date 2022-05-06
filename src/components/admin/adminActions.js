import Button from '../Button';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

// var baseURL = 'http://127.0.0.1:5000/token:qwhu67fv56frt5drfx45e/admins/';
export function ShowAdmins({ adminList }) {
  return (
    <div className="">
      <h1 className="pb-2">List Of Admins</h1>
      <table className="table table-striped">
        <tbody className="">
          <tr>
            <th>Id</th>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Password</th>
            <th>
              <Link to="new">
                <Button
                  color=""
                  bgColor="var(--primary-color)"
                  name="Add Admin"
                  id="addAdminBtn"
                  className="btn px-4"
                />
              </Link>
            </th>
          </tr>
        </tbody>
        <tbody id="tableDataField">
          {adminList.map((item) => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.fullName}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.password}</td>
                <td>
                <Link to="edit" state={{item:item}} >
                    <Button
                      color=""
                      bgColor=""
                      name="Edit"
                      id={item.id}
                      className="btn editBtn"
                      // onclick={() => EditAdmin()}

                    />
                    </Link>
                  <Button
                    color=""
                    bgColor=""
                    name="Delete"
                    id={item.id}
                    className="btn deleteButton ms-1"
                    onclick={() => DeleteAdmin(item.id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function NewAdmin() {
  let navigate = useNavigate();

  const [id, setId] = useState('123');
  const [fullName, setFullName] = useState('eyob abel');
  const [phone, setPhone] = useState('1445ss1178956');
  const [email, setEmail] = useState('abel@gmail.com');
  const [passwordHash, setPasswordHash] = useState('jaflnsdhe');
  const [defaultAdmin, setDefaultAdmin] = useState(false);

  let data = {
    id,
    fullName,
    phone,
    email,
    passwordHash,
    defaultAdmin,
  };

  function newAdminAction() {

    
    let headersList = {
      Accept: '/Application/json',
      'Content-Type': 'application/json',
      // "mode": 'no-cors',
    };

    let bodyContent = JSON.stringify({
      id,
      fullName,
      phone,
      email,
      passwordHash,
      defaultAdmin,
    });

    fetch('http://127.0.0.1:5000/token:qwhu67fv56frt5drfx45e/admins/', {
      method: 'POST',
      body: bodyContent,
      headers: headersList,
    })
      .then(function (response) {
        return response.text();
      })
      .then(function (data) {
        console.log(data);
      });

      // window.location.replace("/")
      navigate(`../`)
      window.location.reload()


  }
  return (
    <form
      className="form"
      id="add-admin-form"
      action=""
      method=""
      onSubmit={(e) => {
        newAdminAction();
        e.preventDefault();
        // console.log(data)
      }}
    >
      <h1 id="formHeader">New Admin</h1>
      <div className="form-group">
        <label for="fullName">Full Name:</label>
        <input
          type="text"
          className="form-control "
          id="fullName"
          placeholder="Full Name"
          name="fullName"
          required
          oninvalid="input_error('fullName')"
          onChange={(e) => {
            setFullName(e.target.value);
          }}
        />
        <div id="fullNameError" className="errorOutput"></div>
      </div>
      <div className="form-group">
        <label for="phone">Phone:</label>
        <input
          type="tell"
          className="form-control tell"
          id="phone"
          placeholder="Phone"
          name="phone"
          required
          oninvalid="input_error('phone')"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <div id="phoneError" className="errorOutput"></div>
      </div>

      <div className="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          className="form-control email"
          id="email"
          placeholder="Email : example@email.com"
          name="email"
          required
          oninvalid="input_error('email')"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <div id="emailError" className="errorOutput"></div>
      </div>

      <div className="form-group">
        <label for="password">Password:</label>
        <input
          type="password"
          className="form-control password"
          id="password"
          placeholder="Password"
          name="password"
          required
          oninvalid="input_error('password')"
          onChange={(e) => {
            setPasswordHash(e.target.value);
          }}
        />
        <div id="passwordError" className="errorOutput"></div>
      </div>
      <div className="form-group">
        <label for="confirmPassword" id="confirmPsdd">
          Confirm Password:
        </label>
        <input
          type="password"
          className="form-control password"
          id="confirmPassword"
          placeholder="Confirm Password"
          name="confirmPassword"
          required
          oninvalid="input_error('confirmPassword')"
        />
        <div id="confirmPasswordError" className="errorOutput"></div>
      </div>
      <div id="errorDisplay"></div>
      <br />
      <button
        className="btn btn-customized buttonWider"
        id="addBtn"
        onSubmit="displayOverviewPage()"
      >
        Add
      </button>
    </form>
  );
}

function DeleteAdmin(id) {
  let confirmation = window.confirm('you sure you want to delete the admin');

  if (confirmation) {
    fetch(`http://127.0.0.1:5000/token:qwhu67fv56frt5drfx45e/admins/${id}`, {
      method: 'DELETE',
    }).then((resp) => {
      resp.json();
    });

    window.location.reload();
  }
}

export function EditAdmin() {

  const location = useLocation()
  const {item} = location.state

  let navigate = useNavigate();

  const [id, setId] = useState(item.id);
  const [fullName, setFullName] = useState(item.fullName);
  const [phone, setPhone] = useState(item.phone);
  const [email, setEmail] = useState(item.email);
  const [passwordHash, setPasswordHash] = useState(item.passwordHash);
  const [defaultAdmin, setDefaultAdmin] = useState(item.defaultAdmin);

  function editAdminAction() {

    let headersList = {
      "Accept": "/Application/json",
      "Content-Type": "application/json"
     }
     
     let bodyContent = JSON.stringify({
         id,
         fullName,
         phone,
         email,
         passwordHash,
         defaultAdmin
     });
     
     fetch("http://127.0.0.1:5000/token:qwhu67fv56frt5drfx45e/admins/626f697a0748c1b4074378a9", { 
       method: "PATCH",
       body: bodyContent,
       headers: headersList
     }).then(function(response) {
       return response.text();
     }).then(function(data) {
       console.log(data);
     })
      // window.location.replace("/")
      navigate(`../`)
      window.location.reload()


  }
  return (
    <form
      className="form"
      id="add-admin-form"
      action=""
      method=""
      onSubmit={(e) => {
        editAdminAction();
        e.preventDefault();
        // console.log(data)
      }}
    >
      <h1 id="formHeader">Edit Admin</h1>
      <div className="form-group">
        <label for="fullName">Full Name:</label>
        <input
          type="text"
          className="form-control "
          id="fullName"
          placeholder="Full Name"
          name="fullName"
          
          oninvalid="input_error('fullName')"
          onChange={(e) => {
            setFullName(e.target.value);
          }}
          value={fullName}
          
        />
        <div id="fullNameError" className="errorOutput"></div>
      </div>
      <div className="form-group">
        <label for="phone">Phone:</label>
        <input
          type="tell"
          className="form-control tell"
          id="phone"
          placeholder="Phone"
          name="phone"
          
          oninvalid="input_error('phone')"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          value={phone}


        />
        <div id="phoneError" className="errorOutput"></div>
      </div>

      <div className="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          className="form-control email"
          id="email"
          placeholder="Email : example@email.com"
          name="email"
          
          oninvalid="input_error('email')"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}


        />
        <div id="emailError" className="errorOutput"></div>
      </div>

      <div className="form-group">
        <label for="password">Password:</label>
        <input
          type="password"
          className="form-control password"
          id="password"
          placeholder="Password"
          name="password"
          
          oninvalid="input_error('password')"
          onChange={(e) => {
            setPasswordHash(e.target.value);
          }}
          value={passwordHash}


        />
        <div id="passwordError" className="errorOutput"></div>
      </div>
      <div className="form-group">
        <label for="confirmPassword" id="confirmPsdd">
          Confirm Password:
        </label>
        <input
          type="password"
          className="form-control password"
          id="confirmPassword"
          placeholder="Confirm Password"
          name="confirmPassword"
          
          oninvalid="input_error('confirmPassword')"
          value={passwordHash}


        />
        <div id="confirmPasswordError" className="errorOutput"></div>
      </div>
      <div id="errorDisplay"></div>
      <br />
      <button
        className="btn btn-customized buttonWider"
        id="addBtn"
      >
        Save
      </button>
    </form>
  );
}
