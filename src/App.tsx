import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Screens/Home'
import SqlMatching from './Screens/SqlMatching'
import HamiltongDistanceMatching from './Screens/HamiltongDistanceMatching'
import VoyageurProfile from './Screens/VoyageurProfile'
import VoyageurList from './Screens/VoyageurList'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SqlMatching" element={<SqlMatching />} />
        <Route path="/voyageur-profile/:id" element={<VoyageurProfile />} />
        <Route path="/voyageur-List" element={<VoyageurList />} />
        <Route path="/HamiltongDistanceMatching" element={<HamiltongDistanceMatching />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
