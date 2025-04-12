// PrivateRoute.tsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSupabaseSession } from '../hooks/useSupabaseSession'

function PrivateRoute() {
    const { session, loading } = useSupabaseSession();
    const location = useLocation();
    if (loading) {
        // Optionally, display a loading indicator while the session is being retrieved.
        return <div>Loading...</div>;
      }
    
      if (!session) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
      }
    
      return <Outlet />;
    }
    
export default PrivateRoute;