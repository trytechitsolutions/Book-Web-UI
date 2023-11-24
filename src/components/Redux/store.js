import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import RootSaga from './Saga';
import LoginReducer from "./Reducer/LoginReducer";
import RegisterReducer from "./Reducer/RegisterReducer";
import ProfileReducer from "./Reducer/ProfileReducer";
import CategoriesReducer from "./Reducer/CategoriesReducer";
import ComponentsReducer from "./Reducer/ComponentsReducer";
import RolesReducer from "./Reducer/RolesReducer";
import KycReducer from "./Reducer/KycReducer";
import BrandsReducer from "./Reducer/BrandsReducer";
import UserSignUpReducer from "./Reducer/UserSignUpReducer";
import StoreReducer from "./Reducer/StoreReducer";





const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    LoginReducer: LoginReducer,
    RegisterReducer : RegisterReducer,
    ProfileReducer : ProfileReducer,
    CategoriesReducer : CategoriesReducer, 
    ComponentsReducer : ComponentsReducer,
    RolesReducer : RolesReducer,
    KycReducer : KycReducer,
    BrandsReducer : BrandsReducer,
    UserSignUpReducer : UserSignUpReducer,
    StoreReducer : StoreReducer,

  },
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
});

sagaMiddleware.run(RootSaga);

export default store;