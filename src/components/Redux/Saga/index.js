import { all } from 'redux-saga/effects';
import { LoginSaga } from './LoginSaga';
import { RegisterSaga } from './RegisterSaga';
import { ProfileSaga } from './ProfileSaga';
import { CategoriesSaga } from './CategoriesSaga';
import { ComponentsSaga } from './ComponentsSaga';
import { RolesSaga } from './RolesSaga';
import { KycSaga } from './KycSaga';
import { BrandsSaga } from './BrandsSaga';
import { userSaga } from './UserSignUpSaga';
import { StoreSaga } from './StoreSaga';
import { ProductSaga } from './ProductSaga';

function* RootSaga() {
    yield all([
        LoginSaga(),
        RegisterSaga(),
        ProfileSaga(),
        CategoriesSaga(),
        ComponentsSaga(),
        RolesSaga(),
        KycSaga(),
        BrandsSaga(),
        userSaga(),
        StoreSaga(),
        ProductSaga(),
    ]);
}

export default RootSaga;