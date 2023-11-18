import { takeEvery, put, call } from 'redux-saga/effects';
import { KycRequest, KycSuccess } from '../../Reducer/KycReducer';

function* kycForm(action) {
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
yield put(KycSuccess(response));
}

export function* KycSaga() {
  yield takeEvery(KycRequest.type, kycForm);
}

