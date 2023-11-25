// App.js
import React, { lazy } from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider
import Header from './components/common/Header';
import store from './components/Redux/store';
import Profile from './components/profile';
import Categories from './components/Categories';
import Components from './components/Components';
import Roles from './components/Roles';
import StoreFrom from './components/Store-Form';
import BookList from './components/BookList';
import Books from './components/Books';
import PublisherComponent from './components/publisher';
import KycForm from './components/KYC-Form';
import RegisterForm from './components/RegisterForm';
import Login from './components/LoginFom';
import Brands from './components/Brands';
import UserSignUp from './components/UserSignUp';
import Users from './components/UserData';
import Store from './components/Store';
import ComponentRoleMapping from './components/KYC-Form/ComponentRoleMapping';
import NavigationBar from './components/customer-store-components/navbar';

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

        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/category" element={<Categories/>} />
        <Route path="/kyc_form" element={<KycForm/>}   />
        <Route path="/components"  element={<Components />} />
        <Route path="/roles" element={<Roles/>} />
        <Route path="/store-form" element={<StoreFrom />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/userSignUp" element={<UserSignUp />} />
        <Route path="/user" element={<Users />} />
        <Route path="/store" element={<Store/>} />
        <Route path="/rolemap" element={<ComponentRoleMapping/>} />
        <Route path="/navbar" element={<NavigationBar />} />

          {/* <Route path="/bookslist"  element={<BookList />}  />
          <Route path="/books"  element={<Books />}  />
          <Route path="/publisher" element={<PrivateRoute element={<PublisherComponent />} />} /> */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
