/*
 *
 * LoginPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { createStructuredSelector } from 'reselect';

import {
  loginRequested,
  loginFailed,
  loginSucceeded,
} from './actions';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import styles from './styles.css';
import Button from 'components/Button';
import Popout from 'react-popout';

export class LoginPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      isPoppedOut: false,
    };
  }

  componentWillMount() {
    this.props.loginRequested();
    window.addEventListener('storage', this.loginDetect);
  }

  /* repeating the code because can't add generators to window event handlers in sagas */
  loginDetect = () => {
    const token = window.localStorage.getItem('token');
    if (token !== '' && token !== null) {
      this.props.loginSucceeded(token);
    } else {
      this.props.loginFailed();
    }
  }

  popout = () => {
    this.setState({ isPoppedOut: true });
  }

  popoutClosed = () => {
    this.setState({ isPoppedOut: false });
  }

  render() {
    if (this.state.isPoppedOut) {
      return (
        <div className={styles.loginPage}>
          <Helmet
            title="LoginPage"
            meta={[
              { name: 'description', content: 'Description of LoginPage' },
            ]}
          />
          <FormattedMessage {...messages.header} />
          <Button className="ui button">
            <i className="spotify large icon"></i>
          </Button>
          <Popout url="http://localhost:3030/auth/spotify" title="Login" onClosing={this.popoutClosed}>
          </Popout>
        </div>
      );
    }
    else {            // eslint-disable-line
      return (
        <div className={styles.loginPage}>
          <Helmet
            title="LoginPage"
            meta={[
              { name: 'description', content: 'Description of LoginPage' },
            ]}
          />
          <FormattedMessage {...messages.header} />
          <Button href="http://localhost:3030/auth/spotify" className="ui button" onClick={this.popout}>
            <i className="spotify large icon"></i>
          </Button>
        </div>
      );
    }
  }
}

LoginPage.propTypes = {
  loginRequested: React.PropTypes.func,
  loginSucceeded: React.PropTypes.func,
  loginFailed: React.PropTypes.func,


};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    loginRequested: () => dispatch(loginRequested()),
    loginFailed: () => dispatch(loginFailed()),
    loginSucceeded: (token) => dispatch(loginSucceeded(token)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
