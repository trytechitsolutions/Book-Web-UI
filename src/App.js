// App.js
import React, { lazy } from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider
import Header from './components/common/Header';
import Login from './components/LoginF';
import store from './components/Redux/store';
import Register from './components/RegisterF';
import Profile from './components/profile';
import Categories from './components/Categories';
import KYCF from './components/KYC-Form';
import Components from './components/Components';
import Roles from './components/Roles';
import StoreFrom from './components/Store-Form';

// ... (your existing imports)

// Custom PrivateRoute component
const PrivateRoute = ({ element }) => {
  const isUserAuthenticated = checkAuthentication();

  function LoadingIndicator() {
    return <div>Loading...</div>;
  }

  if (!isUserAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <React.Suspense fallback={<LoadingIndicator />}>
      {element}
    </React.Suspense>
  );
};

const checkAuthentication = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

function App() {
  const menuItems = ['categories', 'publishers', 'books'];

  return (
    <Provider store={store}>
      <BrowserRouter>
        {checkAuthentication() && <Header items={menuItems} />}
        <Routes>
        {/*
        <Route path="/kyc" element={<KYCForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/userform" element={<PrivateRoute element={<UserForm />} />} />
        <Route path="/bookslist" element={<PrivateRoute element={<BooksList />} />} />
        <Route path="/books" element={<PrivateRoute element={<Books />} />} />
        <Route path="/publisher" element={<PrivateRoute element={<PublisherComponent />} />} />
        <Route path="/store-form" element={<StoreFrom />} /> */}
         {/* <Route path="/register" element={<RegistrationForm/>} /> */}
        <Route path="/loginF" element={<Login/>} />
        <Route path="/reg" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/category" element={<Categories/>} />
        <Route path="/kyc-d" element={<KYCF/>}   />
        <Route path="/components"  element={<Components />} />
        <Route path="/roles" element={<Roles/>} />
        <Route path="/store-form" element={<StoreFrom />} />
          {/* <Route path="/userform" element={<PrivateRoute element={<UserForm />} />} />
          <Route path="/bookslist" element={<PrivateRoute element={<BooksList />} />} /> */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
