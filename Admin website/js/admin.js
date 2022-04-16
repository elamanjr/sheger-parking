
           
            displayAdminList=()=>{
                displayWindowHeader("Administrator Users")
                displayWindow.innerHTML+=`

                            <table class="table table-striped">
                        <tbody>
                            <tr>
                                <th>Id</th>
                                <th>Full Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th><button class="btn px-4" id="addAdminBtn">Add Admin</button></th>
                            </tr>
                            <tbody id="tableDataField">
                            </tbody>
                            
                            `
                let tableDataField=document.getElementById('tableDataField');
                adminList.forEach(item=>{

                    tableDataField.innerHTML+=`
            
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.fullName}</td>
                        <td>${item.phone}</td>
                        <td>${item.email}</td>
                        <td>${item.password}</td>
                        <td>
                        <button class="btn editBtn" id="edit${item.id}" onclick="editAdmin('${item.id}','${item.fullName}','${item.phone}','${item.email}','${item.password}')">Edit</button>
                        <button class="btn deleteButton" onclick="deleteAdmin('${item}')">Delete</button>
                        </td>
                    </tr>
                    `       }) 
                        
                displayWindow.innerHTML+=`</tbody></table>`
            
                // console.log(document.getElementById('editBtn'))
            
            
                //the button to add new administrator 
                let addAdminBtn =document.getElementById('addAdminBtn')
                addAdminBtn.onclick=()=>{
            
                    addNewAdminWindowDisplay()
                    //add new admin form ends here -->
                    //add admin form validator starts here
                    addAdminFormValidator();
            
                            }
                        
                        
                    }
            editAdmin=(id,fullName,phone,email,password)=>{
                displayWindow.innerHTML=`
                    
                    <form class="form" id="update-admin-form" action="" method="put">
                    <h1 id="formHeader">Edit Admin</h1>
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
                let saveBtn=document.getElementById('saveBtn')
                saveBtn.onclick=()=>{
                    // adminList.append(form)
                            console.log('hello')
                }
        
                        }
            deleteAdmin=()=>{
                console.log('trying to delete here')
            }
            addAdminFormValidator=()=>{
                var addBtn = document.getElementById("addBtn")
                var password = document.getElementById("password")
                var form = document.getElementById("add-admin-form")

                form.onsubmit=(event)=>{
                    let valid = true;
                // every check you want
                    var confirmPassword = document.getElementById("confirmPassword").value
                    var mainPassword = document.getElementById("password").value
                    var errorDisplay = document.getElementById("errorDisplay")


                    if (mainPassword != confirmPassword){
                    
                        errorDisplay.outerHTML = `<div id="errorDisplay" class="errorMessage">*password doesn't match</div>`
                        valid=false
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    else{

                        errorDisplay.innerText =``


                    }
                    let fields = [firstName,lastName,username,email,password,confirmPassword];

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
            addNewAdminWindowDisplay=()=>{
                displayWindow.innerHTML=`
                    
                    <form class="form" id="add-admin-form" action="" method="post">
					<h1 id="formHeader">New Admin</h1>
					<!-- Input fields -->
					<div class="form-group">
						<label for="fullName">Full Name:</label>
						<input type="text" class="form-control " id="fullName" placeholder="Full Name" name="fullName">
						<div id="fullNameError"></div>
					</div>
					<div class="form-group">
						<label for="phone">Phone:</label>
						<input type="tell" class="form-control tell" id="phone" placeholder="Phone" name="phone">
						<div id="phoneError"></div>
					</div>
					<div class="form-group">
						<label for="email">Email:</label>
						<input type="email" class="form-control email" id="email" placeholder="Email : example@email.com" name="email">
						<div id="emailError"></div>
					</div>

					<div class="form-group">
						<label for="password">Password:</label>
						<input type="password" class="form-control password" id="password" placeholder="Password" name="password">
						<div id="passwordError"></div>
					</div>
					<div class="form-group">
						<label for="confirmPassword" id="confirmPsdd">Confirm Password:</label>
						<input type="password" class="form-control password" id="confirmPassword" placeholder="Confirm Password" name="confirmPassword">
						<div id="confirmPasswordError"></div>
					</div>
					<div id="errorDisplay"></div>
					<br>
					<button class="btn btn-customized buttonWider" id="addBtn" onclick="displayOverviewPage()">Add</button>				
					<!-- End input fields -->
				</form>
                `
            }



         