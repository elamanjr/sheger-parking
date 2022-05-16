import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { EditClient, ShowClients } from './clientActions';

export default function Clients() {
  var [clientList, setClientList] = useState([]);
  var [selectedClientList, setSelectedClientList] = useState([]);

  async function FetchAdmins() {
    useEffect(() => {
      fetch('http://127.0.0.1:5000/token:qwhu67fv56frt5drfx45e/clients', {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((resp) => {
          setClientList(resp);
          setSelectedClientList(resp);
        });
    }, []);
  }

  FetchAdmins();

  setInterval(() => {
    FetchAdmins();
  }, 60000);

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <ShowClients
            clientList={clientList}
            selectedClientList={selectedClientList}
            setSelectedClientList={setSelectedClientList}
          />
        }
      />
    </Routes>
  );
}
