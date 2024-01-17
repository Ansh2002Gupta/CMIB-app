import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Platform, TextInput, View } from "@unthinkable/react-core-components";
import { useIntl } from "react-intl";

import TouchableImage from "../../components/TouchableImage";
import images from "../../images";
import { DEBOUNCE_TIME } from "../../constants/constants";
import styles from "./searchView.style";

const SearchView = ({ data,
  onSearch,
  customParentStyle,
  customInputStyle,
  searchLogic }) => {
  const SearchIcon = images.iconSearch;
  const [query, setQuery] = useState("");
  const debounceTimeout = useRef(null);
  const intl = useIntl();
  const platformSpecificProps = Platform.select({
    web: {},
    default: {
      placeholderTextColor: customInputStyle?.color
    },
  });

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      let filtered = data;
      if (query) {
        const formattedQuery = query.toLowerCase();
        if (searchLogic) {
          filtered = searchLogic(formattedQuery);
        } else {
          filtered = data.filter((item) => {
            return item.toLowerCase().includes(formattedQuery);
          });
        }
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
  }, [query, data, onSearch, searchLogic]);

  const handleSearch = (text) => {
    setQuery(text);
  };

  return (
    <View style={{ ...styles.searchParent, ...customParentStyle }}>
      <TouchableImage source={SearchIcon} disabled={true} />
      <TextInput
        style={{ ...styles.searchInput, ...customInputStyle }}
        value={query}
        onChangeText={handleSearch}
        placeholder={intl.formatMessage({ id: "label.search" })}
        {...platformSpecificProps}
      />
    </View>
  );
};

SearchView.defaultProps = {
  onSearch: () => {},
  customParentStyle: {},
  inputParentStyle: {},
  searchLogic: () => {},
}

SearchView.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.object),
  ]).isRequired,
  onSearch: PropTypes.func,
  customParentStyle: PropTypes.object,
  inputParentStyle: PropTypes.object,
  searchLogic: PropTypes.func,
};

export default SearchView;
