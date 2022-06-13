import { Routes, Route } from 'react-router-dom';
import Admins from '../admin/Admins';
import Branches from '../branch/Branches';
import Clients from '../client/Clients';
import Reservations from '../reservation/Reservations';

import Overview from '../overview/Overview';
import Staffs from '../staff/Staffs';


import '../../css/common.css'

export default function DisplayWindow() {

  
    var user = localStorage.getItem('userData')

    return (

      <Routes>
        <Route exact path="/" element={<Overview/>} />
        {JSON.parse(user).defaultAdmin ?<Route path="/admins/*" element={<Admins/>} /> : null}
        <Route path="/clients/*" element={<Clients/>} />
        <Route path="/staffs/*" element={<Staffs />} />
        <Route path="/branches/*" element={<Branches />} />
        <Route path="/reservations/*" element={<Reservations />} />
      </Routes>

    )
  }

