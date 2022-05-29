import { type } from '@testing-library/user-event/dist/type';
import React, { useEffect, useState } from 'react';

export default function PageHeading({
  onclick,
  userType,
  data,
  fullData,
  setter,
  elementType
}) {
  // var searchBy ="id"
  var [searchBy, setSearchBy] = useState('id');
  var [sortBy, setSortBy] = useState('id');
  var [sorted, setSorted] = useState([]);
  var [tempData, setTempData] = useState([]);

  var tempdata = []

  data.forEach(element => {
    tempdata.push(element)
});

  function Search(searchWord) {
    // alert(searchWord)
    // setter([])
    let result = [];
    fullData.forEach((singleData) => {
      // console.log((singleData.fullName.toLowerCase()).includes(searchWord.toLowerCase()))
      if (
        singleData[searchBy].toLowerCase().includes(searchWord.toLowerCase())
      ) {
        // console.log(singleData)
        result.push(singleData);
      }
    });
    // console.log(result)
    setter(result);
  }

  useEffect(() => {
    setSorted(tempdata.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1)));
    console.log(sorted)
    setter([]);
  }, [sortBy]);

  useEffect(() => {
    setter(sorted);
    // console.log(data)
  }, [sorted]);

//     useEffect(() => {
    //   alert('changed');
// console.log(data)
//     }, [data]);
  return (
    <div className="row mb-2">
      <h1 className="col-5 ">List Of {userType} </h1>
      <div id="searchSortBox" className="col-7 text-center ps-0">
        <div className="row align-items-center ">
          <div id="searchBorderBox" className="col-12 border px-0 align-middle">
            <div className="row ">
              <div className="col-8">
                <div className="row">
                  <div className="col-6   me-0 ">
                    <label for="searchBy" className="fs-6">
                      search by:
                    </label>
                    <select
                      onChange={(event) => setSearchBy(event.target.value)}
                      name="searchBy"
                      id="searchBy"
                      className="rounded"
                    >
                    {elementType.map((type) => {
                        return <option value={type.value}>{type.name}</option>
    
                        
                    })}
                    </select>
                  </div>
                  <div className="col-6 ps-0 ms-0">
                    <div className="row align-middle">
                      <div className="col-10 px-0 ">
                        <input
                          onChange={(event) => Search(event.target.value)}
                          className="w-100 border-0 rounded px-2 align-middle"
                          type="text"
                          name="searchText"
                          id="searchText"
                        />
                      </div>
                      <div className="col-2">
                        <i
                          className="fa-solid fa-magnifying-glass align-middle"
                          onClick={onclick}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="sortBox" className="col-4 ">
                <label for="sortBy" className="fs-6">
                  sort by:
                </label>
                <select
                  onChange={(event) => {
                    setSortBy(event.target.value);

                    // alert(sortBy)
                  }}
                  name="sortBy"
                  id="sortBy"
                  className="rounded"
                >{elementType.map((type) => {
                    return <option value={type.value}>{type.name}</option>

                    
                })}
                  
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
