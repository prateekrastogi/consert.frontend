/*
 *
 * AuthSuccess
 *
 */
/* eslint-disable */

import 'whatwg-fetch';

const host = 'http://localhost:3030';
// Set up Feathers client side
const app = feathers()
  .configure(feathers.rest(host).fetch(fetch))
  .configure(feathers.hooks())
  .configure(feathers.authentication({ storage: window.localStorage }));

// authenticate using your JWT that was passed in the short lived cookie
app.authenticate().then((result) => {
  if (window.opener) {
    window.opener.localStorage.setItem('token', app.get('token'));
    console.log(result);
    window.close();
  }
}).catch((error) => {
  if (window.opener) {
    window.opener.localStorage.setItem('token', '');
    console.log(error);
    window.close();
  }
});
