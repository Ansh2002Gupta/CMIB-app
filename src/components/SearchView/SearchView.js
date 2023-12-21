import React, { useState } from "react";
import { View, TextInput } from "@unthinkable/react-core-components";

import TouchableImage from "../../components/TouchableImage/TouchableImage";
import images from "../../images";
import styles from "./searchView.style";

const SearchView = ({ data, onSearch }) => {
  const [query, setQuery] = useState("");
  const SearchIcon = images.iconSearch;
   
  const handleSearch = (text) => {
    setQuery(text);
    let filtered = data;
    if (text) {
      const formattedQuery = text.toLowerCase();
      filtered = data.filter((item) => {
        return item.toLowerCase().includes(formattedQuery);
      });
    }
    if (onSearch) {
      onSearch(filtered);
    }
  };

  return (
    <View style={styles.searchParent}>
      <TouchableImage source={SearchIcon} disabled={true} />
      <TextInput
        style={styles.searchInput}
        value={query}
        onChangeText={handleSearch}
        placeholder="Search"
      />
    </View>
  );
};

export default SearchView;
