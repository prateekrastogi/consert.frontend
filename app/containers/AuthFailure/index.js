/*
 *
 * AuthFailure
 *
 */

/* eslint-disable */

if (window.opener) {
  window.opener.localStorage.setItem('token', '');
  window.close();
}