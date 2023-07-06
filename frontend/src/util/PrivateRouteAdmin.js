// <Route path="/home" element={ <PrivateRoute> <HomePage /> </PrivateRoute> } />
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRouteAdmin = ({ children }) => {
  const location = useLocation();
  const authority = localStorage.getItem('authority');

  return authority ? children : <Navigate to="/home" state={{ from: location }} replace />;
};

export default PrivateRouteAdmin;