import React from 'react';
import {View} from '@unthinkable/react-core-components';

function Row({style, children, isFillSpace}) {
  const rowStyle = {...style};
  if (isFillSpace) {
    rowStyle.flexGrow = 1;
  }

  return <View style={rowStyle}>{children}</View>;
}

Row.defaultProps = {
  style: {
    display: "flex",
    flexDirection: "column",
    flexShrink: 0
  },
  isFillSpace: false,
};

export default Row;
