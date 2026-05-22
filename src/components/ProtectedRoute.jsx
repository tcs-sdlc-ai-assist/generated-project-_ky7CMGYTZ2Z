import { Navigate } from 'react-router-dom';
import { isAuthenticated, isAdmin } from '../utils/auth.js';

function ProtectedRoute({ children, requiresAdmin = false }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (requiresAdmin && !isAdmin()) {
    return <Navigate to="/blogs" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
