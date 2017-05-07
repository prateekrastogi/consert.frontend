import Button from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<Button />', () => {
  it('should render a class ui icon button with its children if handleroute property is defined', () => {
    const children = (<i className="spotify icon"></i>);
    const renderedComponent = shallow(
      <Button className={'ui icon button'} handleRoute={function handler() {}}> {children}</Button>
    );
    expect(renderedComponent.find('button').length).toEqual(1);
    expect(renderedComponent.find('button').hasClass('ui icon button')).toEqual(true);
    expect(renderedComponent.contains(children)).toEqual(true);
  });
});
