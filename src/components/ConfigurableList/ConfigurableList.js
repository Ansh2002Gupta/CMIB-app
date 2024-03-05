import React, { useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";
import CommonText from "../CommonText";
import CustomImage from "../CustomImage";
import CustomTextInput from "../CustomTextInput";
import TouchableImage from "../TouchableImage";
import classes from "../../theme/styles/CssClassProvider";
import images from "../../images";
import styles from "./ConfigurableListStyle";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import colors from "../../assets/colors";

const ConfigurableList = ({
  onDelete,
  onPress,
  items,
  menuOptionsPrevState,
  menuOptions,
  searchQuery,
  selectedOptions,
  setMenuOptions,
  setSearchQuery,
  title,
}) => {
  const intl = useIntl();

  useEffect(() => {
    menuOptionsPrevState.current = items;
    setMenuOptions(items);
  }, []);

  const handleSearch = (query, keyName) => {
    const queryList = fetchData(query, keyName);
    setMenuOptions(queryList);
  };

  const handleTextChange = (newText) => {
    setSearchQuery(newText || "");
    if (newText?.length > 0) {
      handleSearch(newText, "name");
    } else {
      setMenuOptions([...menuOptionsPrevState.current]);
    }
  };

  const fetchData = (query, keyName) => {
    const list = menuOptionsPrevState.current.filter((item) =>
      item?.[keyName].trim().toLowerCase().includes(query?.trim().toLowerCase())
    );
    return list;
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.componentContainer}>
        <View style={styles.header}>
          <CommonText customTextStyle={styles.titleStyles}>{title}</CommonText>
          <TouchableImage
            onPress={undefined}
            parentStyle={styles.iconAdd}
            source={images.iconAdd}
          />
        </View>
        <View style={styles.outerSearchWrapper}>
          <CustomImage style={styles.iconSearch} source={images.iconSearch} />
          <CustomTextInput
            customStyle={styles.searchInput}
            customTextInputOuterContainer={styles.outerSearchInputBox}
            onChangeText={(newText) => handleTextChange(newText)}
            placeholder="Search"
            value={searchQuery}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.itemsWrapper}>
            {!!menuOptions?.length > 0 &&
              menuOptions.map((item) => (
                <CustomTouchableOpacity
                  className={`${classes["configurableList__item--green"]}`}
                  onPress={() => onPress(item.id)}
                  style={[
                    styles.itemContainer,
                    selectedOptions.includes(item.id) && {
                      backgroundColor: colors.shallowGreen,
                    },
                  ]}
                >
                  <CommonText
                    customTextStyle={[
                      styles.item,
                      selectedOptions.includes(item.id) && {
                        color: colors.black,
                      },
                    ]}
                    customTextProps={{ className: classes["item--black"] }}
                  >
                    {item.name}
                  </CommonText>
                  {selectedOptions.includes(item.id) && (
                    <TouchableImage
                      className={classes["iconTrash"]}
                      onPress={() => onDelete(item.id)}
                      source={images.iconTrashSvg}
                      style={styles.iconTrash}
                    />
                  )}
                </CustomTouchableOpacity>
              ))}
            {!menuOptions?.length && (
              <CommonText customTextStyle={styles.message}>
                {intl.formatMessage({ id: "label.noResultFound" })}
              </CommonText>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

ConfigurableList.defaultProps = {
  onDelete: () => {},
  onPress: () => {},
  items: [],
  menuOptionsPrevState: [],
  menuOptions: [],
  searchQuery: [],
  selectedOptions: [],
  setMenuOptions: () => {},
  setSearchQuery: () => {},
  title: "DefaultTitle",
  items: [],
};

ConfigurableList.protoTypes = {
  onDelete: PropTypes.func,
  onPress: PropTypes.func,
  items: PropTypes.array,
  menuOptionsPrevState: PropTypes.array,
  menuOptions: PropTypes.array,
  searchQuery: PropTypes.array,
  selectedOptions: PropTypes.array,
  setMenuOptions: PropTypes.func,
  setSearchQuery: PropTypes.func,
  title: PropTypes.string,
  items: PropTypes.array,
};

export default ConfigurableList;
