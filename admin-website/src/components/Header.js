import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
      <div className="headerBackground shadow navbar fixed-top">
        <div className="row align-items-center flex-nowrap container-fluid  headerContainer rounded pt-2 ">
          <div className="row">
            <div className="col-6">
              <div className="col-6"></div>
              <h1 className="col-6 text-center clickable">
                <Link to="/">Administrator</Link>
              </h1>
            </div>

            <div className="col-6">
              <div className="row flex-nowrap d-flex  ms-4">
                <div className="col-8"></div>

                <div className="col-2 container headerPageListContainer rounded row me-2 shadow-sm">
                  <Link to="/">
                    <a className="text-center " id="overviewBtn">
                      Overview
                    </a>
                  </Link>
                </div>
                <div className="col-2 ms-4 text-right">
                  <div className="row">
                    <div
                      className="col-6"
                      
                    ></div>
                    <i onClick={() =>{ 
                      localStorage.setItem("loggedIn",false)
                      window.location.reload()}}
                      class="fa-solid fa-arrow-right-from-bracket h1 col-6"
                      id="logoutBtn"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
