import { takeEvery, put, call } from 'redux-saga/effects';
import { BrandsRequest, BrandsSuccess } from '../../Reducer/BrandsReducer';

function* brandsForm(action) {
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
yield put(BrandsSuccess(response));
}

export function* BrandsSaga() {
  yield takeEvery(BrandsRequest.type, brandsForm);
}

