import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, InputLabel } from '@mui/material';

const brands = [
    { id: 1, name: 'Brand A' },
    { id: 2, name: 'Brand B' },
    // ... add more brands as needed
  ];

const BrandSelector = ({ open, onClose, onSelectBrand }) => {
  const [selectedBrand, setSelectedBrand] = useState('');

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
  };

  const handleSelectBrand = () => {
    // Pass the selected brand to the parent component
    onSelectBrand(selectedBrand);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Select Brand</DialogTitle>
      <DialogContent>
        <InputLabel>Brand</InputLabel>
        <Select
          fullWidth
          value={selectedBrand}
          onChange={handleBrandChange}
        >
          {/* Assume 'brands' is an array of brand objects */}
          {brands.map((brand) => (
            <MenuItem key={brand.id} value={brand.name}>
              {brand.name}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSelectBrand}>Select</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BrandSelector;
