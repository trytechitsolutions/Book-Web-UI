import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase, Badge, Avatar, makeStyles } from '@material-ui/core';
import { ShoppingCart, Favorite, Search } from '@material-ui/icons';
import CategoriesList from '../categories-section';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    flexGrow: 1,
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #ccc',
    borderRadius: theme.spacing(3), // Increased border radius
    flex: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(10),
      marginRight: theme.spacing(10),
    },
  },
  searchInput: {
    flex: 'auto',
    padding: theme.spacing(1),
    '&::placeholder': {
      fontStyle: 'italic',
      color: '#fff',
    },
    color: '#fff',
  },
  searchIcon: {
    padding: theme.spacing(1),
  },
  icons: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const NavigationBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* Brand Logo */}
          <Typography variant="h6" className={classes.logo}>
            Brand Logo
          </Typography>

          {/* Search Bar */}
          <div className={classes.searchContainer}>
            <div className={classes.searchIcon}>
              <Search />
            </div>
            <InputBase placeholder="Search..." className={classes.searchInput} />
          </div>

          {/* Icons */}
          <div className={classes.icons}>
            {/* Cart */}
            <IconButton color="inherit">
              <Badge badgeContent={3} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>

            {/* Wishlist */}
            <IconButton color="inherit">
              <Badge badgeContent={2} color="secondary">
                <Favorite />
              </Badge>
            </IconButton>

            {/* User Profile */}
            <IconButton color="inherit">
              <Avatar />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar> 
      <CategoriesList/>  
    </div>
  );
};

export default NavigationBar;
