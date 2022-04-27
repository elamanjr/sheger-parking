import React from 'react'
import { Link } from 'react-router-dom';
import Button from '../Button';

export function ShowClients({clientList}) {
    return (
        <div className=''>
            <h1 className='pb-2'>List Of Clients</h1>
          <table className="table table-striped">
            <tbody className="">
              <tr>
                <th>Id</th>
                <th>Full Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Default PlateNo.</th>

                <th>Password</th>
                <th>
                  
                </th>
              </tr>
            </tbody>
            <tbody id="tableDataField">
              {clientList.map((item) => {
                return (
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.fullName}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>{item.defaultPlateNumber}</td>

                    <td>{item.password}</td>
                    <td>
                      <Link to="edit">
                        <Button
                          color=""
                          bgColor=""
                          name="Edit"
                          id={item.id}
                          className="btn editBtn"
                        />
                      </Link>
    
                      <Link to="delete">
                        <Button
                          color=""
                          bgColor=""
                          name="Delete"
                          id={item.id}
                          className="btn deleteButton ms-1"
                        />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
}


export function EditClient() {
  return (
    <div>EditClient</div>
  )
}

export function DeleteClient() {
  return (
    <div>DeleteClient</div>
  )
}

