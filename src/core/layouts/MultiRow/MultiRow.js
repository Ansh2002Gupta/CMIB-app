import React from 'react';
import PropTypes from "prop-types";
import BaseLayout from '../Base';

import layoutStyle from './MultiRows.style';

function MultiRow({
  style,
  rows,
}) {
  return (
    <BaseLayout style={{...layoutStyle, ...style}}>
      {({Row}) => (
        <>
          {rows.map((rowConfig, index) => (
            <Row
              key={`row-${index}`}
              isFillSpace={rowConfig.isFillSpace}
              style={rowConfig.style}>
              {rowConfig.content}
            </Row>
          ))}
        </>
      )}
    </BaseLayout>
  );
}

MultiRow.defaultProps = {
  style: {},
  rows: [], 
};

MultiRow.propTypes = {
  style: PropTypes.object,
  rows: PropTypes.arrayOf(PropTypes.shape({
    isFillSpace: PropTypes.bool,
    style: PropTypes.object,
    content: PropTypes.node, 
  })),
};

export default MultiRow;


/** how to file method
 * 
 
const rowConfigs = [
  {
    content: <SomeComponent />,
    style: { backgroundColor: 'lightblue' },
    isFillSpace: false,
  },
  {
    content: <AnotherComponent />,
    style: { backgroundColor: 'lightgreen' },
    isFillSpace: true,
  },
  // Add more row configurations as needed
];

function App() {
  return (
    <MultiRow rows={rowConfigs} />
  );
}
  
 */