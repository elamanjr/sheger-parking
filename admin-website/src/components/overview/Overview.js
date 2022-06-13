import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Card from '../Card';
import OverviewAction from './OverviewAction';

import {baseURL} from '../../sourceData/data';


export default function Overview() {
  const  [overviewData,setOverviewData]=useState([])
  async function FetchOverview() {
    useEffect(() => {
    fetch(
      `${baseURL}/overviews`,
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
