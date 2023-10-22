import { toast } from 'react-toastify';

// Function to display a success toast
export const showSuccessToast = (message) => {
  toast.success(message, {
    position: 'top-right',
  });
};

// Function to display an error toast
export const showErrorToast = (message) => {
  toast.error(message, {
    position: 'top-right',
  });
};
