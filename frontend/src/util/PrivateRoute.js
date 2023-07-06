// <Route path="/home" element={ <PrivateRoute> <HomePage /> </PrivateRoute> } />
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('accessToken');

  return token ? children : <Navigate to="/" state={{ from: location }} replace />;
};

export default PrivateRoute;
