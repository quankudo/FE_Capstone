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
import Dashboard from './pages/Restaurant/Dashboard/Dashboard';
import AdminDashboard from './pages/Admin/Dashboard';
import Dishes from './pages/Restaurant/Dishes';
import DishDetails from './pages/Restaurant/DishDetails';
import Reviews from './pages/Restaurant/Reviews';
import Events from './pages/Restaurant/Events';
import AdminLayout from './layout/AdminLayout';
import ManageEvent from './pages/Admin/ManageEvent';
import ManageDish from './pages/Admin/ManageDish';
import ManageBlog from './pages/Admin/ManageBlog';
import ManageRestaurant from './pages/Admin/ManageRestaurant';
import ManageUser from './pages/Admin/ManageUser';
import ManageComplaint from './pages/Admin/ManageComplaint';
import UploadReviewsCSV from './pages/Admin/UploadReviewsCSV';
import RequireRole from './components/RequireRole';
import WizardForm from './pages/User/WizardForm';

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
          <Route path='survey' element={<WizardForm/>}/>
        </Route>

        <Route path="/rest" element={
          <RequireRole role="Restaurant">
            <RestaurantLayout />
          </RequireRole>
        }>
          <Route index element={<HomeRestaurant />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='dishes' element={<Dishes />} />
          <Route path='dishes/:id' element={<DishDetails />} />
          <Route path='reviews' element={<Reviews />} />
          <Route path='events' element={<Events />} />
        </Route>

        <Route path="/admin" element={
          <RequireRole role="Admin">
            <AdminLayout />
          </RequireRole>
        }>
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='events' element={<ManageEvent />} />
          <Route path='dishes' element={<ManageDish />} />
          <Route path='blogs' element={<ManageBlog />} />
          <Route path='restaurants' element={<ManageRestaurant />} />
          <Route path='users' element={<ManageUser />} />
          <Route path='complaints' element={<ManageComplaint />} />
          <Route path='upload' element={<UploadReviewsCSV />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
