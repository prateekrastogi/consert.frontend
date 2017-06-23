/**
 * Test  sagas
 */
import expect from 'expect';
import { take, put, call, select } from 'redux-saga/effects';
import { loginSuccess, loginFail, loginChecker, loginRequest } from '../sagas';
import { LOGIN_SUCCEEDED, LOGIN_FAILED, LOGIN_REQUESTED } from 'containers/LoginPage/constants';
import { loginFailed, loginSucceeded } from 'containers/LoginPage/actions';
import { selectToken } from 'containers/LoginPage/selectors';

describe('loginSaga Sagas Tests', () => {
  it('should take LOGIN_SUCCEEDED action', () => {
    const loginSuccessGenerator = loginSuccess();
    const takeDescriptor = loginSuccessGenerator.next().value;
    expect(takeDescriptor).toEqual(take(LOGIN_SUCCEEDED));
  });

  it('should take LOGIN_FAILED action', () => {
    const loginFailGenerator = loginFail();
    const takeDescriptor = loginFailGenerator.next().value;
    expect(takeDescriptor).toEqual(take(LOGIN_FAILED));
  });

  it('should put loginFailed action from Login Checker', () => {
    const loginCheckerGenerator = loginChecker();
    const putDescriptor = loginCheckerGenerator.next().value;
    expect(putDescriptor).toEqual(put(loginFailed()));
  });

  it('should put loginSucceeded action from Login Checker', () => {
    const loginCheckerGenerator = loginChecker();
    const token = 'something';
    window.localStorage.setItem('token', token);
    const putDescriptor = loginCheckerGenerator.next().value;
    expect(putDescriptor).toEqual(put(loginSucceeded(token)));
  });

  it('should take LOGIN_REQUESTED and put loginSuceeded after selecting token', () => {
    const loginRequestGenerator = loginRequest();
    const token = 'something';
    const takeDescriptor = loginRequestGenerator.next().value;
    expect(takeDescriptor).toEqual(take(LOGIN_REQUESTED));
    const selectDescriptor = loginRequestGenerator.next().value;
    expect(selectDescriptor).toEqual(select(selectToken()));
    const putDescriptor = loginRequestGenerator.next(token).value;
    expect(putDescriptor).toEqual(put(loginSucceeded(token)));
  });

  it('should take LOGIN_REQUESTED and call login Checker after selecting token', () => {
    const loginRequestGenerator = loginRequest();
    const token = '';
    const takeDescriptor = loginRequestGenerator.next().value;
    expect(takeDescriptor).toEqual(take(LOGIN_REQUESTED));
    const selectDescriptor = loginRequestGenerator.next().value;
    expect(selectDescriptor).toEqual(select(selectToken()));
    const callDescriptor = loginRequestGenerator.next(token).value;
    expect(callDescriptor).toEqual(call(loginChecker));
  });
});

