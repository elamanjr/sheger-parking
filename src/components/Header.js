import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Header extends Component {
  render() {
    return (
        <div className="headerBackground shadow navbar fixed-top">
        <div className="row align-items-center flex-nowrap container-fluid  headerContainer rounded pt-2 ">
            <div className="row">
                <div className="col-6">
                    <div className="col-6"></div>
                    <h1 className="col-6 text-center clickable" onclick="displayOverviewPage()">Administrator</h1>
                </div>
                
                <div className="col-6">
                    <div className="row flex-nowrap d-flex  ms-4">
                        <div className="col-8">

                        </div>
                        <Link to="/index/">
                        <div className="col-2 container-fluid headerPageListContainer rounded row ms-2 shadow-sm">
                            <a className="text-center " id="overviewBtn">Overview</a>
                        </div></Link>
                        <div className="col-2 ms-4" id="logoutBtn">
                            <i onclick="logoutConfirm()" className="fa-solid fa-arrow-right-from-bracket h3 mt-2 ms-5"></i>
                        </div>
                    </div>
                </div>
            </div> 
       </div>
    </div>
    )
  }
}
