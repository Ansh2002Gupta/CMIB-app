import React from 'react';
import BaseLayout from '../Base';
import layoutStyle from './multiColumn.style';

function MultiColumn({ style, columns }) {
  return (
    <BaseLayout style={{ ...layoutStyle, ...style }}>
      {({ Row,Column }) => (
        <>
          {columns.map((columnConfig, index) => (
            <Column
              key={`column-${index}`}
              isFillSpace={columnConfig.isFillSpace}
              style={columnConfig.style}>
              {columnConfig.content}
            </Column>
          ))}
        </>
      )}
    </BaseLayout>
  );
}

MultiColumn.defaultProps = {
  style: {},
  columns: [], // Expecting an array of column configurations
};

export default MultiColumn;

/** how to file method
 * 
const columnConfigs = [
  {
    content: <ComponentForFirstColumn />,
    style: { backgroundColor: 'lightblue' },
    isFillSpace: false,
  },
  {
    content: <ComponentForSecondColumn />,
    style: { backgroundColor: 'lightgreen' },
    isFillSpace: true,
  },
  // Add more column configurations as needed
];

function App() {
  return (
    <MultiColumn columns={columnConfigs} />
  );
}
  
 */