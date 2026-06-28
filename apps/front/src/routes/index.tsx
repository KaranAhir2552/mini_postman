import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import { Workspace } from '../pages';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoutes>
        <Workspace />
      </ProtectedRoutes>
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  // {
  //   path: '/chess-board',
  //   element: (
  //     <ProtectedRoutes>
  //       <ChessBoardPage />
  //     </ProtectedRoutes>
  //   ),
  // },
]);
