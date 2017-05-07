import expect from 'expect';
import {
  loginRequested,
  loginFailed,
  loginSucceeded,
} from '../actions';
import {
  LOGIN_REQUESTED,
  LOGIN_FAILED,
  LOGIN_SUCCEEDED,
} from '../constants';

describe('LoginPage actions', () => {
  describe('Login Requested', () => {
    it('has a type of LOGIN_REQUESTED', () => {
      const expected = {
        type: LOGIN_REQUESTED,
      };
      expect(loginRequested()).toEqual(expected);
    });
  });

  describe('Login Failed', () => {
    it('has a type of LOGIN_FAILED', () => {
      const expected = {
        type: LOGIN_FAILED,
      };
      expect(loginFailed()).toEqual(expected);
    });
  });

  describe('Login Succeded', () => {
    it('has a type of LOGIN_SUCCEEDED', () => {
      const token = 'csavkfhdsgjfbs;kgjgasi864539dsajd;l';
      const expected = {
        type: LOGIN_SUCCEEDED,
        token,
      };
      expect(loginSucceeded(token)).toEqual(expected);
    });
  });
});
