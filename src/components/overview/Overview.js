import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Card from '../Card';
import OverviewAction from './OverviewAction';

export default function Overview() {
  const  [overviewData,setOverviewData]=useState([])
  async function FetchOverview() {
    useEffect(() => {
    fetch(
      'http://127.0.0.1:5000/token:qwhu67fv56frt5drfx45e/overviews',
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((resp) => setOverviewData(resp));
    }, [])

  }

  FetchOverview();

  setInterval(() => {
    FetchOverview()
  }, 60000);


  return (
    <Routes>
      <Route path="/*" element={<OverviewAction overviewData={overviewData}/>}/>
    </Routes>
      );
}
