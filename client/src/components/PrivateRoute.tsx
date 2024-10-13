//src/components/PrivateRoute.tsx
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

interface PrivateRouteProps {
  children: JSX.Element;
  roles: string[];
}

const PrivateRoute = ({ children, roles }: PrivateRouteProps) => {
  const authContext = useContext(AuthContext);

  if (!authContext?.user) {
    // Not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  if (!roles.includes(authContext.user.role)) {
    // Role not authorized, redirect to home page
    return <Navigate to="/" />;
  }

  // Authorized, render the component
  return children;
};

export default PrivateRoute;
