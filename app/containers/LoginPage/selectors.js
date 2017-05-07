import { createSelector } from 'reselect';

/**
 * Direct selector to the loginPage state domain
 */
const selectLoginPageDomain = () => (state) => state.get('loginPage');

/**
 * Other specific selectors
 */

const selectToken = () => createSelector(
  selectLoginPageDomain(),
  (loginPage) => loginPage.get('token')
);

export {
  selectLoginPageDomain,
  selectToken,
};
