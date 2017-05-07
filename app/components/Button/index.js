/**
 *
 * Button
 *
 */

import React, { PropTypes, Children } from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';


function Button(props) {
  const className = props.className ? props.className : 'ui button';
  let button = (
    <button className={className} href={props.href} onClick={props.onClick}>
      {Children.toArray(props.children)}
    </button>
  );
  if (props.handleRoute) {
    button = (
      <button className={className} onClick={props.handleRoute}>
        {Children.toArray(props.children)}
      </button>
    );
  }

  return (
    <div>
      {button}
      <FormattedMessage {...messages.header} />
    </div>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  handleRoute: PropTypes.func,
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func,
};


export default Button;
