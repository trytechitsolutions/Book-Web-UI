import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useEffect, useState } from 'react'
import './main.css';


const ProductTypeDialog = ({ isOpen, onClose, onSelectProductType ,onConfirm }) => {
    const [selectedType, setSelectedType] = useState(null);
    
    const handleProductTypeSelection = (productType) => {
        setSelectedType(productType);
      };
    
    const handleConfirm = () => {
        onSelectProductType(selectedType);
        onConfirm();
      };
  
    return (
        
        <Dialog open={isOpen} onClose={onClose} className='Dailog'>
        <DialogTitle>Select Product Type</DialogTitle>
        <DialogContent className='button'>
          <p>Choose the type of product:</p>
          <Button
            variant="outlined"
            onClick={() => handleProductTypeSelection('digital')}
            style={{
                // color: selectedType ? 'primary' : 'default',
                // borderColor: selectedType ? 'default' : 'primary',
              }}
          >
            Digital
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleProductTypeSelection('physical')}
            style={{
                // color: selectedType ? 'primary' : 'default',
                // borderColor: selectedType ? 'primary' : 'default',
              }}
          >
            Physical
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleConfirm} disabled={!selectedType}>OK</Button>
        </DialogActions>
      </Dialog>
       );
    };
  

const Products = () => {
    const [isDialogOpen, setDialogOpen] = useState(true);
  const [selectedProductType, setSelectedProductType] = useState(null);

  const handleProductTypeSelection = (productType) => {
    setSelectedProductType(productType);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };


    useEffect(() => {
        if (selectedProductType !== null) {
          // Replace the following with your actual routes or navigation logic
          window.location.href = selectedProductType === 'digital' ? '/digital-product' : '/physical-product';
        }
      }, [selectedProductType]);

    

  return (
    <ProductTypeDialog
    isOpen={isDialogOpen}
    onClose={handleDialogClose}
    onSelectProductType={handleProductTypeSelection}
  />
    )
}

export default Products;