import React from 'react';
import Card from './Card';

export default function Overview() {
    var totalReservation = <div>Total Reserv<wbr/>ations</div>
  return (
    <div className="content align-middle">
      <div className="col-12 ">
        <h1 className="mb-4">Overview</h1>
          <div className=" col-12 shadow-xsm ">
            <Card
              name="Sheger Parking"
              text="15 reservations served daily on average"
              nameClass={'ms-2 h4'}
            />
          </div>

        <div className="row wellContainerBox">
          <div className="col-sm-3 wellContainer container-fluid">
            <Card name="Total Clients" text="50" nameClass={'ms-2 h4'} />
          </div>
          <div className="col-sm-3 wellContainer">
            <Card name="Total Staff" text="10" nameClass={'ms-2 h4'} />
          </div>
          <div className="col-sm-3 wellContainer ">
            <Card name="Branches" text="10" nameClass={'ms-2 h4'} />
          </div>
          <div className="col-sm-3 wellContainer container-fluid">
            
            <Card
              name={totalReservation}
              text="276"
              nameClass="h4 word ms-2"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4 wellContainer">
            <Card
              name="First Day Of Launch"
              text="19/02/2015"
              nameClass="h5 ms-2"
            />
          </div>
          <div className="col-sm-4 wellContainer">
            <Card name="Todays Reservation" text="19" nameClass="h5 ms-2" />
          </div>
          <div className="col-sm-4 wellContainer">
            <Card name="Days On Service" text="20" nameClass="h5 ms-2" />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 wellContainer">
            <Card
              name="Software Maintenance Technicians"
              text="+251911607080"
              nameClass="h6 ms-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
