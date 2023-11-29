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

import * as securedLocalStorage from "../src/services/secureLocalStorage";
// import jwt from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode';


import { apiRequest } from './services/api';
// import AutoCompleteField from './components/test';
import MultiWordInput from './components/test';
import Attributes from './components/Attributes';
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


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
        {/* {checkAuthentication() && <Header items={menuItems} />} */}
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              E Author - Admin - {comp}
            </Typography>
            <div style={{ position: "absolute", right: "5px" }}>
              <Button style={{ color: "white" }} onClick={handleMenu}><AccountCircleIcon />{userData?.userName}<ArrowDropDownIcon /> </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={anchorEl}
                onClose={handleClose}
              >
                <MenuItem onClick={logout}><LogoutIcon />LogOut</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {menuList?.map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <Link to={text.toLowerCase()}>
                    <span onClick={() => setComp(text)}>{getSideMenuItem(text)}</span>
                  </Link>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <Routes>
            <Route path="/auto" element={<MultiWordInput />} />
            {!isLoggedIn && (
              <Route
                path="/login"  // Add a path for the Login route
                element={<Login loginData={loginData} />}
              />
            )}
            {/* <Route path="/login" element={<Login/>} /> */}
            <Route path="/" element={<Login loginData={loginData} />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/category" element={<Categories />} />
            <Route path="/kyc_form" element={<KycForm />} />
            <Route path="/components" element={<Components />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/store-form" element={<StoreFrom />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/userSignUp" element={<UserSignUp />} />
            <Route path="/user" element={<Users />} />
            <Route path="/store" element={<Store />} />
            <Route path="/rolemap" element={<ComponentRoleMapping />} />
            <Route path="/navbar" element={<NavigationBar />} />
            <Route path="/attributes" element={<Attributes />} />            
            {/* <Route path="/bookslist"  element={<BookList />}  />
          <Route path="/books"  element={<Books />}  />
          <Route path="/publisher" element={<PrivateRoute element={<PublisherComponent />} />} /> */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
