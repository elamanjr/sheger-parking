import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { EditAdmin, ShowAdmins, NewAdmin } from './adminActions';

import {baseURL} from '../../sourceData/data'

export default function Admins() {
  let [adminList, setAdminList] = useState([]);
  let [selectedAdminList, setSelectedAdminList] = useState([]);

  // let baseURL = 'http://127.0.0.1:5000/token:qwhu67fv56frt5drfx45e'
  async function FetchAdmins() {
    useEffect(() => {
      fetch(`${baseURL}/admins`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((resp) => {
          setAdminList(resp);
          setSelectedAdminList(resp);
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
          <ShowAdmins
            adminList={adminList}
            selectedAdminList={selectedAdminList}
            setSelectedAdminList={setSelectedAdminList}
          />
        }
      />
      <Route
        path="/edit/"
        element={
          <EditAdmin
            adminList={adminList}
            selectedAdminList={selectedAdminList}
            setSelectedAdminList={setSelectedAdminList}
          />
        }
      />
      <Route
        path="/new/"
        element={
          <NewAdmin
            adminList={adminList}
            selectedAdminList={selectedAdminList}
            setSelectedAdminList={setSelectedAdminList}
          />
        }
      />
    </Routes>
  );
}
