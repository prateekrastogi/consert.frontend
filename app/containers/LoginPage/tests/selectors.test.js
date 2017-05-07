import { selectLoginPageDomain, selectToken } from '../selectors';
import { fromJS } from 'immutable';
import expect from 'expect';


describe('selectLoginPageDomain', () => {
  const selector = selectLoginPageDomain();
  it('should select login state', () => {
    const loginState = fromJS({});
    const mockedLoginState = fromJS({
      loginPage: loginState,
    });
    expect(selector(mockedLoginState)).toEqual(loginState);
  });
});

describe('selectToken', () => {
  const selector = selectToken();
  it('should select token', () => {
    const tokenStored = 'fish';
    const tokenState = fromJS({
      loginPage: {
        token: tokenStored,
      },
    });
    expect(selector(tokenState)).toEqual(tokenStored);
  });
});
