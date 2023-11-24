import { takeEvery, put, call } from 'redux-saga/effects';
import { StoreRequest, StoreSuccess } from '../../Reducer/StoreReducer';

function* storeForm(action) {
//   try {
//     const response = yield call(apiRequest, action.payload);
//       setToken('token', response.data.token);
//     yield put(loginSuccess(getLoginData()));
//   } catch (error) {
//     yield put(loginFail(getErrorMsg(error)));
//   }
// }
alert(action.payload);
console.log(action.payload);
const response = action.payload;
yield put(StoreSuccess(response));
}

export function* StoreSaga() {
  yield takeEvery(StoreRequest.type, storeForm);
}

