import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DeleteBranch, { EditBranch, NewBranch, ShowBranches } from './branchActions'

export default function Branches() {
  return (
    
    <Routes>
        <Route exact path="/" element={<ShowBranches/> } />
        <Route path="/edit/" element={<EditBranch/>} />
        <Route path="/delete/" element={<DeleteBranch/>} />
        <Route path="/new/" element={<NewBranch/>} />


        
      </Routes>
  )
}
