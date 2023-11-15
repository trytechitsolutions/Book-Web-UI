import { takeEvery, put, call } from 'redux-saga/effects';
import { loginFail, loginRequest, loginSuccess } from '../../Reducer/LoginReducer';

function* loginForm(action) {
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
yield put(loginSuccess(response));
}

export function* LoginSaga() {
  yield takeEvery(loginRequest.type, loginForm);
}
