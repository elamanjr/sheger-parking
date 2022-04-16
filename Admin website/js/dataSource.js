let adminList=[{'id':'345','fullName':'abel tesfaye','phone':'0912935475','email':'abc@gmail.com','password':'********'}
,{'id':'123','fullName':'yanet biruk','phone':'0912935475','email':'abc@gmail.com','password':'********'}
,{'id':'123','fullName':'girma alem','phone':'0912935475','email':'abc@gmail.com','password':'********'}
,{'id':'123','fullName':'robel tesfaye','phone':'0912935475','email':'abc@gmail.com','password':'********'}
,{'id':'123','fullName':'girum abebe','phone':'0912935475','email':'abc@gmail.com','password':'********'}

]


let staffList=[{'id':'345','fullName':'abel tesfaye','phone':'0912935475','email':'abc@gmail.com','password':'********','branch':'piyasa'}
,{'id':'753','fullName':'kirubel tesfaye','phone':'0912935475','email':'abc@gmail.com','password':'********','branch':'megenagna'},{'id':'345','fullName':'tahir tesfaye','phone':'0923935572','email':'abc@gmail.com','password':'********','branch':'piyasa'}
,{'id':'147','fullName':'amele tahir','phone':'0912935475','email':'abc@gmail.com','password':'********','branch':'megenagna'},{'id':'345','fullName':'abel tesfaye','phone':'0923935572','email':'abc@gmail.com','password':'********','branch':'piyasa'}
,{'id':'458','fullName':'tsega tesfaye','phone':'0912935475','email':'abc@gmail.com','password':'********','branch':'megenagna'},{'id':'345','fullName':'behailu tesfaye','phone':'0923935572','email':'abc@gmail.com','password':'********','branch':'piyasa'}
,{'id':'895','fullName':'getachew berihun','phone':'0912935475','email':'abc@gmail.com','password':'********','branch':'megenagna'},{'id':'345','fullName':'rahel tesfaye','phone':'0923935572','email':'abc@gmail.com','password':'********','branch':'piyasa'}
,{'id':'856','fullName':'alemu tesfaye','phone':'0912935475','email':'abc@gmail.com','password':'********','branch':'megenagna'},{'id':'345','fullName':'kerim tesfaye','phone':'0923935572','email':'abc@gmail.com','password':'********','branch':'piyasa'}

]

let clientList=[{'id':'345','fullName':'abel tesfaye','phone':'0912935475','email':'abc@gmail.com','password':'********','defaultPlateNumber':'012345'}
,{'id':'123','fullName':'ermiyas tesfaye','phone':'0912935475','email':'abc@gmail.com','password':'********','defaultPlateNumber':'012345'}
,{'id':'456','fullName':'tsega tesfaye','phone':'0912935475','email':'abc@gmail.com','password':'********','defaultPlateNumber':'012345'}
,{'id':'789','fullName':'baalcha alemu','phone':'0912935475','email':'abc@gmail.com','password':'********','defaultPlateNumber':'012345'}
,{'id':'852','fullName':'girum tamene','phone':'0912935475','email':'abc@gmail.com','password':'********','defaultPlateNumber':'012345'}
,{'id':'741','fullName':'tirusew tesfaye','phone':'0912935475','email':'abc@gmail.com','password':'********','defaultPlateNumber':'012345'}
,{'id':'145','fullName':'sahim tesfaye','phone':'0912935475','email':'abc@gmail.com','password':'********','defaultPlateNumber':'012345'}
,{'id':'365','fullName':'kerim tesfaye','phone':'0912935475','email':'abc@gmail.com','password':'********','defaultPlateNumber':'012345'}
,{'id':'254','fullName':'abdu tesfaye','phone':'0912935475','email':'abc@gmail.com','password':'********','defaultPlateNumber':'012345'}
,{'id':'987','fullName':'tirusew tesfaye','phone':'0912935475','email':'abc@gmail.com','password':'********','defaultPlateNumber':'012345'}
,{'id':'963','fullName':'kidus tesfaye','phone':'0912935475','email':'abc@gmail.com','password':'********','defaultPlateNumber':'012345'}
,{'id':'856','fullName':'berhe tesfaye','phone':'0912935475','email':'abc@gmail.com','password':'********','defaultPlateNumber':'012345'}
,{'id':'789','fullName':'tariku tesfaye','phone':'0912935475','email':'abc@gmail.com','password':'********','defaultPlateNumber':'012345'}

]

