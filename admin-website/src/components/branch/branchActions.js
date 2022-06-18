import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../Button';
import * as ReactDOM from 'react-dom/client';
import { CheckApiResponse } from '../functions/CheckApiResponse';
import GuidanceDisplay from '../GuidanceDisplay';
import PageHeading from '../PageHeading';
import UpdateAddState, {
  UpdateEditState,
  UpdateRemoveState,
} from '../functions/UpdateState';

import { baseURL } from '../../sourceData/data';
import LoadingSpinner from '../LoadingSpinner';

var baseUrl = `${baseURL}/branches`;
//

export function ShowBranches({
  branchesList,
  selectedBranchesList,
  setSelectedBranchesList,
}) {
  var elementType = [
    { value: 'id', name: 'ID' },
    { value: 'name', name: 'Name' },
    { value: 'location', name: 'Location' },
    { value: 'capacity', name: 'Capacity' },
    { value: 'onService', name: 'Service' },
    { value: 'pricePerHour', name: 'Price' },
    { value: 'description', name: 'Desc.' },
  ];

  return (
    <div>
      <PageHeading
        userType="Branches"
        fullData={branchesList}
        data={selectedBranchesList}
        setter={setSelectedBranchesList}
        elementType={elementType}
      />{' '}
      <Link to="new">
        <Button
          color=""
          bgColor="var(--primary-color)"
          name="Add Branch"
          id="addBranchBtn"
          className="btn px-4 mb-2"
        />
      </Link>
      {selectedBranchesList.length ===0? 
        <div>{LoadingSpinner()}</div>
         : null}
      {selectedBranchesList.map((branch) => {
        return (
          <div>
            <div className="container-md cardContainer mb-4 shadow g-o row pt-4 d-flex justify-content-center">
              <div className="column col-5 h-100">
                <div className="container-fluid">
                  <div className="row text-center h3">
                    <span>
                      {' '}
                      <b>{branch.name}</b>{' '}
                    </span>
                  </div>
                  <div className="row"></div>
                  <div className="row ">
                    <span>
                      <b>Id :</b> {branch.id}
                    </span>
                  </div>

                  <div className="row">
                    <p>
                      <b>Description : </b>
                      {branch.description}
                    </p>
                  </div>
                  <div className="row">
                    <span>
                      <b>Capacity : </b>
                      {branch.capacity}
                    </span>
                  </div>
                  <div className="row ">
                    <span>
                      <b>On Service : </b>
                      {branch.onService?"true":"false"}{' '}
                    </span>
                  </div>
                  <div className="row">
                    <div className="col-7">
                      <span>
                        <b>Price Per Hour : </b>
                        {branch.pricePerHour}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-7 text-start me-0 ps-0">
                <div className="row">
                  <div className="container mapContainer col-10">
                    <iframe
                      title="test"
                      src={`https://maps.google.com/maps?q=${branch.location}&h1=es:&output=embed`}
                      width="400"
                      height="300"
                    ></iframe>
                  </div>
                  <div className="col-2 text-start ">
                    <span className="d-flex flex-row">
                      <Link
                        to="edit"
                        state={{
                          branch: branch,
                        }}
                      >
                        <i className="fa-regular fa-pen-to-square h4"></i>
                      </Link>
                      <div
                        className="ms-4 mt-1"
                        onClick={() =>
                          deleteBranch(
                            branch.id,
                            branchesList,
                            selectedBranchesList,
                            setSelectedBranchesList
                          )
                        }
                      >
                        <i className="fa-regular fa-trash-can h4"></i>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
              <div />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function EditBranch({
  branchesList,
  selectedBranchesList,
  setSelectedBranchesList,
}) {
  let Location = useLocation();
  const { branch } = Location.state;
  // var { branchesList, selectedBranchesList, setSelectedBranchesList } =
  // Location.state;
  let navigate = useNavigate();

  const [id, setId] = useState(branch.id);
  const [branchName, setBranchName] = useState(branch.name);
  const [capacity, setCapacity] = useState(branch.capacity);
  const [onService, setOnservice] = useState(branch.onService);
  const [pricePerHour, setPricePerHour] = useState(branch.pricePerHour);
  const [description, setDescription] = useState(branch.description);
  const [location, setLocation] = useState(branch.location);

  function editBranchAction() {
    let headersList = {
      'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
      Accept: '/Application/json',
      'Content-Type': 'application/json',
    };

    let bodyContent = JSON.stringify({
      id: id,
      name: branchName,
      location: location,
      description: description,
      capacity: parseInt(capacity),
      onService: (onService=='true'),
      pricePerHour: parseInt(pricePerHour),
    });

    fetch(`${baseUrl}/${id}`, {
      method: 'PATCH',
      body: bodyContent,
      headers: headersList,
    }).then((data) => {
      CheckApiResponse(data, data.json());
    });
    let editItem = JSON.parse(bodyContent);

    UpdateEditState(
      id,
      selectedBranchesList,
      setSelectedBranchesList,
      editItem
    );
  }

  return (
    <form
      className="form"
      id="add-admin-form"
      action=""
      method=""
      onSubmit={(e) => {
        e.preventDefault();
        editBranchAction();
      }}
    >
      <h1 id="formHeader">Edit Branch</h1>
      <div className="d-flex flex-row flex-wrap justify-content-between">
        <div className="form-group">
          <label for="branchName">Branch Name:</label>
          <input
            type="text"
            className="form-control "
            id="branchName"
            placeholder="Branch Name"
            name="branchName"
            required
            oninvalid="input_error('fullName')"
            onChange={(e) => {
              setBranchName(e.target.value);
            }}
            value={branchName}
          />
          <div id="branchNameError" className="errorOutput"></div>
        </div>
        <div className="w-4"></div>
        <div className="form-group ">
          <label for="capacity">Capacity:</label>
          <input
            type="number"
            className="form-control tell"
            id="capacity"
            placeholder="Capacity"
            name="capacity"
            required
            oninvalid="input_error('capacity')"
            onChange={(e) => {
              setCapacity(e.target.value);
            }}
            value={capacity}
          />
          <div id="capacityError" className="errorOutput"></div>
        </div>
      </div>
      <div className="d-flex flex-row flex-wrap justify-content-between">
        <div className="form-group">
          <label for="description">Description:</label>
          <textarea
            type="text"
            className="form-control password"
            id="description"
            placeholder="Description"
            name="description"
            required
            oninvalid="input_error('description')"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            value={description}
          />
          <div id="passwordError" className="errorOutput"></div>
        </div>

        <div className="form-group">
          <label for="pricePerHour">Price Per Hour:</label>
          <input
            type="number"
            className="form-control password"
            id="pricePerHour"
            placeholder="Price Per Hour"
            name="pricePerHour"
            required
            oninvalid="input_error('pricePerHour')"
            onChange={(e) => {
              setPricePerHour(e.target.value);
            }}
            value={pricePerHour}
          />
          <div id="pricePerHourError" className="errorOutput"></div>
        </div>
      </div>

      <div className="d-flex flex-row flex-wrap justify-content-between">
        <div className="form-group">
          <label for="location" id="location">
            Location:
          </label>
          <textarea
            type="text"
            className="form-control password pe-4"
            id="location"
            placeholder="Location"
            name="location"
            required
            oninvalid="input_error('location')"
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            value={location}
          />
          <div id="locationError" className="errorOutput"></div>
          <p>
            <br />
            <strong>Guidance to insert a location </strong> <br />
            <ul>
              <li>go to google maps </li>
              <li>select the location of the branch as a destination</li>
              <li> go to left menu and select share or embed map </li>
              <li>select embed map </li>
              <li>choose the small size</li>
              <li>copy the text and paste it here</li>
              <li>
                from the text you just copied select the address inside src and
                copy it
              </li>
              <li>paste it here</li>
            </ul>
          </p>
        </div>
      </div>
      <div className="form-group">
        <label for="onService" className="pe-4 align-middle">
          On Service: ({onService?"true":"false"})
        </label>
        <label>
          True
          <input
            type="radio"
            name="onService"
            value={true}
            onChange={(e) => setOnservice(e.target.value)}
          />
        </label>
        <label className="ps-2">
          False
          <input
            name="onService"
            type="radio"
            value={false}
            onChange={(e) => setOnservice(e.target.value)}
          />
        </label>

        <div id="onServiceError" className="errorOutput"></div>
      </div>
      <div id="errorDisplay"></div>
      <br />
      <button className="btn btn-customized buttonWider" id="addBtn">
        Save Branch
      </button>
    </form>
  );
}

export function NewBranch({
  branchesList,
  selectedBranchesList,
  setSelectedBranchesList,
}) {
  let navigate = useNavigate();

  const [id, setId] = useState();
  const [branchName, setBranchName] = useState();
  const [capacity, setCapacity] = useState();
  const [onService, setOnservice] = useState();
  const [pricePerHour, setPricePerHour] = useState();
  const [description, setDescription] = useState();
  const [location, setLocation] = useState();

  function newBranchAction() {
    let headersList = {
      'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
      Accept: '/Application/json',
      'Content-Type': 'application/json',
    };

    let bodyContent = JSON.stringify({
      id: id,
      name: branchName,
      location: location,
      description: description,
      capacity: parseInt(capacity),
      onService: (onService=='true'),
      pricePerHour: parseInt(pricePerHour),
      
    });

    fetch(`${baseUrl}`, {
      method: 'POST',
      body: bodyContent,
      headers: headersList,
    }).then((data) => {
      console.log(data);
      CheckApiResponse(data, data.json());
    });

    let newItem = JSON.parse(bodyContent);

    UpdateAddState(selectedBranchesList, setSelectedBranchesList, newItem);
  }

  function locationGuidance() {
    const root = ReactDOM.createRoot(
      document.getElementById('guidanceDisplay')
    );

    root.render(<GuidanceDisplay />);
  }

  return (
    <form
      className="form"
      id="add-admin-form"
      action=""
      method=""
      onSubmit={(e) => {
        e.preventDefault();
        newBranchAction();
      }}
    >
      <h1 id="formHeader">New Branch</h1>
      <div className="d-flex flex-row flex-wrap justify-content-between">
        <div className="form-group">
          <label for="branchName">Branch Name:</label>
          <input
            type="text"
            className="form-control "
            id="branchName"
            placeholder="Branch Name"
            name="branchName"
            required
            oninvalid="input_error('fullName')"
            onChange={(e) => {
              setBranchName(e.target.value);
            }}
          />
          <div id="branchNameError" className="errorOutput"></div>
        </div>
        <div className="w-4"></div>
        <div className="form-group ">
          <label for="capacity">Capacity:</label>
          <input
            type="number"
            className="form-control tell"
            id="capacity"
            placeholder="Capacity"
            name="capacity"
            required
            oninvalid="input_error('capacity')"
            onChange={(e) => {
              setCapacity(e.target.value);
            }}
          />
          <div id="capacityError" className="errorOutput"></div>
        </div>
      </div>
      <div className="d-flex flex-row flex-wrap justify-content-between">
        <div className="form-group">
          <label for="description">Description:</label>
          <textarea
            type="text"
            className="form-control password"
            id="description"
            placeholder="Description"
            name="description"
            required
            oninvalid="input_error('description')"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <div id="passwordError" className="errorOutput"></div>
        </div>

        <div className="form-group">
          <label for="pricePerHour">Price Per Hour:</label>
          <input
            type="number"
            className="form-control password"
            id="pricePerHour"
            placeholder="Price Per Hour"
            name="pricePerHour"
            required
            oninvalid="input_error('pricePerHour')"
            onChange={(e) => {
              setPricePerHour(e.target.value);
            }}
          />
          <div id="pricePerHourError" className="errorOutput"></div>
        </div>
      </div>

      <div className="d-flex flex-row flex-wrap justify-content-between">
        <div className="form-group">
          <label for="location" id="location">
            Location:
          </label>
          <textarea
            type="text"
            className="form-control password pe-4"
            id="location"
            placeholder="0.000000,0.000000"
            name="location"
            required
            oninvalid="input_error('location')"
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
          <div id="locationError" className="errorOutput"></div>
          <div id="guidanceDisplay">
            <Button
              name="click for guidance"
              id="guidanceBtn"
              color=""
              bgColor="var(--primary-color)"
              className="btn px-4"
              onclick={() => {
                locationGuidance();
              }}
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <label for="onService" className="pe-4 align-middle">
          On Service:
        </label>
        <label>
          True
          <input
            type="radio"
            name="onService"
            value={true}
            onChange={(e) => setOnservice(e.target.value)}
          />
        </label>
        <label className="ps-2">
          False
          <input
            name="onService"
            type="radio"
            value={false}
            onChange={(e) => setOnservice(e.target.value)}
          />
        </label>

        <div id="onServiceError" className="errorOutput"></div>
      </div>
      <div id="errorDisplay"></div>
      <br />
      <button className="btn btn-customized buttonWider" id="addBtn">
        Add Branch
      </button>
    </form>
  );
}

function deleteBranch(
  id,
  branchesList,
  selectedBranchesList,
  setSelectedBranchesList
) {
  let confirmation = window.confirm('you sure you want to delete the Branch');

  if (confirmation) {
    fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
    }).then((resp) => {
      resp.json();
    });

    UpdateRemoveState(id, selectedBranchesList, setSelectedBranchesList);
  }
}
