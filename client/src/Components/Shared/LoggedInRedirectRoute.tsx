import { Navigate, Outlet } from 'react-router-dom';

import AuthService from '../../services/auth';

const LoggedInRedirectRoute = () => {
  const isLoggedIn = AuthService.loggedIn();

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return !isLoggedIn ? <Outlet /> : <Navigate to='/charity/list' />;
}

export default LoggedInRedirectRoute;