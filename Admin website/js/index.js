function include(file) {

    var script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.defer = true;
    
    document.getElementsByTagName('head').item(0).appendChild(script);
    
    }
    
/* Include js files */
include('/js/dataSource.js');
include('/js/admin.js')
include('/js/client.js')
include('/js/overview.js')
include('/js/staff.js')
include('/js/branch.js')
include('/js/login.js')
include('/js/common.js')



onload=()=>{
    // displayAdminList()
    displayOverviewPage()
    // displayLoginPage()

    }
    
// variables

var viewPort=document.getElementById('userSubdiv') 
var userBtn=document.getElementById('userBtn')
var branchesBtn=document.getElementById('branchesBtn')
var userBtnClicked=false
var displayWindow=document.getElementById('displayWindow')

// variables




// user button starts here
userBtn.addEventListener('click',users=(event)=>{
    
    if (userBtnClicked==false){
        userBtn.style.fontWeight='bold'
        branchesBtn.style.fontWeight='normal'
        viewPort.innerHTML = `
    <ul>
    <li class="clickable" id="adminBtn">Admins</li>
    <li class="clickable" id="staffBtn">Staffs</li>
    <li class="clickable" id="clientBtn">Clients</li>
    </ul>
    `
    userBtnClicked=true
    }
    else{
        viewPort.innerHTML = ``
        userBtnClicked=false
    }
    
    //admin button inside user button starts here
    var adminBtn = document.getElementById('adminBtn')
    adminBtn.onclick=()=>{
            staffBtn.style.fontWeight='normal'
            clientBtn.style.fontWeight='normal'
            adminBtn.style.fontWeight='bold'

            displayAdminList()                
                }
    //admin button inside user button ends here


    var staffBtn = document.getElementById('staffBtn')
    staffBtn.onclick=()=>{
            adminBtn.style.fontWeight='normal'
            clientBtn.style.fontWeight='normal'
            staffBtn.style.fontWeight='bold'

            displayStaffList()
            
        
    }

    var clientBtn = document.getElementById('clientBtn')
    clientBtn.onclick=()=>{
            staffBtn.style.fontWeight='normal'
            adminBtn.style.fontWeight='normal'
            clientBtn.style.fontWeight='bold'
            displayClientList()
        
    }


                

                event.preventDefault()
                }) 
//user button ends here
var overviewBtn =document.getElementById('overviewBtn')
overviewBtn.addEventListener('click',(event)=>{
    
    event.preventDefault()

        displayOverviewPage()

})


branchesBtn.addEventListener('click',(event)=>{
    userBtn.style.fontWeight='normal'
    branchesBtn.style.fontWeight='bold'
    userBtnClicked=false
    viewPort.innerHTML = ``
    event.preventDefault()
    displayBranchesList()
    
})

var logoutBtn=document.getElementById('logoutBtn')
logoutBtn.onclick=()=>{
    alert('Do you want to logout')
    location.replace("../index.html")
}