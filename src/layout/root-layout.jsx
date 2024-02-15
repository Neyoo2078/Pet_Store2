import { Link, Outlet } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import NavBar from '../components/NavBar';
import { useLocation } from 'react-router-dom';
import ErrorBoundary from '../components/Error';
import ConnectionUI from '../components/ConnectionUI';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Footer from '../components/Footer';

const PUBLISHABLE_KEY = process.env.REACT_APP_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

export default function RootLayout() {
  const location = useLocation();
  return (
    <ErrorBoundary>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        {location.pathname !== '/sign-in' &&
          location.pathname !== '/sign-up' &&
          location.pathname !== '/checkout/payment' && <NavBar />}
        <ConnectionUI />
        <main>
          <Outlet />
        </main>

        {location.pathname !== '/sign-in' &&
          location.pathname !== '/sign-up' &&
          location.pathname !== '/checkout/payment' && <Footer />}
      </ClerkProvider>
    </ErrorBoundary>
  );
}
