import React from 'react';
import Card from '../Card';

export default function OverviewAction({ overviewData }) {
  var totalReservation = (
    <div>
      Total Reserv
      <wbr />
      ations
    </div>
  );
  let data = {
    average: `${overviewData.dailyAverageReservationCount} reservations served daily on average`,
  };

  return (
    <div className="content align-middle">
      <div className="col-12 ">
        <h1 className="mb-4">Overview</h1>
        <div className=" col-12 shadow-xsm ">
          <Card
            name="Sheger Parking"
            text={data.average}
            nameClass={'ms-2 h4'}
          />
        </div>

        <div className="row wellContainerBox">
          <div className="col-sm-3 wellContainer container-fluid">
            <Card
              name="Total Clients"
              text={overviewData.clientsCount}
              nameClass={'ms-2 h4'}
            />
          </div>
          <div className="col-sm-3 wellContainer">
            <Card
              name="Total Staff"
              text={overviewData.staffsCount}
              nameClass={'ms-2 h4'}
            />
          </div>
          <div className="col-sm-3 wellContainer ">
            <Card
              name="Total Branches"
              text={overviewData.branchesCount}
              nameClass={'ms-2 h4'}
            />
          </div>
          <div className="col-sm-3 wellContainer container-fluid">
            <Card
              name={totalReservation}
              text={overviewData.reservationsCount}
              nameClass="h4 word ms-2"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4 wellContainer">
            <Card
              name="First Day Of Launch"
              text={overviewData.launchDate}
              nameClass="h5 ms-2"
            />
          </div>
          <div className="col-sm-4 wellContainer">
            <Card
              name="Todays Reservation"
              text={overviewData.todaysReservationCount}
              nameClass="h5 ms-2"
            />
          </div>
          <div className="col-sm-4 wellContainer">
            <Card
              name="Days On Service"
              text={overviewData.daysOnService}
              nameClass="h5 ms-2"
            />
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
