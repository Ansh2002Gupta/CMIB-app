import React from 'react';
import { View } from '@unthinkable/react-core-components';

import { Column, Row } from '../../components';
import layoutStyle from './base.style';

function Base({ style, children, onPress }) {
  return (
    <View style={{ ...layoutStyle, ...style }} onPress={onPress}>
      {typeof children === 'function' ? children({ Row, Column }) : children}
    </View>
  );
}

Base.defaultProps = {
  style: {},
};

export default Base;
