import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { EditStaff, NewStaff, ShowStaffs } from './staffActions';

import {baseURL} from '../../sourceData/data'


export default function Staffs() {
  let [staffList, setStaffList] = useState([]);
  let [selectedStaffList, setSelectedStaffList] = useState([]);

  let [branches, setBranches] = useState([]);
  let [branchIdVN, setbranchIdVN] =useState({});


  async function FetchAdmins() {
    useEffect(() => {
      fetch(`${baseURL}/staffs`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((resp) => {
          setStaffList(resp);
          setSelectedStaffList(resp);
        });
    }, []);

    fetch(`${baseURL}/branches`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((resp) => {
          setBranches(resp);
      });
  
    //   useEffect(() => {
    //     var branchDict = {}
    //     branches.map((item)=>{
    //         branchDict[item.id]=item.name;
    //     })
    //     setbranchIdVN(branchDict)
  
      
    // },[branches])
  }

  

  FetchAdmins();

  setInterval(() => {
    FetchAdmins();
  }, 60000);

  

  // console.log("hello")
  // console.log(branches)
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
            branchIdVN={branchIdVN}
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
            branchIdVN={branchIdVN}
            branches={branches}
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
            branches ={branches}
          />
        }
      />
    </Routes>
  );
}
