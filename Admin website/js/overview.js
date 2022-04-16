
            displayOverviewPage=()=>{
                userBtn.style.fontWeight='normal'
                var userSubdiv=document.getElementById('userSubdiv')
                userSubdiv.innerHTML=``
                branchesBtn.style.fontWeight='normal'
                displayWindow.innerHTML=`
                
                        <div class="content align-middle">
                            <div class="col-12 ">
                                <h1 class="">Overview</h1>
                                <div class="well col-12 shadow ">
                                    <h4 class="ms-2">Sheger Parking</h4>
                                    <p class="ms-2">15 reservations served daily on average</p>
                                </div>
                                <div class="row wellContainerBox">
                                    <div class="col-sm-3 wellContainer container-fluid">
                                        <div class="well shadow">
                                            <h4 class="ms-2">Total Clients</h4>
                                            <p class="ms-2">50 </p> 
                                        </div>
                                    </div>
                                    <div class="col-sm-3 wellContainer">
                                        <div class="well shadow">
                                            <h4 class="ms-2">Total Staff</h4>
                                            <p class="ms-2">10 </p> 
                                        </div>
                                    </div>
                                    <div class="col-sm-3 wellContainer ">
                                        <div class="well shadow">
                                            <h4 class="ms-2">Bran<wbr>ches</h4>
                                            <p class="ms-2">3</p> 
                                        </div>
                                        
                                    </div>
                                    <div class="col-sm-3 wellContainer container-fluid">
                                        <div class="well shadow">
                                            <h4 class="word ms-2">Total Reserv<wbr>ations</h4>
                                            <p class="ms-2">276</p> 
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-4 wellContainer">
                                        <div class="well shadow">
                                            <p class="h5 ms-2">First Day Of Launch</p> 
                                            <p class="ms-2">19/02/2015</p> 
                                        </div>
                                    </div>
                                    <div class="col-sm-4 wellContainer">
                                        <div class="well shadow">
                                        <p class="h5 ms-2">Today's Reservation</p> 
                                        <p class="ms-2">19</p> 
                                        </div>
                                    </div>
                                        <div class="col-sm-4 wellContainer">
                                            <div class="well shadow">
                                                <p class="h5 ms-2">Days On Service</p> 
                                                <p class="ms-2">20</p> 
                                            </div>
                                    </div>
                                </div>
                                    <div class="row">
                                        <div class="col-sm-12 wellContainer">
                                            <div class="well shadow">
                                            <p class="h6 ms-2">Software Maintenance Technicians</p>
                                            <p class="ms-2">+251911607080</p> 
 
                                            </div>
                                        </div>
                                    
                                </div>
                            </div>
                        </div>
                `
                
            }