import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useEffect, useState } from 'react'
import './index.css';
// import { apiRequest } from '../../services/api';
// import * as securedLocalStorage from '../../services/secureLocalStorage';


const ProductTypeModal = ({ isOpen, onClose, onSelectProductType, onConfirm }) => {
    console.log('in modal****')
  const [selectedType, setSelectedType] = useState(null);
//   const serverUrl = securedLocalStorage.baseUrl;

  const handleProductTypeSelection = (productType) => {
    onSelectProductType(productType);
  };

  

  return (
    <Dialog open={isOpen} onClose={onClose} className='Dialog'>
      <DialogTitle>Select Product Type</DialogTitle>
      <DialogContent className='button'>
        <p>Choose the type of product:</p>
        <Button
          variant="outlined"
          onClick={() => handleProductTypeSelection('digital')}
          style={{
            color: selectedType === 'digital' ? 'primary' : 'default',
            borderColor: selectedType === 'digital' ? 'default' : 'primary',
          }}
        >
          Digital
        </Button>
        <Button
          variant="outlined"
          onClick={() => handleProductTypeSelection('physical')}
          style={{
            color: selectedType === 'physical' ? 'primary' : 'default',
            borderColor: selectedType === 'physical' ? 'default' : 'primary',
          }}
        >
          Physical
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {/* <Button onClick={null} disabled={!selectedType}>
          OK
        </Button> */}
      </DialogActions>
    </Dialog>
  );
};

  



export default ProductTypeModal;