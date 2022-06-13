import React from 'react';
// import { Link } from 'react-router-dom';
import Button from '../Button';
import { UpdateRemoveState } from '../functions/UpdateState';
import PageHeading from '../PageHeading';

import {baseURL} from '../../sourceData/data'
import LoadingSpinner from '../LoadingSpinner';

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
    { value: 'defaultPlateNumber', name: 'PlateNo' },
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
      <table className="table table-striped rounded">
        <tbody className="">
          <tr>
            <th>Id</th>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Default PlateNo.</th>

            
            <th></th>
          </tr>
        </tbody>
        <tbody id="tableDataField">
        {selectedClientList.length ===0? <tr>
          <td></td>
          <td></td>
          <td></td>
          <td>{LoadingSpinner()}</td>
          <td></td>
          <td></td>
          </tr> : null}
          {selectedClientList.map((item) => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.fullName}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.defaultPlateNumber}</td>

                
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
    fetch(`${baseURL}/clients/${id}`, {
      method: 'DELETE',
    }).then((resp) => {
      resp.json();
    });

    UpdateRemoveState(id,selectedClientList,setSelectedClientList)
  }
}
