import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import RootSaga from './Saga';
import LoginReducer from "./Reducer/LoginReducer";
import RegisterReducer from "./Reducer/RegisterReducer";
import ProfileReducer from "./Reducer/ProfileReducer";
import CategoriesReducer from "./Reducer/CategoriesReducer";





const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    LoginReducer: LoginReducer,
    RegisterReducer : RegisterReducer,
    ProfileReducer : ProfileReducer,
    CategoriesReducer : CategoriesReducer, 

  },
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
});

sagaMiddleware.run(RootSaga);

export default store;