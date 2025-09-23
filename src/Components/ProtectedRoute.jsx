import { useAuth } from './hooks/useAuth.js';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRoles }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    console.log('ProtectedRoute: Loading authentication state...');
    return <div>Loading...</div>; 
  }

  if (!isAuthenticated) {
    console.log('ProtectedRoute: Not authenticated. Redirecting to /loginPage.');
    return <Navigate to="/loginPage" replace />;
  }

  if (requiredRoles) {
    const userRole = user?.role; 
    let isAuthorized = false;

    if (Array.isArray(requiredRoles)) {
      isAuthorized = requiredRoles.includes(userRole);
    } else {
      isAuthorized = userRole === requiredRoles;
    }

    if (!isAuthorized) {
      console.log(`ProtectedRoute: Role mismatch. Required roles: ${JSON.stringify(requiredRoles)}, User role: '${userRole}'. Redirecting to /home.`);
      return <Navigate to="/home" replace />;
    }
  }

  console.log(`ProtectedRoute: Access granted for user with role '${user?.role}'.`);
  return children;
};

export default ProtectedRoute;
