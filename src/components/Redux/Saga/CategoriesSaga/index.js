import { takeEvery, put, call } from 'redux-saga/effects';
import { categoriesRequest, categoriesSuccess } from '../../Reducer/CategoriesReducer';

function* categoriesForm(action) {
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
yield put(categoriesSuccess(response));
}

export function* CategoriesSaga() {
  yield takeEvery(categoriesRequest.type, categoriesForm);
}
