import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { DeleteClient, EditClient, ShowClients } from './clientActions'

var  clientList=[{'id':'345','fullName':'abel tesfaye','phone':'0912935475','email':'abc@gmail.com','password':'********','defaultPlateNumber':'012345'}
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

export default function Clients() {
  return (
    <Routes>
        <Route exact path="/" element={<ShowClients clientList={clientList}/>} />
        <Route path="/edit/" element={<EditClient/>} />
        <Route path="/delete/" element={<DeleteClient/>} />

        
      </Routes>
  )
}
