import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Button from '../Button'
import { DeleteAdmin, EditAdmin, ShowAdmins, NewAdmin } from './adminActions'

var adminList=[
  {'id':'345','fullName':'abel tesfaye','phone':'0912935475','email':'abc@gmail.com','password':'********'}
,{'id':'123','fullName':'yanet biruk','phone':'0912935475','email':'abc@gmail.com','password':'********'}
,{'id':'123','fullName':'girma alem','phone':'0912935475','email':'abc@gmail.com','password':'********'}
,{'id':'123','fullName':'robel tesfaye','phone':'0912935475','email':'abc@gmail.com','password':'********'}
,{'id':'123','fullName':'girum abebe','phone':'0912935475','email':'abc@gmail.com','password':'********'}

]

export default function Admins() {
  
  return (
    <Routes>
        <Route exact path="/" element={<ShowAdmins adminList={adminList}/>} />
        <Route path="/edit/" element={<EditAdmin/>} />
        <Route path="/delete/" element={<DeleteAdmin/>} />
        <Route path="/new/" element={<NewAdmin/>} />

        
      </Routes>
        )
}

