
import { useSelector } from 'react-redux';

export const GetStoreData = (reducerName) => {
    return useSelector((state) => state[reducerName]);
};