let branchesList=[
    {'id':'123','name':'Piyasa Gorgis Branch','location':'<iframe src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d545.6957051723684!2d38.755200717403596!3d9.037417570403298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e0!4m0!4m5!1s0x164b8f5efcffebd3%3A0xda821c73ef928f93!2sPiazza%2C%20Addis%20Ababa!3m2!1d9.0371838!2d38.7551432!5e1!3m2!1sen!2set!4v1648904269210!5m2!1sen!2set" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>','description':'around gorgis church','capacity':'70','onService':'true','pricePerHour':'20'},
    {'id':'345','name':'Megenagna Branch','location':'<iframe src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d1386.6564425810773!2d38.803164073067805!3d9.020940043123018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x164b85de7ac53005%3A0x2f76f90a2fb95d7f!2sTsige%20Worku%20W%2FGebriel%20Authorized%20Accounting%20Firm%2C%20Addis%20Ababa!3m2!1d9.0207822!2d38.8033346!5e1!3m2!1sen!2set!4v1648903092714!5m2!1sen!2set" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>','description':'around gorgis church','capacity':'70','onService':'false','pricePerHour':'30'},
    {'id':'678','name':'Bole Branch','location':'<iframe src="https://www.google.com/maps/embed?pb=!1m21!1m12!1m3!1d811.6924498347947!2d38.78788575260376!3d8.997116344652916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m6!3e0!4m0!4m3!3m2!1d8.997014199999999!2d38.788007199999996!5e1!3m2!1sen!2set!4v1648903281339!5m2!1sen!2set" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>','description':'around gorgis church','capacity':'70','onService':'true','pricePerHour':'20'},
    {'id':'234','name':'Merkato Branch','location':'<iframe src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d611.7841202018227!2d38.74001916285653!3d9.033686627327128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x164b85fef2f085e1%3A0x88a45f1fe8108b60!2sAddis%20Ketema%2C%20Addis%20Ababa!3m2!1d9.0335592!2d38.7399686!5e1!3m2!1sen!2set!4v1648903408331!5m2!1sen!2set" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>','description':'around gorgis church','capacity':'70','onService':'true','pricePerHour':'40'},

]







































// displayWindow.innerHTML=`
// hi

// `;
// branchesList.forEach(branch=>{


// displayWindow.innerHTML=`

// <div class="row row-cols-1 row-cols-md-2 g-4">
//   <div class="col">
//     <div class="card">
//       <div class="card-body">
//         <h5 class="card-title">Card title</h5>
//         <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
//       </div>
//     </div>
//   </div>
//   <div class="col">
//     <div class="card">
//       <div class="card-body">
//         <h5 class="card-title">Card title</h5>
//         <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
//       </div>
//     </div>
//   </div>
//   <div class="col">
//     <div class="card">
//       <div class="card-body">
//         <h5 class="card-title">Card title</h5>
//         <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
//       </div>
//     </div>
//   </div>
//   <div class="col">
//     <div class="card">
//       <div class="card-body">
//         <h5 class="card-title">Card title</h5>
//         <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
//       </div>
//     </div>
//   </div>
// </div>







//                                     <h1></h1>
//                                     <h1>List Of Branches</h1>

//                                     <div class="row d-flex justify-content-evenly mt-5 ms-5">

//                                         <div class="container cardContainer mb-lg-4 shadow col-4 px-4">
//                                             <div class="row ">
//                                                 <div class="col-7">
//                                                     <header>Id: ${branchesList[0].id}</header>
//                                                 </div>
//                                                 <div class="col-4">
//                                                     <header> ${branchesList[0].name} </header>
//                                                 </div>
//                                                 <div class="col-1">
//                                                     <header><i class="fa-regular fa-pen-to-square"></i></header>
//                                                 </div>
                                                
//                                             </div>
//                                             <div class="row">
//                                                 <div class="col-12">
//                                                     <p>Description:<br> ${branchesList[0].description}</p>
//                                                 </div>
//                                             </div>
//                                             <div class="row">
//                                                 <div class="col-7">
//                                                     <header>Capacity : ${branchesList[0].capacity}</header>
//                                                 </div>
//                                                 <div class="col-5 ">
//                                                     <header>On Service : ${branchesList[0].onService} </header>
//                                                 </div>
//                                             </div>
//                                             <div class="row">
//                                                 <div class="col-7">
//                                                     <header>Price Per Hour : ${branchesList[0].pricePerHour}</header>
//                                                 </div>
//                                                 <div class="col-5 ">
//                                                     <a href="" class="branchEditButton" onclick="openMap('')"><header>See On Map<i class="fa-solid fa-location-dot h3 ms-3"></i></header></a>
//                                                 </div>
//                                                 <div id="${branchesList[0].id}"></div> 
//                                                 <div>${branchesList[0].location}</div>                                       
//                                             </div>
//                                         </div>
                                    
//                                         <div class="container cardContainer mb-4 shadow col-4 ms-5 px-4">
//                                             <div class="row ">
//                                                 <div class="col-7">
//                                                     <header>Id: ${branchesList[1].id}</header>
//                                                 </div>
//                                                 <div class="col-4">
//                                                     <header> ${branchesList[1].name} </header>
//                                                 </div>
//                                                 <div class="col-1">
//                                                     <header><i class="fa-regular fa-pen-to-square"></i></header>
//                                                 </div>
                                                
