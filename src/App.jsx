import { Route, Routes } from 'react-router-dom'
import './App.css'
import UserLayout from './layout/UserLayout'
import Home from './pages/User/Home/Home'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CallToActionReview from './pages/User/CallToActionReview'
import { LIST_ROUTE } from './routes'
import RestaurantLayout from './layout/RestaurantLayout'
import HomeRestaurant from './pages/Restaurant/Home'
import Dashboard from './pages/Restaurant/Dashboard';
import Dishes from './pages/Restaurant/Dishes';
import DishDetails from './pages/Restaurant/DishDetails';

function App() {

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          {LIST_ROUTE.map((item)=> 
            <Route path={item.path} element={item.element} />
          )}
        </Route>
        <Route path="/rest" element={<RestaurantLayout />}>
          <Route index element={<HomeRestaurant />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='dishes' element={<Dishes />} />
          <Route path='dishes/:id' element={<DishDetails />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
