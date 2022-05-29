import React from 'react';
// import { Link } from 'react-router-dom';
import Button from '../Button';
import { UpdateRemoveState } from '../functions/UpdateState';
import PageHeading from '../PageHeading';

export function ShowClients({
  clientList,
  selectedClientList,
  setSelectedClientList,
}) {
  var elementType = [
    { value: 'id', name: 'ID' },
    { value: 'fullName', name: 'Full Name' },
    { value: 'phone', name: 'Phone' },
    { value: 'email', name: 'Email' },
    { value: 'defaultPlateNumber', name: 'PlateNumber' },
  ];

  return (
    <div className="">
      <PageHeading
        userType="Client"
        // onclick={() => alert('yello')}
        fullData={clientList}
        data={selectedClientList}
        setter={setSelectedClientList}
        elementType={elementType}
      />{' '}
      <table className="table table-striped">
        <tbody className="">
          <tr>
            <th>Id</th>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Default PlateNo.</th>

            <th>Password</th>
            <th></th>
          </tr>
        </tbody>
        <tbody id="tableDataField">
          {selectedClientList.map((item) => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.fullName}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.defaultPlateNumber}</td>

                <td>{item.passwordHash}</td>
                <td>
                  <Button
                    color=""
                    bgColor=""
                    name="Delete"
                    id={item.id}
                    className="btn deleteButton ms-1"
                    onclick={() => DeleteClient(item.id,selectedClientList,
                      setSelectedClientList)}
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

function DeleteClient(id,selectedClientList,
  setSelectedClientList) {
  let confirmation = window.confirm('you sure you want to delete the client');

  if (confirmation) {
    fetch(`http://127.0.0.1:5000/token:qwhu67fv56frt5drfx45e/clients/${id}`, {
      method: 'DELETE',
    }).then((resp) => {
      resp.json();
    });

    UpdateRemoveState(id,selectedClientList,setSelectedClientList)
  }
}
