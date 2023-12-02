import { takeEvery, put, call } from 'redux-saga/effects';
import { ProductRequest, ProductSuccess } from '../../Reducer/ProductReducer';

function* productForm(action) {
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
yield put(ProductSuccess(response));
}

export function* ProductSaga() {
  yield takeEvery(ProductRequest.type, productForm);
}
