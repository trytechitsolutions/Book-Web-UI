import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import './HamburgerMenu.css';
const Loader = () => {
  return (
    <div className="full-page-loader">
      <div className="loader">
        <CircularProgress />
      </div>
    </div>
  );
};

export default Loader;
