import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { useSelector } from 'react-redux';

const RequireRole = ({ role, children }) => {
  const {user, isAuthenticated} = useSelector(state => state.auth)

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user?.role !== role) {
    return <Navigate to="/access-denied" />;
  }

  return children;
};

export default RequireRole;