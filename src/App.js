import React, { lazy } from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import Books from './components/Books';
import PublisherComponent from './components/publisher';
import Header from './components/common/Header';
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
        <Route path="/login" element={<LoginForm />} />
        <Route path="/userform" element={<PrivateRoute element={<UserForm />} />} />
        <Route path="/bookslist" element={<PrivateRoute element={<BooksList />} />} />
        <Route path="/books" element={<PrivateRoute element={<Books />} />} />
        <Route path="/publisher" element={<PrivateRoute element={<PublisherComponent />} />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
