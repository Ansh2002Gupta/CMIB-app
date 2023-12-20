import React,{ useState } from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, FlatList, Text } from '@unthinkable/react-core-components';

import styles from './searchView.style'
const SearchView = ({ data }) => {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = text => {
    setQuery(text);
    if (text) {
      const formattedQuery = text.toLowerCase();
      const filtered = data.filter(item => {
        return item.toLowerCase().includes(formattedQuery);
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={handleSearch}
        placeholder="Search"
      />
      {/* <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
      /> */}
    </View>
  );
};
SearchView.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default SearchView;
