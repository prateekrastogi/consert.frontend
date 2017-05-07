/*
 *
 * LoginPage actions
 *
 */

import {
  LOGIN_SUCCEEDED,
  LOGIN_REQUESTED,
  LOGIN_FAILED,
} from './constants';

export function loginRequested() {
  return {
    type: LOGIN_REQUESTED,
  };
}

export function loginFailed() {
  return {
    type: LOGIN_FAILED,
  };
}

export function loginSucceeded(token) {
  return {
    type: LOGIN_SUCCEEDED,
    token,
  };
}

