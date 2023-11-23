import { takeEvery, put, call } from 'redux-saga/effects';
import { userRequest, userSuccess } from '../../Reducer/UserSignUpReducer';

function* usersForm(action) {
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
yield put(userSuccess(response));
}

export function* userSaga() {
  yield takeEvery(userRequest.type, usersForm);
}

