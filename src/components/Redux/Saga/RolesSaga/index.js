import { takeEvery, put, call } from 'redux-saga/effects';
import { RolesRequest, RolesSuccess } from '../../Reducer/RolesReducer';

function* rolesForm(action) {
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
yield put(RolesSuccess(response));
}

export function* RolesSaga() {
  yield takeEvery(RolesRequest.type, rolesForm);
}
