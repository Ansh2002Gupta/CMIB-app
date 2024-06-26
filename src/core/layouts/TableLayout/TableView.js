import React from 'react';
import PropTypes from "prop-types";
import { View } from '@unthinkable/react-core-components'; 

import layoutStyle from './TableView.style';
import CommonText from '../../../components/CommonText';
function TableView({ gridData, cellStyle, rowStyle, tableStyle }) {
  
  return (
    <View style={tableStyle}>
      {gridData.map((rowData, rowIndex) => (
        <View key={`row-${rowIndex}`} style={{ ...rowStyle, ...layoutStyle }}>
          {rowData.map((cellData, colIndex) => (
            <View key={`cell-${rowIndex}-${colIndex}`} style={cellStyle}>
              <CommonText>{cellData}</CommonText>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

TableView.defaultProps = {
  cellStyle: {},
  rowStyle: {},
  tableStyle: {},
};

TableView.propTypes = {
  gridData: PropTypes.arrayOf(PropTypes.array).isRequired, 
  cellStyle: PropTypes.object,
  rowStyle: PropTypes.object,
  tableStyle: PropTypes.object,
};

export default TableView;


/** how to file method
 * 
function App() {
  const gridData = [
    ['Cell 1-1', 'Cell 1-2', 'Cell 1-3'],
    ['Cell 2-1', 'Cell 2-2', 'Cell 2-3'],
    ['Cell 3-1', 'Cell 3-2', 'Cell 3-3'],
    // Add more rows and columns as needed
  ];

  // Define styles for cells, rows, and the table itself
  const cellStyle = { padding: 10, border: '1px solid black' };
  const rowStyle = { marginBottom: 5 };
  const tableStyle = { marginTop: 20 };

  return (
    <TableLayout
      gridData={gridData}
      cellStyle={cellStyle}
      rowStyle={rowStyle}
      tableStyle={tableStyle}
    />
  );
}
 */