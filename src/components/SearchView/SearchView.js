import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Platform, TextInput, View } from "@unthinkable/react-core-components";

import TouchableImage from "../../components/TouchableImage";
import images from "../../images";
import { DEBOUNCE_TIME } from "../../constants/constants";
import styles from "./searchView.style";

const SearchView = ({
  customInputStyle,
  customParentStyle,
  customSearchCriteria,
  data,
  onSearch,
}) => {
  const SearchIcon = images.iconSearch;
  const ClearIcon = images.iconCross;
  const [query, setQuery] = useState("");
  const debounceTimeout = useRef(null);
  const intl = useIntl();
  const platformSpecificProps = Platform.select({
    web: {},
    default: {
      placeholderTextColor: customInputStyle?.color,
    },
  });

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      let filtered = data;
      const formattedQuery = query.toLowerCase();
      if (customSearchCriteria) {
        filtered = customSearchCriteria(formattedQuery);
      } else {
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
  }, [query]);

  const handleSearch = (text) => {
    setQuery(text);
  };

  const clearSearch = () => {
    setQuery("");
    onSearch([]);
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
      {query.length > 0 && (
        <TouchableImage
          source={ClearIcon}
          onPress={clearSearch}
          imageStyle={styles.clearIcon}
          isSvg={false}
        />
      )}
    </View>
  );
};

SearchView.defaultProps = {
  customInputStyle: {},
  customParentStyle: {},
  customSearchCriteria: () => {},
  onSearch: () => {},
};

SearchView.propTypes = {
  customInputStyle: PropTypes.object,
  customParentStyle: PropTypes.object,
  customSearchCriteria: PropTypes.func,
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.object),
  ]).isRequired,
  onSearch: PropTypes.func,
};

export default SearchView;
