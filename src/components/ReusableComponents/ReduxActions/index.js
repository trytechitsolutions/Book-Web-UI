import { useSelector } from 'react-redux';

export const GetStoreData = (sliceName) => {
    const data = useSelector((state) => state[sliceName]);
    return data;
  };