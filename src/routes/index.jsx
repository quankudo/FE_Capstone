import { ROUTES } from "../constant/routes";
import Blogs from "../pages/User/Blogs";
import CallToActionReview from "../pages/User/CallToActionReview";
import Contact from "../pages/User/Contact";
import DishDetails from "../pages/User/DishDetails";
import Favorites from "../pages/User/Favorites";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import Restaurant from "../pages/User/Restaurant";
import RestaurantDetail from "../pages/User/RestaurantDetails";

export const LIST_ROUTE = [
    {
        path: ROUTES.BLOG,
        element: <Blogs/> 
    },
    {
        path: ROUTES.DISH_DETAIL,
        element: <DishDetails/> 
    },
    {
        path: ROUTES.FAVORITE,
        element: <Favorites/> 
    },
    {
        path: ROUTES.CONTACT,
        element: <Contact/> 
    },
    {
        path: ROUTES.LOGIN,
        element: <Login/> 
    },
    {
        path: ROUTES.REGISTER,
        element: <Register/> 
    },
    {
        path: ROUTES.REVIEW,
        element: <CallToActionReview/> 
    },
    {
        path: ROUTES.NOTFOUND,
        element: <NotFound/> 
    },
    {
        path: ROUTES.RESTAURANT_DETAIL,
        element: <RestaurantDetail/> 
    },
    {
        path: ROUTES.RESTAURANT,
        element: <Restaurant/> 
    },
]