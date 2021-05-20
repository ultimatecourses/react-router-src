import React, { lazy, useState } from 'react';
import { BrowserRouter as Router, Navigate, useRoutes } from 'react-router-dom';
import { css } from '@emotion/css';

import Nav from './Common/Nav';
import Loadable from './Common/Loadable';
import ScrollToTop from './Common/ScrollToTop';
// import ProtectedRoute from './Common/ProtectedRoute';
// import Products from './Products/Products';
// import Admin from './Admin/Admin';

const Products = Loadable(lazy(() => import('./Products/Products')));
const Admin = Loadable(lazy(() => import('./Admin/Admin')));

const AppStyles = css`
  margin: 50px auto;
  width: 380px;
  .Container {
    background: #1d1e26;
    border: 4px solid #9580ff;
    border-radius: 6px;
    padding: 25px;
  }
`;

const App = () => {
  const [authenticated] = useState(true);
  const routes = useRoutes([
    {
      path: '/*',
      element: <Products />,
    },
    {
      path: '/admin*',
      element: authenticated ? <Admin /> : <Navigate to="/" />,
    },
    {
      path: '*',
      element: <Navigate to="/" />,
    },
  ]);

  return routes;
};

const AppWrapper = () => (
  <div className={AppStyles}>
    <Router>
      <ScrollToTop />
      <div className="Container">
        <Nav />
        <App />
      </div>
    </Router>
  </div>
);

export default AppWrapper;
