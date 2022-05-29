import Button from '../Button';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';

// import Add from "./functions"

import ErrorDisplay from '../ErrorDisplay';
import { CheckApiResponse } from '../functions/CheckApiResponse';
import { Hash } from '../functions/Hash';
import PageHeading from '../PageHeading';
import { UpdateRemoveState } from '../functions/UpdateState';

var baseURL = 'http://127.0.0.1:5000/token:qwhu67fv56frt5drfx45e/reservations';
export function ShowReservations({ reservationList,selectedReservationList, setSelectedReservationList, clientIdVN, branchIdVN }) {
  
  var elementType = [
    { value: 'id', name: 'ID' },
    { value: 'client', name: 'Client' },
    { value: 'branch', name: 'Branch' },
    { value: 'slot', name: 'Slot' },
    { value: 'startingTime', name: 'Start T.' },
    { value: 'duration', name: 'Duration' },
    { value: 'parked', name: 'Parked' },


  ];


  return (
    <div className="">
      <PageHeading
        userType="Reservations"
        // onclick={() => alert('yello')}
        fullData={reservationList}
        data={selectedReservationList}
        setter={setSelectedReservationList}
        elementType={elementType}
      />
      <table className="table table-striped">
        <tbody className="">
          <tr>
            <th>Id</th>
            <th>Client</th>
            <th>Branch</th>
            <th>Slot</th>
            <th>Starting Time</th>
            <th>Duration</th>
            <th>Parked</th>
            <th>
            </th>
          </tr>
        </tbody>
        <tbody id="tableDataField">
          {selectedReservationList.map((item) => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{clientIdVN[item.client]}</td>
                <td>{branchIdVN[item.branch]}</td>
                <td>{item.slot}</td>
                <td>{item.startingTime}</td>
                <td>{item.duration}</td>
                <td>{item.parked? "Yes" : "No"}</td>

                <td>
                  <Button
                    color=""
                    bgColor=""
                    name="Delete"
                    id={item.id}
                    className="btn deleteButton ms-1"
                    onclick={() => DeleteReservation(item.id,selectedReservationList, setSelectedReservationList)}
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

function DeleteReservation(id,selectedReservationList, setSelectedReservationList) {
  let confirmation = window.confirm('you sure you want to delete the reservation');

  if (confirmation) {
    fetch(`${baseURL}/${id}`, {
      method: 'DELETE',
    }).then((resp) => {
      resp.json();
    });

    UpdateRemoveState(id,selectedReservationList,setSelectedReservationList)
  }
}