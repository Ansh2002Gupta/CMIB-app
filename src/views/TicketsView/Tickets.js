import React from 'react'
import { View, Text } from '@unthinkable/react-core-components'

import styles from './Tickets.style'
import CustomTextInput from '../../components/CustomTextInput'
import TableView from '../../core/layouts/TableLayout/TableView'

const gridData = [
  ['Cell 1-1', 'Cell 1-2', 'Cell 1-3'],
  ['Cell 2-1', 'Cell 2-2', 'Cell 2-3'],
  ['Cell 3-1', 'Cell 3-2', 'Cell 3-3'],
  // Add more rows and columns as needed
];

const Tickets = () => {
  return (
    <View style={styles.container}>
     <TableView gridData={gridData} />
    </View>
  )
}

export default Tickets