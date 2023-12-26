import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { View, TextInput } from "@unthinkable/react-core-components";

import { DEBOUNCE_TIME } from "../../constants/constants";
import TouchableImage from "../../components/TouchableImage";
import images from "../../images";
import styles from "./searchView.style";

const SearchView = ({ data, onSearch }) => {
  const SearchIcon = images.iconSearch;
  const [query, setQuery] = useState("");
  const debounceTimeout = useRef(null);

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      let filtered = data;
      if (query) {
        const formattedQuery = query.toLowerCase();
        filtered = data.filter((item) => {
          return item.toLowerCase().includes(formattedQuery);
        });
      }
      if (onSearch) {
        onSearch(filtered);
      }
    }, DEBOUNCE_TIME);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [query, data, onSearch]);

  const handleSearch = (text) => {
    setQuery(text);
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

SearchView.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSearch: PropTypes.func,
};

export default SearchView;
