import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { EditStaff, NewStaff, ShowStaffs } from './staffActions';

export default function Staffs() {
  let [staffList, setStaffList] = useState([]);
  let [selectedStaffList, setSelectedStaffList] = useState([]);

  async function FetchAdmins() {
    useEffect(() => {
      fetch('http://127.0.0.1:5000/token:qwhu67fv56frt5drfx45e/staffs', {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((resp) => {
          setStaffList(resp);
          setSelectedStaffList(resp);
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
          <ShowStaffs
            staffList={staffList}
            selectedStaffList={selectedStaffList}
            setSelectedStaffList={setSelectedStaffList}
          />
        }
      />
      <Route
        path="/edit/"
        element={
          <EditStaff
            staffList={staffList}
            selectedStaffList={selectedStaffList}
            setSelectedStaffList={setSelectedStaffList}
          />
        }
      />
      <Route
        path="/new/"
        element={
          <NewStaff
            staffList={staffList}
            selectedStaffList={selectedStaffList}
            setSelectedStaffList={setSelectedStaffList}
          />
        }
      />
    </Routes>
  );
}
