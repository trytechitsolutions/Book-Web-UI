import React from 'react';
import HamburgerMenu from './HamburgerMenu';
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Header = ({ items }) => {
    const handleLogout = () => {
        // Clear the token synchronously
        localStorage.removeItem('token');
        // Navigate to the login page
        window.location.href = '/login';
      };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#007BFF', // Set your desired background color here
    padding: '10px', // Add padding as needed
    marginBottom: '2rem'
  };

  return (
    <header style={headerStyle}>
      <HamburgerMenu items={items} />
      <div className="logout-button">
        <Link to="/login" onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', paddingRight: '2rem' }}>
          <ExitToAppIcon sx={{ color: '#FFFFFF' }} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
