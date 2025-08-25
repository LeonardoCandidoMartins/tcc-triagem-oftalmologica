import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../src/pages/HomePage'
import OtherPage from '../src/pages/OtherPage'
import NotFoundPage from '../src/pages/NotFoundPage'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/other-page' element={<OtherPage />} />
        <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRoutes