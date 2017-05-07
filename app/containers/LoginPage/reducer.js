/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOGIN_REQUESTED,
  LOGIN_FAILED,
  LOGIN_SUCCEEDED,
} from './constants';

const initialState = fromJS({
  token: '',
});

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUESTED:
      return state;
    case LOGIN_FAILED:
      return state
        .set('token', '');
    case LOGIN_SUCCEEDED:
      return state
        .set('token', action.token);
    default:
      return state;
  }
}

export default loginPageReducer;
