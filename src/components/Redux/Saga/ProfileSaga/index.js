import { takeEvery, put, call } from 'redux-saga/effects';
import { profileRequest, profileSuccess } from '../../Reducer/ProfileReducer';

function* profileForm(action) {
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
yield put(profileSuccess(response));
}

export function* ProfileSaga() {
  yield takeEvery(profileRequest.type, profileForm);
}
