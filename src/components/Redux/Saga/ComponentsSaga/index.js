import { takeEvery, put, call } from 'redux-saga/effects';
import { ComponentsRequest, ComponentsSuccess } from '../../Reducer/ComponentsReducer';

function* componentsForm(action) {
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
yield put(ComponentsSuccess(response));
}

export function* ComponentsSaga() {
  yield takeEvery(ComponentsRequest.type, componentsForm);
}

