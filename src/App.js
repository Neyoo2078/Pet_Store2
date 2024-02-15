import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// Import the layouts
import RootLayout from './layout/root-layout';
import DashboardLayout from './layout/dashboard-layout';

// Import the components
import Home from './pages/Home';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Checkout from './pages/DashboardPage';
import InvoicesPage from './pages/InvoicesPage';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import BrowswPet from './pages/BrowswPet';

const App = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/sign-in', element: <SignInPage /> },
      { path: '/sign-up', element: <SignUpPage /> },
      { path: '/productdetails/:id', element: <ProductDetails /> },
      { path: '/cart', element: <Cart /> },
      { path: '/Browse Pet', element: <BrowswPet /> },
      {
        element: <DashboardLayout />,
        path: 'checkout',
        children: [
          { path: '/checkout', element: <Checkout /> },
          { path: '/checkout/payment', element: <InvoicesPage /> },
        ],
      },
    ],
  },
]);

export default App;
