import expect from 'expect';
import loginPageReducer from '../reducer';
import { fromJS } from 'immutable';
import {
  loginRequested,
  loginFailed,
  loginSucceeded,
} from '../actions';

describe('loginPageReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      token: '',
    });
  });

  it('returns the initial state', () => {
    expect(loginPageReducer(undefined, {})).toEqual(fromJS({
      token: '',
    }));
  });

  it('returns the initial state', () => {
    expect(loginPageReducer(state, loginRequested())).toEqual(fromJS({
      token: '',
    }));
  });

  it('returns the error sate', () => {
    expect(loginPageReducer(state, loginFailed())).toEqual(fromJS({
      token: '',
    }));
  });

  it('returns the login success state', () => {
    expect(loginPageReducer(state, loginSucceeded('hdksa'))).toEqual(fromJS({
      token: 'hdksa',
    }));
  });
});
