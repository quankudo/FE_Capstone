import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import ScrollToTopButton from '../components/ScrollToTopButton'

const UserLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
      <ScrollToTopButton />
    </div>
  )
}

export default UserLayout
