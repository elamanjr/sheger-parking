import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { EditAdmin, ShowAdmins, NewAdmin } from './adminActions';

export default function Admins() {

  let [adminList, setAdminList] = useState([]);

  async function FetchAdmins() {
    useEffect(() => {
    fetch(
      'http://127.0.0.1:5000/token:qwhu67fv56frt5drfx45e/admins',
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((resp) => setAdminList(resp));
    }, [])

  }

  FetchAdmins();

  setInterval(() => {
    FetchAdmins()
  }, 60000);

  

  return (
    <Routes>
      <Route exact path="/" element={<ShowAdmins adminList={adminList} />} />
      <Route path="/edit/" element={<EditAdmin />} />
      <Route path="/new/" element={<NewAdmin />} />
    </Routes>
  );
}
