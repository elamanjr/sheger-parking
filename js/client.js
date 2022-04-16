
            
    displayClientList=()=>{
        displayWindowHeader("Client Users")
        displayWindow.innerHTML+=`
    <table class="table table-striped">
    <tbody>
        <tr>
            <th>Id</th>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Password</th>
            <th>Default Plate Number</th>
            <th></th>
        </tr>
        <tbody id="tableDataField">
        </tbody>
        
        `
    let tableDataField=document.getElementById('tableDataField')
    clientList.forEach(item=>{
        console.log(item)
        tableDataField.innerHTML+=`

        <tr>
            <td>`+item.id+`</td>
            <td>`+item.fullName+`</td>
            <td>`+item.phone+`</td>
            <td>`+item.email+`</td>
            <td>`+item.password+`</td>
            <td>`+item.defaultPlateNumber+`</td>
            <td>
            <button class="btn editBtn" id="edit${item.id}" onclick="editClient('${item.id}','${item.fullName}','${item.phone}','${item.email}','${item.password},'${item.defaultPlateNumber}')">Edit</button>
            <button class="btn deleteButton" onclick="deleteClient('${item.id}')">Delete</button>
            </td>
            </tr>
        `
        })

        displayWindow.innerHTML+=`</tbody></table>`

        
                    console.log('hello')             

                    
    
    }
    editClient=(id,fullName,phone,email,password,defaultPlateNumber)=>{
        console.log('wef')
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

            <div class="form-group">
                <label for="defaultPlateNumber" id="defaultPlateNumber">Default Plate Number:</label>
                <input type="text" class="form-control " id="defaultPlateNumber" placeholder="Default Plate Number" name="defaultPlateNumber" value="${defaultPlateNumber}">
                <div id="defaultPlateNumberError"></div>
            </div>


            <br>
            <button type="submit" class="btn btn-customized buttonWider" id="saveBtn">Save</button>				
            <!-- End input fields -->
        </form>
        `
        event.preventDefault()
        

                }
            

