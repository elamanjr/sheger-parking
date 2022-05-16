import { Routes, Route } from 'react-router-dom';
import Admins from '../admin/Admins';
import Branches from '../branch/Branches';
import Clients from '../client/Clients';
import Reservations from '../reservation/Reservations';

import Header from '../Header'
import Overview from '../overview/Overview';
import SideNavBar from '../SideNavBar'
import Staffs from '../staff/Staffs';


import '../../css/common.css'

export default function Index() {


    return (
      <div>
      <Header/>
      <div className="container-fluid row float-start ">

      <SideNavBar/>
      <div class="container-fluid col-10 " id="displayWindow">

      <Routes>
        <Route exact path="/" element={<Overview/>} />
        <Route path="/admins/*" element={<Admins/>} />
        <Route path="/clients/*" element={<Clients/>} />
        <Route path="/staffs/*" element={<Staffs />} />
        <Route path="/branches/*" element={<Branches />} />
        <Route path="/reservations/*" element={<Reservations />} />
      </Routes>
      </div>

      </div>

      </div>
    )
  }

