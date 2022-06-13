import React,{ useState } from 'react';
import { Link } from 'react-router-dom';


function clearBold(){
    
}

export default function SideNavBar() {
    const [showTypesOfUsers,setShow]=useState(false);

    const [clicked,setClicked]=useState('');

    var user = localStorage.getItem('userData')
    
    return (
        <aside className="container col-2 navigationContainer pt-2 shadow navbar left-sidebar d-flex align-items-start" >
            
            <div className="container-fluid mt-5" >

                <div className="container-fluid row " >
                    <div className=" row border-bottom sidebarList " id="usersSidebar">
                        <a onClick={()=>{setShow(!showTypesOfUsers)
                             /* setClicked('users') */}} className="" id="userBtn" >{(clicked == 'admins' || clicked == 'staffs' || clicked == 'clients') ? <strong>Users</strong> : <span>Users</span>}</a>
                        <div className='' id="userSubdiv">
                            {showTypesOfUsers ?  <ul>
                                {JSON.parse(user).defaultAdmin ? <li className="clickable" id="adminBtn" onClick={()=>{setClicked('admins')}} > <Link to="admins"> {(clicked == 'admins') ? <strong>Admins</strong> : <span>Admins</span>}</Link></li> : null}
                                <li className="clickable" id="staffBtn" onClick={()=>{setClicked('staffs')}}><Link to="staffs"> {(clicked == 'staffs') ? <strong>Staffs</strong> : <span>Staffs</span>}</Link></li>
                                <li className="clickable" id="clientBtn" onClick={()=>{setClicked('clients')}}><Link to="clients"> {(clicked == 'clients') ? <strong>Clients</strong> : <span>Clients</span>}</Link></li>
                            </ul> : null}
                        </div>
                    </div>
                </div>

                <div className="container-fluid row ">
                    <div className=" row border-bottom sidebarList">
                        <a id="branchesBtn" onClick={()=>{setClicked('branches')}}><Link to="branches"> {(clicked == 'branches') ? <strong>Branches</strong> : <span>Branches</span>}</Link></a>
                        <a id="reservationsBtn" onClick={()=>{setClicked('reservations')}}><Link to="reservations"> {(clicked == 'reservations') ? <strong>Reservations</strong> : <span>Reservations</span>}</Link></a>
                    </div>
                </div>
            </div>

                
        </aside>
    )
  }

