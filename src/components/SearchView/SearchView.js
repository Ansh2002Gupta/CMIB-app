import React, { useRef, useState } from "react";
import { useTheme } from "@unthinkable/react-theme";
import PropTypes from "prop-types";
import { Platform, TextInput, View } from "@unthinkable/react-core-components";

import TouchableImage from "../../components/TouchableImage";
import images from "../../images";
import { DEBOUNCE_TIME } from "../../constants/constants";
import getStyles from "./searchView.style";

const SearchView = ({
  customInputStyle,
  customParentStyle,
  customSearchCriteria,
  data,
  onSearch,
  placeholder,
  onChangeDropDownText,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const SearchIcon = images.iconSearch;
  const ClearIcon = images.iconCross;
  const [query, setQuery] = useState("");
  const debounceTimeout = useRef(null);
  const platformSpecificProps = Platform.select({
    web: {},
    default: {
      placeholderTextColor: customInputStyle?.color,
    },
  });

  const handleSearch = (text) => {
    setQuery(text);
    if (!text.length) {
      clearSearch();
    }
    if (text.length < 3) {
      return;
    }

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(async () => {
      let filtered = data;
      if (onChangeDropDownText) {
        onChangeDropDownText(text);
      } else {
        const formattedQuery = text?.toLowerCase();
        if (customSearchCriteria) {
          filtered = customSearchCriteria(formattedQuery);
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
    setQuery(text);
  };

  const clearSearch = () => {
    setQuery("");
    onChangeDropDownText && onChangeDropDownText("");
    onSearch(data);
    customSearchCriteria("");
  };

  return (
    <View style={{ ...styles.searchParent, ...customParentStyle }}>
      <TouchableImage source={SearchIcon} disabled={true} />
      <TextInput
        style={{ ...styles.searchInput, ...customInputStyle }}
        value={query}
        onChangeText={handleSearch}
        placeholder={placeholder}
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
  data: [],
  placeholder: "Search",
};

SearchView.propTypes = {
  customInputStyle: PropTypes.object,
  customParentStyle: PropTypes.object,
  customSearchCriteria: PropTypes.func,
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.object),
  ]),
  placeholder: PropTypes.string,
  onSearch: PropTypes.func,
  onChangeDropDownText: PropTypes.func,
};

export default SearchView;
