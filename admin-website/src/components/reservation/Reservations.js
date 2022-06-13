import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ShowReservations } from './reservationActions';

import {baseURL} from '../../sourceData/data';


export default function Reservations() {
  let [reservationList, setReservationList] = useState([]);
  let [selectedReservationList, setSelectedReservationList] = useState([]);


  
  let [client, setClient] = useState([]);
  let [branches, setBranches] = useState([]);
  let [clientIdVN, setclientIdVN] =useState({});
  let [branchIdVN, setbranchIdVN] =useState({});

  async function FetchReservations() {
    useEffect(() => {
      fetch(`${baseURL}/reservations?includeCompleted=true`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((resp) => {
            setReservationList(resp);
          setSelectedReservationList(resp);
        });

        fetch(`${baseURL}/branches`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((resp) => {
            setBranches(resp);
        });

        fetch(`${baseURL}/clients`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((resp) => {
            setClient(resp);
        });
    }, []);
  }

  useEffect(() => {
      var clientDict = {}
      client.map((item)=>{
        clientDict[item.id]=item.fullName;
      })
      setclientIdVN(clientDict)
  },[client])

  useEffect(() => {
    var branchDict = {}
    branches.map((item)=>{
        branchDict[item.id]=item.name;
    })
    setbranchIdVN(branchDict)
},[branches])

  FetchReservations();

  setInterval(() => {
    FetchReservations();
  }, 60000);


  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <ShowReservations
          reservationList={reservationList}
          selectedReservationList={selectedReservationList}
          setSelectedReservationList={setSelectedReservationList}
          clientIdVN={clientIdVN}
          branchIdVN={branchIdVN}
          />
        }
      />
    </Routes>
  );
}
