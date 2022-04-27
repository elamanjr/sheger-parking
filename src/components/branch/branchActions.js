import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';
import MapCard from '../MapCard';

var branchesList = [
  {
    id: '123',
    name: 'Piyasa Gorgis Branch',
    location:
      'https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d545.6957051723684!2d38.755200717403596!3d9.037417570403298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e0!4m0!4m5!1s0x164b8f5efcffebd3%3A0xda821c73ef928f93!2sPiazza%2C%20Addis%20Ababa!3m2!1d9.0371838!2d38.7551432!5e1!3m2!1sen!2set!4v1648904269210!5m2!1sen!2set',
    //   '<iframe src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d545.6957051723684!2d38.755200717403596!3d9.037417570403298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e0!4m0!4m5!1s0x164b8f5efcffebd3%3A0xda821c73ef928f93!2sPiazza%2C%20Addis%20Ababa!3m2!1d9.0371838!2d38.7551432!5e1!3m2!1sen!2set!4v1648904269210!5m2!1sen!2set" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    description: 'around gorgis church',
    capacity: '70',
    onService: 'true',
    pricePerHour: '20',
  },
  {
    id: '345',
    name: 'Megenagna Branch',
    location:
      'https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d1386.6564425810773!2d38.803164073067805!3d9.020940043123018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x164b85de7ac53005%3A0x2f76f90a2fb95d7f!2sTsige%20Worku%20W%2FGebriel%20Authorized%20Accounting%20Firm%2C%20Addis%20Ababa!3m2!1d9.0207822!2d38.8033346!5e1!3m2!1sen!2set!4v1648903092714!5m2!1sen!2set',

    //   '<iframe src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d1386.6564425810773!2d38.803164073067805!3d9.020940043123018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x164b85de7ac53005%3A0x2f76f90a2fb95d7f!2sTsige%20Worku%20W%2FGebriel%20Authorized%20Accounting%20Firm%2C%20Addis%20Ababa!3m2!1d9.0207822!2d38.8033346!5e1!3m2!1sen!2set!4v1648903092714!5m2!1sen!2set" width="400" height="300" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    description: 'around gorgis church',
    capacity: '70',
    onService: 'false',
    pricePerHour: '30',
  },
  {
    id: '678',
    name: 'Bole Branch',
    location:
      'https://www.google.com/maps/embed?pb=!1m21!1m12!1m3!1d811.6924498347947!2d38.78788575260376!3d8.997116344652916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m6!3e0!4m0!4m3!3m2!1d8.997014199999999!2d38.788007199999996!5e1!3m2!1sen!2set!4v1648903281339!5m2!1sen!2set',
    //   '<iframe src="https://www.google.com/maps/embed?pb=!1m21!1m12!1m3!1d811.6924498347947!2d38.78788575260376!3d8.997116344652916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m6!3e0!4m0!4m3!3m2!1d8.997014199999999!2d38.788007199999996!5e1!3m2!1sen!2set!4v1648903281339!5m2!1sen!2set" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    description: 'around gorgis church',
    capacity: '70',
    onService: 'true',
    pricePerHour: '20',
  },
  {
    id: '234',
    name: 'Merkato Branch',
    location:
      'https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d611.7841202018227!2d38.74001916285653!3d9.033686627327128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x164b85fef2f085e1%3A0x88a45f1fe8108b60!2sAddis%20Ketema%2C%20Addis%20Ababa!3m2!1d9.0335592!2d38.7399686!5e1!3m2!1sen!2set!4v1648903408331!5m2!1sen!2set',
    //   '<iframe src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d611.7841202018227!2d38.74001916285653!3d9.033686627327128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x164b85fef2f085e1%3A0x88a45f1fe8108b60!2sAddis%20Ketema%2C%20Addis%20Ababa!3m2!1d9.0335592!2d38.7399686!5e1!3m2!1sen!2set!4v1648903408331!5m2!1sen!2set" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    description: 'around gorgis church',
    capacity: '70',
    onService: 'true',
    pricePerHour: '40',
  },
];
//

export function ShowBranches() {
  return (
    <div>
      <div className="column justify-content-between d-flex">
        <h1 className="pb-4">List Of Branches</h1>
        <Link to="new">
          <Button
            color=""
            bgColor="var(--primary-color)"
            name="Add Admin"
            id="addAdminBtn"
            className="btn px-4"
          />
        </Link>
      </div>
      {branchesList.map((branch) => {
        return (
          <div>
            <div className="container-md cardContainer mb-4 shadow g-o row pt-4 d-flex justify-content-center">
              <div className="column col-5 h-100">
                <div className="container-fluid">
                  <div className="row text-center h3">
                    <span>
                      {' '}
                      <b>{branch.name}</b>{' '}
                    </span>
                  </div>
                  <div className="row"></div>
                  <div className="row ">
                    <span>
                      <b>Id :</b> {branch.id}
                    </span>
                  </div>

                  <div className="row">
                    <p>
                      <b>Description : </b>
                      {branch.description}
                    </p>
                  </div>
                  <div className="row">
                    <span>
                      <b>Capacity : </b>
                      {branch.capacity}
                    </span>
                  </div>
                  <div className="row ">
                    <span>
                      <b>On Service : </b>
                      {branch.onService}{' '}
                    </span>
                  </div>
                  <div className="row">
                    <div className="col-7">
                      <span>
                        <b>Price Per Hour : </b>
                        {branch.pricePerHour}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-7 text-start me-0 ps-0">
                <div className="row">
                  <div className="container mapContainer col-10">
                    <MapCard srcUrl={branch.location} />
                  </div>
                  <div className="col-2 text-start">
                    <span>
                      <Link to="edit">
                        <i
                          className="fa-regular fa-pen-to-square"
                          onclick="editBranch('{branch.name}','{branch.id}','{branch.description}','{branch.capacity}','{branch.onService}','{branch.pricePerHour}','{escape(branch.location)}')"
                        ></i>
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
              <div />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function EditBranch() {
  return <div>EditBranch</div>;
}

export function NewBranch() {
  return <div>NewBranch</div>;
}

export default function DeleteBranch() {
  return <div>DeleteBranch</div>;
}
