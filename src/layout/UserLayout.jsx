import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import ScrollToTopButton from '../components/ScrollToTopButton'
import ChatbotButton from '../components/ChatbotButton '

const UserLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
      <ScrollToTopButton />
      <ChatbotButton />
    </div>
  )
}

export default UserLayout
