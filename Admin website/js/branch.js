

            displayBranchesList=()=>{
                displayWindowHeader("Branches")
                displayWindow.innerHTML+=`
                                    <div class="text-start pb-4">
                                    <button class="btn px-4" id="addBranchBtn" onclick="addNewBranchWindowDisplay()">Add Branch</button>
                                    </div>
                                    </h1>

                                    <div class="container-fluid">
                                    <div class="container-fluid ">

                                    <div class="container-md d-flex flex-row
                                     flex-wrap row-cols-2">

                                    `
                branchesList.forEach(branch=>{
                    // <div>${branch.location}</div>                                       

                                    
                displayWindow.innerHTML+=`

                                        <div class="container-md cardContainer mb-4 shadow g-o row pt-4 d-flex justify-content-center">

                                                <div class="column col-7 h-100">
                                                    <div class="container-fluid">
                                                        <div class="row text-center h3">
                                                            <span> <b>${branch.name}</b> </span>
                                                        </div>
                                                        <div class="row">
                                                        </div>
                                                    <div class="row ">
                                                            <span><b>Id :</b> ${branch.id}</span>
                                                        </div>
                                                        
                                                    <div class="row">
                                                            <p><b>Description :  </b>${branch.description}</p>
                                                    </div>
                                                    <div class="row">
                                                            <span><b>Capacity : </b>${branch.capacity}</span>
                                                        </div>
                                                        <div class="row ">
                                                            <span><b>On Service : </b>${branch.onService} </span>
                                                        </div>
                                                    <div class="row">
                                                        <div class="col-7">
                                                            <span><b>Price Per Hour : </b>${branch.pricePerHour}</span>
                                                        </div>
                                                        
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div class="col-4">
                                                    <div class="container">
                                                        ${branch.location}
                                                    </div>
                                                </div>
                                                <div class="col-1 text-end" onclick="editBranch('${branch.name}','${branch.id}','${branch.description}','${branch.capacity}','${branch.onService}','${branch.pricePerHour}','${escape(branch.location)}')">

                      
                                                
                                                
                                                            <span><i class="fa-regular fa-pen-to-square"></i></span>
                                                </div> 

                                                   
                                        </div>
                                    
                                        `;})
                displayWindow.innerHTML+=`
                </div>
                
                `

            //    displayWindow.innerHTML=displayWindow.innerHTML

                
            }

            addNewBranchWindowDisplay=()=>{

                displayWindow.innerHTML=`
                    
                    <form class="form" id="add-admin-form" action="" method="post">
					<h1 id="formHeader">New Branch</h1>
					<!-- Input fields -->
					<div class="form-group">
						<label for="branchName">Branch Name:</label>
						<input type="text" class="form-control " id="branchName" placeholder="Branch Name" name="branchName">
						<div id="branchNameError"></div>
					</div>
					<div class="form-group">
						<label for="capacity">Capacity:</label>
						<input type="text" class="form-control " id="capacity" placeholder="Capacity" name="capacity">
						<div id="capacityError"></div>
					</div>
					<div class="form-group">
						<label for="pricePerHour">Price Per Hour:</label>
						<input type="text" class="form-control" id="pricePerHour" placeholder="Price Per Hour" name="pricePerHour">
						<div id="pricePerHourError"></div>
					</div>

					<div class="form-group">
						<label for="description">Description:</label>
						<textarea type="text" class="form-control" id="description" placeholder="Description" name="description"></textarea>
						<div id="descriptionError"></div>
					</div>
					<div class="form-group">
						<label for="onService" id="onService">On Service: </label>
                        <input type="radio" id="true" value="true" name="onService">
                        <label for="true">Yes</label>
                        <input type="radio" id="false" value="false" name="onService">
                        <label for="false">No</label>
                        <div id="onServiceError"></div>
					</div>
                    <div class="form-group">
						<label for="location">Location:</label>
						<input type="text" class="form-control" id="location" placeholder="Location" name="location">
						<br>
                        <div id="locationGuidance">
                            
                        <span>click the guidance button for a guidance to add location
                        <button class="btn px-4" id="guidanceBtn" onclick="guidanceSpecification()">Guidance</button>

                            
                        </div>
                        <div id="locationError">
                        </div>
					</div>

					<button type="submit" class="btn btn-customized buttonWider" id="addBtn">Add</button>				
					<!-- End input fields -->
				</form>
                `;

                guidanceSpecification=()=>{

                
                let locationGuidance= document.getElementById("locationGuidance")
                locationGuidance.innerHTML = `
                <p> Guidance to insert a location <br>
                                -go to google maps <br>
                                -select the location of the branch as a destination <br>
                                -go to left menu and select share or embed map <br>
                                -select embed map <br>
                                -choose the small size <br>
                                -copy the text and paste it here <br>
                            </p>
                `
                }
            }
            
            editBranch=(name,id,description,capacity,onService,pricePerHour,location)=>{
           
                displayWindow.innerHTML=`
                    
                <form class="form" id="add-admin-form" action="" method="post">
                <h1 id="formHeader">Edit Branch</h1>
                <!-- Input fields -->
                <div class="form-group">
                    <label for="branchName">Branch Name:</label>
                    <input type="text" class="form-control " id="branchName" placeholder="Branch Name" name="branchName" value="${name}">
                    <div id="branchNameError"></div>
                </div>
                <div class="form-group">
                    <label for="capacity">Capacity:</label>
                    <input type="text" class="form-control " id="capacity" placeholder="Capacity" name="capacity" value="${capacity}">
                    <div id="capacityError"></div>
                </div>
                <div class="form-group">
                    <label for="pricePerHour">Price Per Hour:</label>
                    <input type="text" class="form-control" id="pricePerHour" placeholder="Price Per Hour" name="pricePerHour" value="${pricePerHour}">
                    <div id="pricePerHourError"></div>
                </div>

                <div class="form-group">
                    <label for="description">Description:</label>
                    <textarea type="text" class="form-control" id="description" placeholder="Description" name="description" >${description}</textarea>
                    <div id="descriptionError"></div>
                </div>
                `
                if(onService){
                    displayWindow.innerHTML+=`
                <div class="form-group">
                    <label for="onService" id="onService">On Service: </label>
                    <input type="radio" id="true" value="true" name="onService" checked>
                    <label for="true">Yes</label>
                    <input type="radio" id="false" value="false" name="onService">
                    <label for="false">No</label>
                    <div id="onServiceError"></div>
                </div>
                `
                }
                else{
                    displayWindow.innerHTML+=`
                <div class="form-group">
                    <label for="onService" id="onService">On Service: </label>
                    <input type="radio" id="true" value="true" name="onService" >
                    <label for="true">Yes</label>
                    <input type="radio" id="false" value="false" name="onService" checked>
                    <label for="false">No</label>
                    <div id="onServiceError"></div>
                </div>
                `
                }
                
                displayWindow.innerHTML+=`
                <div class="form-group">
                    <label for="location">Location:</label>
                    <input type="text" class="form-control" id="location" placeholder="Location" name="location" value="${location}">
                    <br>
                    <div id="locationGuidance">
                        
                    <span>click the guidance button for a guidance to add location
                    <button class="btn px-4" id="guidanceBtn" onclick="guidanceSpecification()">Guidance</button>

                        
                    </div>
                    <div id="locationError">
                    </div>
                </div>

                <button type="submit" class="btn btn-customized buttonWider" id="addBtn">Add</button>				
                <!-- End input fields -->
            </form>
            `;

            guidanceSpecification=()=>{

            
            let locationGuidance= document.getElementById("locationGuidance")
            locationGuidance.innerHTML = `
            <p> Guidance to insert a location <br>
                            -go to google maps <br>
                            -select the location of the branch as a destination <br>
                            -go to left menu and select share or embed map <br>
                            -select embed map <br>
                            -choose the small size <br>
                            -copy the text and paste it here <br>
                        </p>
            `
            }
            }

