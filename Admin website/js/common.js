
   displayWindowHeader=(userType)=>{
        displayWindow.innerHTML =
            `
            <div class="row mb-2">
                <h1 class="col-6 ">List Of ${userType} </h1>
                <div id="searchSortBox" class="col-6 text-center ps-0">
                    <div class="row align-items-center ">
                        <div id="searchBorderBox" class="col-12 border px-0 align-middle">
                            <div class="row ">
                                <div class="col-9">
                                    <div class="row">
                                        <div class="col-5   me-0 ">
                                            <label for="searchBy" class="fs-5">search by:</label>
                                            <select name="searchBy" id="searchBy" class="rounded">
                                                <option value="id">Id</option>
                                                <option value="id">Name</option>
                                                <option value="id">Phone</option>
                                                <option value="id">Email</option>
                                            </select>
                                        </div>
                                        <div class="col-7 ps-0 ms-0">
                                            <div class="row align-middle">
                        
                                                <div class="col-10 px-0 ">
                                                    <input class="w-100 border-0 rounded px-2 align-middle" type="text" name="searchText" id="searchText">
                                                </div>                                               
                                                <div class="col-2">
                                                    <i class="fa-solid fa-magnifying-glass align-middle"></i>
                                                </div>  
                                            </div>  

                                        </div>
                                    </div>
                                </div>
                                <div id="sortBox" class="col-3 ">
                                    <label for="sortBy" class="fs-5">sort by:</label>
                                    <select name="sortBy" id="sortBy" class="rounded">
                                        <option value="id">Id</option>
                                        <option value="id">Name</option>
                                        <option value="id">Phone</option>
                                        <option value="id">Email</option>
                                    </select>
                                </div> 

                            </div>
                        </div>
                        
                    </div>


                </div>
        </div>
            `
    }