//                                             </div>
//                                             <div class="row">
//                                                 <div class="col-12">
//                                                     <p>Description:<br> ${branchesList[1].description}</p>
//                                                 </div>
//                                             </div>
//                                             <div class="row">
//                                                 <div class="col-7">
//                                                     <header>Capacity : ${branchesList[1].capacity}</header>
//                                                 </div>
//                                                 <div class="col-5 ">
//                                                     <header>On Service : ${branchesList[1].onService} </header>
//                                                 </div>
//                                             </div>
//                                             <div class="row">
//                                                 <div class="col-7">
//                                                     <header>Price Per Hour : ${branchesList[1].pricePerHour}</header>
//                                                 </div>
//                                                 <div class="col-5 ">
//                                                     <a href="" class="branchEditButton" onclick="openMap('')"><header>See On Map<i class="fa-solid fa-location-dot h3 ms-3"></i></header></a>
//                                                 </div>
//                                                 <div id="${branchesList[1].id}"></div> 
//                                                 <div>${branchesList[1].location}</div>                                       
//                                             </div>
//                                         </div>
//                                     </div>


//                                     <div class="row d-flex justify-content-evenly mt-5 ms-5  justify-content-between">


//                                         <div class="container cardContainer mb-4 shadow col-4 px-4 align-self-end">
//                                             <div class="row ">
//                                                 <div class="col-7">
//                                                     <header>Id: ${branchesList[2].id}</header>
//                                                 </div>
//                                                 <div class="col-4">
//                                                     <header> ${branchesList[2].name} </header>
//                                                 </div>
//                                                 <div class="col-1">
//                                                     <header><i class="fa-regular fa-pen-to-square"></i></header>
//                                                 </div>
                                                
//                                             </div>
//                                             <div class="row">
//                                                 <div class="col-12">
//                                                     <p>Description:<br> ${branchesList[2].description}</p>
//                                                 </div>
//                                             </div>
//                                             <div class="row">
//                                                 <div class="col-7">
//                                                     <header>Capacity : ${branchesList[2].capacity}</header>
//                                                 </div>
//                                                 <div class="col-5 ">
//                                                     <header>On Service : ${branchesList[2].onService} </header>
//                                                 </div>
//                                             </div>
//                                             <div class="row">
//                                                 <div class="col-7">
//                                                     <header>Price Per Hour : ${branchesList[2].pricePerHour}</header>
//                                                 </div>
//                                                 <div class="col-5 ">
//                                                     <a href="" class="branchEditButton" onclick="openMap('')"><header>See On Map<i class="fa-solid fa-location-dot h3 ms-3"></i></header></a>
//                                                 </div>
//                                                 <div id="${branchesList[2].id}"></div> 
//                                                 <div>${branchesList[2].location}</div>                                       
//                                             </div>
//                                         </div>

//                                         <div class="container cardContainer mb-4 shadow col-4 ms-5 px-4">
//                                             <div class="row ">
//                                                 <div class="col-7">
//                                                     <header>Id: ${branchesList[3].id}</header>
//                                                 </div>
//                                                 <div class="col-4">
//                                                     <header> ${branchesList[3].name} </header>
//                                                 </div>
//                                                 <div class="col-1">
//                                                     <header><i class="fa-regular fa-pen-to-square"></i></header>
//                                                 </div>
                                                
//                                             </div>
//                                             <div class="row">
//                                                 <div class="col-12">
//                                                     <p>Description:<br> ${branchesList[3].description}</p>
//                                                 </div>
//                                             </div>
//                                             <div class="row">
//                                                 <div class="col-7">
//                                                     <header>Capacity : ${branchesList[3].capacity}</header>
//                                                 </div>
//                                                 <div class="col-5 ">
//                                                     <header>On Service : ${branchesList[3].onService} </header>
//                                                 </div>
//                                             </div>
//                                             <div class="row">
//                                                 <div class="col-7">
//                                                     <header>Price Per Hour : ${branchesList[3].pricePerHour}</header>
//                                                 </div>
//                                                 <div class="col-5 ">
//                                                     <a href="" class="branchEditButton" onclick="openMap('')"><header>See On Map<i class="fa-solid fa-location-dot h3 ms-3"></i></header></a>
//                                                 </div>
//                                                 <div id="${branchesList[3].id}"></div> 
//                                                 <div>${branchesList[3].location}</div>                                       
//                                             </div>
//                                         </div>
//                                     </div>

//                                     </div>
//                                         `}
                                        // )
                                        // displayWindow.innerHTML+=``
                                        // event.preventDefault();
                        
                                       
                        
                                        
                                    ;
                                // }