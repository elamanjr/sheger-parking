import React,{ useState } from 'react';
import { Link } from 'react-router-dom';



export default function SideNavBar() {
    const [showTypesOfUsers,setShow]=useState(false)
    return (
        <aside className=" container col-2 navigationContainer   pt-2 shadow navbar left-sidebar d-flex align-items-start" >
            
            <div className="container-fluid mt-5" >

                <div className="container-fluid row " >
                    <div className=" row border-bottom sidebarList " id="usersSidebar">
                        <a onClick={()=>setShow(!showTypesOfUsers)} className="" id="userBtn" >Users</a>
                        <div className='' id="userSubdiv">
                            {showTypesOfUsers ?  <ul>
                                <li className="clickable" id="adminBtn" onClick={()=>{}} > <Link to="admins"> Admins</Link></li>
                                <li className="clickable" id="staffBtn" onClick={()=>{}}><Link to="staffs"> Staffs</Link></li>
                                <li className="clickable" id="clientBtn" onClick={()=>{}}><Link to="clients"> Clients</Link></li>
                            </ul> : null}
                        </div>
                    </div>
                </div>

                <div className="container-fluid row ">
                    <div className=" row border-bottom sidebarList">
                        <a id="branchesBtn" onClick={()=>{}}><Link to="branches"> Branches</Link></a>
                    </div>
                </div>
            </div>

                
        </aside>
    )
  }

