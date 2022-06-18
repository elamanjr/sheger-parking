import Button from '../Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ErrorDisplay from '../ErrorDisplay';
import * as ReactDOM from 'react-dom/client';
import { CheckApiResponse } from '../functions/CheckApiResponse';
import PageHeading from '../PageHeading';
import { Hash } from '../functions/Hash';
import UpdateAddState, {
  UpdateEditState,
  UpdateRemoveState,
} from '../functions/UpdateState';

import { baseURL } from '../../sourceData/data';
import LoadingSpinner from '../LoadingSpinner';

import Select from 'react-select';

// const baseUrl = 'http://127.0.0.1:5000/token:qwhu67fv56frt5drfx45e/staffs';

export function ShowStaffs({
  staffList,
  selectedStaffList,
  setSelectedStaffList,
  branchIdVN,
}) {
  var elementType = [
    { value: 'id', name: 'ID' },
    { value: 'fullName', name: 'Full Name' },
    { value: 'phone', name: 'Phone' },
    { value: 'email', name: 'Email' },
    { value: 'branch', name: 'Branch' },
  ];

  return (
    <div className="">
      <PageHeading
        userType="Staff"
        // onclick={() => alert('yello')}
        fullData={staffList}
        data={selectedStaffList}
        setter={setSelectedStaffList}
        elementType={elementType}
      />{' '}
      <table className="table table-striped rounded">
        <tbody className="">
          <tr>
            <th>Id</th>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Branch</th>

            <th>
              <Link to="new">
                <Button
                  color=""
                  bgColor="var(--primary-color)"
                  name="Add Staff"
                  id="addAdminBtn"
                  className="btn px-4"
                />
              </Link>
            </th>
          </tr>
        </tbody>
        <tbody id="tableDataField">
          <td></td>
          {selectedStaffList.length === 0 ? (
            <tr>
              <td></td>
              <td></td>
              <td>{LoadingSpinner()}</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          ) : null}
          {selectedStaffList.map((item) => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.fullName}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{branchIdVN[item.branch]}</td>

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
                    className="btn deleteButton ms-1 mt-1"
                    onclick={() =>
                      DeleteStaff(
                        item.id,
                        selectedStaffList,
                        setSelectedStaffList
                      )
                    }
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

export function NewStaff({
  staffList,
  selectedStaffList,
  setSelectedStaffList,
  branchIdVN,
  branches,
}) {
  const [id, setId] = useState('to be assigned');
  const [fullName, setFullName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [passwordHash, setPasswordHash] = useState();
  const [confirmpsdd, setconfirmpsdd] = useState();
  const [branch, setBranch] = useState();

  const [branchOptions, setBranchOptions] = useState([]);

  async function newStaffAction() {
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
        branch: branch,
      });

      fetch(`${baseURL}/staffs`, {
        method: 'POST',
        body: bodyContent,
        headers: headersList,
      }).then(function (data) {
        CheckApiResponse(data, data.json());
      });

      let newItem = JSON.parse(bodyContent);
      UpdateAddState(selectedStaffList, setSelectedStaffList, newItem);
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
        newStaffAction();
      }}
    >
      <h1 id="formHeader">New Staff</h1>
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
          type="number"
          className="form-control tel"
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
        <label for="branch">Branch:</label>

        <select
          onChange={(event) => {
            setBranch(event.target.value);
          }}
          className="ms-3"
        >
          <option disabled={false} value="">
            No Selection
          </option>
          {branches.map((branch) => {
            return <option value={branch.id}>{branch.name}</option>;
          })}
        </select>

        <div id="passwordError" className="errorOutput"></div>
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
            setconfirmpsdd(e.target.value);
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

export function DeleteStaff(delId, selectedStaffList, setSelectedStaffList) {
  let confirmation = window.confirm('you sure you want to delete the staff');

  if (confirmation) {
    fetch(`${baseURL}/staffs/${delId}`, {
      method: 'DELETE',
    }).then((resp) => {
      resp.json();
    });

    UpdateRemoveState(delId, selectedStaffList, setSelectedStaffList);
  }
}

export function EditStaff({
  staffList,
  selectedStaffList,
  setSelectedStaffList,
  branches,
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

  const [branch, setBranch] = useState(item.branch);
  const [currentBranch, setCurrentBranch] = useState('Loading...');

  function editStaffAction() {
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
        branch,
      });

      fetch(`${baseURL}/staffs/${item.id}`, {
        method: 'PATCH',
        body: bodyContent,
        headers: headersList,
      }).then(function (data) {
        CheckApiResponse(data, data.json());
      });

      let editItem = JSON.parse(bodyContent);

      UpdateEditState(id, selectedStaffList, setSelectedStaffList, editItem);
    }
  }

  branches.forEach((branch) => {
    if (branch.id == item.branch) {
      alert('found');
      setCurrentBranch(branch.name);
    }
  });
  return (
    <form
      className="form"
      id="add-admin-form"
      action=""
      method=""
      onSubmit={(e) => {
        editStaffAction();
        e.preventDefault();
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
          type="number"
          className="form-control tel"
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
        <label for="branch">Branch:</label>

        <select
          onChange={(event) => {
            setBranch(event.target.value);
          }}
          className="ms-3"
        >
          <option disabled={false} value="">
            {currentBranch}
          </option>

          {branches.map((branch) => {
            return <option value={branch.id}>{branch.name}</option>;
          })}
        </select>

        <div id="passwordError" className="errorOutput"></div>
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
