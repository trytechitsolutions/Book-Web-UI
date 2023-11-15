import { takeEvery, put, call } from 'redux-saga/effects';
import { registerRequest, registerSuccess } from '../../Reducer/RegisterReducer';

function* registerForm(action) {
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
yield put(registerSuccess(response));
}

export function* RegisterSaga() {
  yield takeEvery(registerRequest.type, registerForm);
}
