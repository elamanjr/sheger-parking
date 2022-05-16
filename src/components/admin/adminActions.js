import Button from '../Button';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';

import ErrorDisplay from '../ErrorDisplay';
import { CheckApiResponse } from '../functions/CheckApiResponse';
import { Hash } from '../functions/Hash';
import PageHeading from '../PageHeading';
import UpdateAddState, { UpdateEditState, UpdateRemoveState } from '../functions/UpdateState';


var baseURL = 'http://127.0.0.1:5000/token:qwhu67fv56frt5drfx45e/admins';
export function ShowAdmins({
  adminList,
  selectedAdminList,
  setSelectedAdminList
}) {
  var elementType = [
    { value: 'id', name: 'ID' },
    { value: 'fullName', name: 'Full Name' },
    { value: 'phone', name: 'Phone' },
    { value: 'email', name: 'Email' },
  ];
  return (
    <div className="">
      <PageHeading
        userType="Admins"
        // onclick={() => alert('yello')}
        fullData={adminList}
        data={selectedAdminList}
        setter={setSelectedAdminList}
        elementType={elementType}
      />
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
          {selectedAdminList.map((item) => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.fullName}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.passwordHash}</td>
                <td>
                  <Link to="edit" state={{ item: item }}>
                    <Button
                      color=""
                      bgColor=""
                      name="Edit"
                      id={item.id}
                      className="btn editBtn"
                    />
                  </Link>
                  <Button
                    color=""
                    bgColor=""
                    name="Delete"
                    id={item.id}
                    className="btn deleteButton ms-1"
                    onclick={() => DeleteAdmin(item.id,adminList,
                      selectedAdminList,
                      setSelectedAdminList
                      )}
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

export function NewAdmin({
  adminList,
  selectedAdminList,
  setSelectedAdminList
}) {
  const [id, setId] = useState("to be assigned");
  const [fullName, setFullName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [passwordHash, setPasswordHash] = useState();

  const [confirmpsdd, setConfirmPsdd] = useState();
  const [defaultAdmin, setDefaultAdmin] = useState(false);

  async function newAdminAction() {
    if (confirmpsdd != passwordHash) {
      const root = ReactDOM.createRoot(document.getElementById('errorDisplay'));

      root.render(
        <ErrorDisplay
          design="text-danger"
          message="Your Password Doesn't Match!"
        />
      );
    } else {
      let headersList = {
        Accept: '/Application/json',
        'Content-Type': 'application/json',
      };

      let finalHash = await Hash(passwordHash);

      let bodyContent = JSON.stringify({
        id: id,
        fullName: fullName,
        phone: phone,
        email: email,
        passwordHash: finalHash,
        defaultAdmin: defaultAdmin,
      });
      fetch('http://127.0.0.1:5000/token:qwhu67fv56frt5drfx45e/admins/', {
        method: 'POST',
        body: bodyContent,
        headers: headersList,
      })
        .then(function (response) {
          return response;
        })
        .then(function (data) {
          CheckApiResponse(data, data.json());
        });

      
        let newItem = JSON.parse(bodyContent)

        UpdateAddState(selectedAdminList,
          setSelectedAdminList,newItem)  
     
    }
  }

  return (
    <form
      className="form"
      id="add-admin-form"
      action=""
      method=""
      onSubmit={(e) => {
        e.preventDefault();

        newAdminAction();
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
          onChange={(e) => {
            setConfirmPsdd(e.target.value);
          }}
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

async function DeleteAdmin(delId,adminList,
  selectedAdminList,
  setSelectedAdminList
  ) {
  let confirmation = window.confirm('you sure you want to delete the admin');

  if (confirmation) {
    fetch(`${baseURL}/${delId}`, {
      method: 'DELETE',
    }).then((resp) => {
      resp.json();
    });

    UpdateRemoveState(delId,selectedAdminList,setSelectedAdminList)

    
  }
}

export function EditAdmin({
  adminList,
  selectedAdminList,
  setSelectedAdminList
}) {
  const location = useLocation();
  const { item } = location.state;

  let navigate = useNavigate();

  const [id, setId] = useState(item.id);
  const [fullName, setFullName] = useState(item.fullName);
  const [phone, setPhone] = useState(item.phone);
  const [email, setEmail] = useState(item.email);
  const [passwordHash, setPasswordHash] = useState(item.passwordHash);
  const [confirmPsdd, setconfirmPsdd] = useState(item.passwordHash);

  const [defaultAdmin, setDefaultAdmin] = useState(item.defaultAdmin);

  function editAdminAction() {
    if (confirmPsdd != passwordHash) {
      const root = ReactDOM.createRoot(document.getElementById('errorDisplay'));

      root.render(
        <ErrorDisplay
          design="text-danger"
          message="Your Password Doesn't Match!"
        />
      );
    } else {
      let headersList = {
        Accept: '/Application/json',
        'Content-Type': 'application/json',
      };

      let bodyContent = JSON.stringify({
        id,
        fullName,
        phone,
        email,
        passwordHash,
        defaultAdmin,
      });

      fetch(`${baseURL}/${item.id}`, {
        method: 'PATCH',
        body: bodyContent,
        headers: headersList,
      }).then(function (data) {
        // console.log(data);
        CheckApiResponse(data, data.json());
      });

      let editItem = JSON.parse(bodyContent)

    UpdateEditState(id,selectedAdminList, setSelectedAdminList, editItem)
  
    }
   
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
          onChange={(e) => {
            setconfirmPsdd(e.target.value);
          }}
          value={confirmPsdd}
        />
        <div id="confirmPasswordError" className="errorOutput"></div>
      </div>
      <div id="errorDisplay"></div>
      <br />
      <button className="btn btn-customized buttonWider" id="addBtn">
        Save
      </button>
    </form>
  );
}
