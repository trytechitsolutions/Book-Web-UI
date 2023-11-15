import { all } from 'redux-saga/effects';
import { LoginSaga } from './LoginSaga';
import { RegisterSaga } from './RegisterSaga';
import { ProfileSaga } from './ProfileSaga';
import { CategoriesSaga } from './CategoriesSaga';

function* RootSaga() {
    yield all([
        LoginSaga(),
        RegisterSaga(),
        ProfileSaga(),
        CategoriesSaga(),

    ]);
}

export default RootSaga;