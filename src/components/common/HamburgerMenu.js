import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

import './HamburgerMenu.css'; // Import your CSS file

const HamburgerMenu = ({ items }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const onClickItem = (val) => {
    setOpen(!open);
    navigate(val);
  };

  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  return (
    <div className="hamburger-menu-container">
      <IconButton onClick={toggleDrawer}>
        <MenuIcon sx={{color:'#FFFFFF'}} />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <List className="menu-list">
          {items.map((text, index) => (
            <ListItem button key={text} onClick={() => onClickItem(text)}>
              <ListItemText primary={toTitleCase(text)} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default HamburgerMenu;
