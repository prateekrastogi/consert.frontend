import { take, call, select, put } from 'redux-saga/effects';
import { loginSucceeded, loginFailed } from 'containers/LoginPage/actions';
import { LOGIN_REQUESTED, LOGIN_SUCCEEDED, LOGIN_FAILED } from 'containers/LoginPage/constants';
import { selectToken } from 'containers/LoginPage/selectors';
import { push } from 'react-router-redux';
import 'whatwg-fetch';

// Individual exports for testing
export function* loginSuccess() {
  while (true) {
    yield take(LOGIN_SUCCEEDED);
    if (window.location.pathname === '/login') {
      yield put(push('/'));
    }
  }
}

export function* loginFail() {
  while (true) {
    yield take(LOGIN_FAILED);
    window.localStorage.setItem('token', '');
    if (window.location.pathname !== '/login') {
      yield put(push('/login'));
    }
  }
}


export function* loginRequest() {
  while (true) {
    yield take(LOGIN_REQUESTED);
    const token = yield select(selectToken());
    if (token !== '' && token !== null) {
      yield put(loginSucceeded(token));
    } else {
      yield call(loginChecker);
    }
  }
}

export function* loginChecker() {
  const token = window.localStorage.getItem('token');
  if (token !== '' && token !== null) {
    yield put(loginSucceeded(token));
  } else {
    yield put(loginFailed());
  }
}

export function* loginSaga() {
  yield [call(loginSuccess), call(loginRequest), call(loginFail)];
}

// All sagas to be loaded
export default [
  loginSaga,
];
