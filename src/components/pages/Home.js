import { Routes, Route } from 'react-router-dom';
import Admins from '../Admins';
import Branches from '../Branches';
import Clients from '../Clients';

import Header from '../Header'
import Overview from '../Overview';
import SideNavBar from '../SideNavBar'
import Staffs from '../Staffs';

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
        <Route path="/admins/" element={<Admins/>} />
        <Route path="/clients/" element={<Clients/>} />
        <Route path="/staffs/" element={<Staffs />} />
        <Route path="/branches/" element={<Branches />} />
      </Routes>
      </div>

      </div>

      </div>
    )
  }

