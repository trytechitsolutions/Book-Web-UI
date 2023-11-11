import React, { lazy } from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import Books from './components/Books';
import PublisherComponent from './components/publisher';
import Header from './components/common/Header';
import RegistrationForm from './components/register';
import StoreDetailsForm from './components/storeDetailsForm';
import KYCForm from './components/KYC-details';
import Register from './components/RegisterF';
import KYCF from './components/KYC-Form';
import StoreFrom from './components/Store-Form';
// import Register from './components/RegisterF';
const LoginForm = lazy(() => import("./components/common/Login"));
const UserForm = lazy(() => import("./components/AdminUserForm"));
const BooksList = lazy(() => import("./components/BookList"));

// Custom PrivateRoute component
const PrivateRoute = (props) => {
  // Replace with your authentication logic (e.g., checking user session or token)
  const isUserAuthenticated = checkAuthentication(); // Implement checkAuthentication function

  function LoadingIndicator() {
    return <div>Loading...</div>;
  }
  if (!isUserAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <React.Suspense fallback={<LoadingIndicator />}>
      {props.element}
    </React.Suspense>
  );
};

// Implement your authentication logic here
const checkAuthentication = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

function App() {
  const menuItems = ['categories', 'publishers', 'books'];

  return (
    <BrowserRouter>
      {checkAuthentication() && <Header items={menuItems} />}
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/kyc" element={<KYCForm />} />
        <Route path="/store" element={<StoreDetailsForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/userform" element={<PrivateRoute element={<UserForm />} />} />
        <Route path="/bookslist" element={<PrivateRoute element={<BooksList />} />} />
        <Route path="/books" element={<PrivateRoute element={<Books />} />} />
        <Route path="/publisher" element={<PrivateRoute element={<PublisherComponent />} />} />
        <Route path="/reg" element={<Register />} />
        <Route path="/kyc-d" element={<KYCF/>}   />
        <Route path="store-form" element={<StoreFrom />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;