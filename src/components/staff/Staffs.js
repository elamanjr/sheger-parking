import React, { Component } from 'react'
import { Route, Routes } from 'react-router-dom'
import { DeleteStaff, EditStaff, NewStaff, ShowStaffs } from './staffActions'


var staffList=[{'id':'345','fullName':'abel tesfaye','phone':'0912935475','email':'abc@gmail.com','password':'********','branch':'piyasa'}
,{'id':'753','fullName':'kirubel tesfaye','phone':'0912935475','email':'abc@gmail.com','password':'********','branch':'megenagna'},{'id':'345','fullName':'tahir tesfaye','phone':'0923935572','email':'abc@gmail.com','password':'********','branch':'piyasa'}
,{'id':'147','fullName':'amele tahir','phone':'0912935475','email':'abc@gmail.com','password':'********','branch':'megenagna'},{'id':'345','fullName':'abel tesfaye','phone':'0923935572','email':'abc@gmail.com','password':'********','branch':'piyasa'}
,{'id':'458','fullName':'tsega tesfaye','phone':'0912935475','email':'abc@gmail.com','password':'********','branch':'megenagna'},{'id':'345','fullName':'behailu tesfaye','phone':'0923935572','email':'abc@gmail.com','password':'********','branch':'piyasa'}
,{'id':'895','fullName':'getachew berihun','phone':'0912935475','email':'abc@gmail.com','password':'********','branch':'megenagna'},{'id':'345','fullName':'rahel tesfaye','phone':'0923935572','email':'abc@gmail.com','password':'********','branch':'piyasa'}
,{'id':'856','fullName':'alemu tesfaye','phone':'0912935475','email':'abc@gmail.com','password':'********','branch':'megenagna'},{'id':'345','fullName':'kerim tesfaye','phone':'0923935572','email':'abc@gmail.com','password':'********','branch':'piyasa'}

]

export default class Staffs extends Component {
  render() {
    return (
      <Routes>
        <Route exact path="/" element={<ShowStaffs staffList={staffList}/>} />
        <Route path="/edit/" element={<EditStaff/>} />
        <Route path="/delete/" element={<DeleteStaff/>} />
        <Route path="/new/" element={<NewStaff/>} />

        
      </Routes>
    )
  }
}
