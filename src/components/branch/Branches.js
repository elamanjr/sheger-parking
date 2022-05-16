import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { EditBranch, NewBranch, ShowBranches } from './branchActions';

export default function Branches() {
  var [branchesList, setBranchesList] = useState([]);
  var [selectedBranchesList, setSelectedBranchesList] = useState([]);

  async function FetchAdmins() {
    useEffect(() => {
      fetch('http://127.0.0.1:5000/token:qwhu67fv56frt5drfx45e/branches', {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((resp) => {
          setBranchesList(resp);
          setSelectedBranchesList(resp);
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
          <ShowBranches
            branchesList={branchesList}
            setSelectedBranchesList={setSelectedBranchesList}
            selectedBranchesList={selectedBranchesList}
          />
        }
      />
      <Route
        path="/edit/"
        element={
          <EditBranch
            branchesList={branchesList}
            setSelectedBranchesList={setSelectedBranchesList}
            selectedBranchesList={selectedBranchesList}
          />
        }
      />
      <Route
        path="/new/"
        element={
          <NewBranch
            branchesList={branchesList}
            setSelectedBranchesList={setSelectedBranchesList}
            selectedBranchesList={selectedBranchesList}
          />
        }
      />
    </Routes>
  );
}
