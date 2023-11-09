import React from 'react';
import {View} from '@unthinkable/react-core-components';

function Column({style, children, isFillSpace}) {
  const colStyle = {...style};
  if (isFillSpace) {
    colStyle.flexGrow = 1;
  }

  return <View style={colStyle}>{children}</View>;
}

Column.defaultProps = {
  style: {
    display: "flex",
    flexDirection: "column",
    flexShrink: 0
  },
  isFillSpace: false,
};

export default Column;
