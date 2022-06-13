import { type } from '@testing-library/user-event/dist/type';
import React, { useEffect, useState } from 'react';

export default function PageHeading({
  onclick,
  userType,
  data,
  fullData,
  setter,
  elementType,
}) {
  // var searchBy ="id"
  var [searchBy, setSearchBy] = useState('id');
  var [sortBy, setSortBy] = useState('id');
  var [sorted, setSorted] = useState([]);
  var [tempData, setTempData] = useState([]);

  var tempdata = [];

  data.forEach((element) => {
    tempdata.push(element);
  });

  function Search(searchWord) {
    // alert(searchWord)
    // setter([])
    let result = [];
    fullData.forEach((singleData) => {

      if (
        singleData[searchBy].toLowerCase().includes(searchWord.toLowerCase())
      ) {
        
        result.push(singleData);
      }
    });
    setter(result);
  }

  useEffect(() => {
    setSorted(tempdata.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1)));
    setter([]);
  }, [sortBy]);

  useEffect(() => {
    setter(sorted);
  }, [sorted]);
return (
    <div className="column mb-2">
      <h1 className="row ">List Of {userType} </h1>
      <div className="row">
        <div className="col"></div>
        <div
          id="searchSortBox"
          className="col-md-auto text-center ps-0 float-right"
        >
          <div className="row align-items-center ">
            <div
              id="searchBorderBox"
              className="col-12 border px-0 align-middle"
            >
              <div className="row ">
                <div className="col-6">
                  <div className="row px-2">
                    <i
                      className="fa-solid fa-magnifying-glass align-middle col-2 mt-1 "
                      onClick={onclick}
                    ></i>
                    <input
                      onChange={(event) => Search(event.target.value)}
                      className="w-100 border-0 rounded align-middle col"
                      type="text"
                      name="searchText"
                      id="searchText"
                    />
                  </div>
                </div>
                <div className="col-2 ps-0 ms-0">
                  <select
                    onChange={(event) => setSearchBy(event.target.value)}
                    name="searchBy"
                    id="searchBy"
                    className="rounded pb-1"
                  >
                    {elementType.map((type) => {
                      return <option value={type.value}>{type.name}</option>;
                    })}
                  </select>
                </div>

                <div id="sortBox" className="col-3 ">
                  <div className="row">
                    <label for="sortBy" className="fs-6 col-2 me-2">
                      <i class="fa-solid fa-arrow-down-short-wide "></i>
                    </label>

                    <select
                      onChange={(event) => {
                        setSortBy(event.target.value);

                        // alert(sortBy)
                      }}
                      name="sortBy"
                      id="sortBy"
                      className="rounded col"
                    >
                      {elementType.map((type) => {
                        return <option value={type.value}>{type.name}</option>;
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
