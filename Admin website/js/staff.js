
            displayStaffList=()=>{
                displayWindowHeader("Staff Users")
                displayWindow.innerHTML+=`
            <table class="table table-striped justify-content-center">
            <tbody>
                <tr>
                    <th>Id</th>
                    <th>Full Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Branch</th>
                    <th><button class="btn px-4" id="addStaffBtn">Add Staff</button></th>
                </tr>
                <tbody id="tableDataField">
                </tbody>
                
                `
            let tableDataField=document.getElementById('tableDataField')
            staffList.forEach(item=>{
                tableDataField.innerHTML+=`
                                                <tr>
                                                    <td>`+item.id+`</td>
                                                    <td>`+item.fullName+`</td>
                                                    <td>`+item.phone+`</td>
                                                    <td>`+item.email+`</td>
                                                    <td>`+item.password+`</td>
                                                    <td>`+item.branch+`</td>
                                                    <td>
                                                    <button class="btn editBtn" id="edit${item.id}" onclick="editStaff('${item.id}','${item.fullName}','${item.phone}','${item.email}','${item.password}','${item.branch}')">Edit</button>
                                                    <button class="btn deleteButton" onclick="deleteStaff('${item}')">Delete</button>
                                                    </td>                                                </tr>
                                                `
                })
                displayWindow.innerHTML+=`</tbody></table>`
                
                let addStaffBtn =document.getElementById('addStaffBtn')
                //the button to add new staff 
                addStaffBtn.onclick=()=>{

                    addNewAdminWindowDisplay()
                    //configuring add admin window to look add staff window
                    var formHeader = document.getElementById('formHeader')
                    formHeader.innerText=`New Staff`

                    var changeFormName = document.getElementById('add-admin-form')
                    changeFormName.id='add-staff-form'

                    var errorDisplay = document.getElementById('errorDisplay')
                    errorDisplay.outerHTML += `
                    <div class="form-group">
						<label for="branch">Branch:</label>
						<input type="text" class="form-control " id="branch" placeholder="Branch" name="branch">
						<div id="branchError"></div>
					</div>
                    `
                    //add new Staff form ends here -->
                    //add Staff form validator starts here
                    addStaffFormValidator()
                            }
            
            }
            editStaff=(id,fullName,phone,email,password,branch)=>{
                displayWindow.innerHTML=`
                    
                    <form class="form" id="update-admin-form" action="" method="put">
                    <h1 id="formHeader">Edit Staff</h1>
                    <!-- Input fields -->
                    <div class="form-group">
                        <label for="fullName">Full Name:</label>
                        <input type="text" class="form-control " id="fullName" placeholder="Full Name" name="fullName" value="${fullName}">
                        <div id="fullNameError"></div>
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone:</label>
                        <input type="tell" class="form-control tell" id="phone" placeholder="Phone" name="phone" value="${phone}">
                        <div id="phoneError"></div>
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" class="form-control email" id="email" placeholder="Email : example@email.com" name="email" value="${email}">
                        <div id="emailError"></div>
                    </div>
                    <div class="form-group">
                        <label for="branchName">Branch Name:</label>
                        <input type="text" class="form-control " id="branchName" placeholder="Branch Name" name="branchName" value="${branch}">
                        <div id="branchError"></div>
                    </div>
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input type="password" class="form-control password" id="password" placeholder="Password" name="password" value="${password}">
                        <div id="passwordError"></div>
                    </div>
                    <div class="form-group">
                        <label for="confirmPassword" id="confirmPsdd">Confirm Password:</label>
                        <input type="password" class="form-control password" id="confirmPassword" placeholder="Confirm Password" name="confirmPassword" value="${password}">
                        <div id="confirmPasswordError"></div>
                    </div>


                    <div id="errorDisplay"></div>
                    <br>
                    <button type="submit" class="btn btn-customized buttonWider" id="saveBtn">Save</button>				
                    <!-- End input fields -->
                </form>
                `
              
        
                        }
            addStaffFormValidator=()=>{

                var addBtn = document.getElementById("addBtn")
                var password = document.getElementById("password")
                var form = document.getElementById("add-staff-form")

            form.onsubmit=(event)=>{
                let valid = true;
            // every check you went
                var psdd1 = document.getElementById("confirmPassword").value
                var psdd2 = document.getElementById("password").value
                var errorDisplay = document.getElementById("errorDisplay")


                if (psdd1 != psdd2){
                
                    errorDisplay.outerHTML = `<div id="errorDisplay" class="errorMessage">*password doesn't match</div>`
                    valid=false
                    event.preventDefault();
                    event.stopPropagation();
                }
                else{

                    errorDisplay.innerText =``


                }
                let fields = [fullName,phone,email,password,confirmPassword,branch];

                fields.forEach (key=>{
                key=key.id
                        if(form[key].value.trim().length==0){

                        document.getElementById(key+"Error").outerHTML = `<div id="`+key+`Error" class="errorMessage">*this field can't be empty</div>`
                        event.preventDefault();
                        event.stopPropagation();
                    }
                        else{
                            document.getElementById(key+"Error").innerHTML=``
                        }

                    })

            }
            }
