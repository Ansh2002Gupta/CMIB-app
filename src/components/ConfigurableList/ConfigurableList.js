import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@unthinkable/react-theme";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";
import CommonText from "../CommonText";
import CustomImage from "../CustomImage";
import CustomTextInput from "../CustomTextInput";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import TouchableImage from "../TouchableImage";
import classes from "../../theme/styles/CssClassProvider";
import images from "../../images";
import getStyles from "./ConfigurableListStyle";

const ConfigurableList = ({
  isEditable,
  options,
  customOuterContianer,
  menuOptions,
  onAdd,
  onDelete,
  onPress,
  searchQuery,
  selectedOptions,
  setMenuOptions,
  setSearchQuery,
  title,
  idField = "id",
  nameField = "name",
  outerContainer = {},
  componentContainer = {},
  handlePressCustom,
  optionFormatter,
}) => {
  const intl = useIntl();
  const theme = useTheme();
  const styles = getStyles(theme);
  const allOptions = useRef([]);

  const defaultOptionFormatter = (option) => ({
    id: String(option[idField]),
    name: String(option[nameField]),
  });

  const items = options?.map(
    optionFormatter ? optionFormatter : defaultOptionFormatter
  );

  useEffect(() => {
    allOptions.current = items;
    setMenuOptions(items);
  }, [options]);

  const handleSearch = (query, keyName) => {
    const queryList = fetchData(query, keyName);
    setMenuOptions(queryList);
  };

  const handleTextChange = (newText) => {
    setSearchQuery(newText || "");
    if (newText?.length > 0) {
      handleSearch(newText, "name");
    } else {
      setMenuOptions([...allOptions.current]);
    }
  };

  const fetchData = (query, keyName) => {
    const list = allOptions.current.filter((item) =>
      item?.[keyName].trim().toLowerCase().includes(query?.trim().toLowerCase())
    );
    return list;
  };

  return (
    <View style={{ ...styles.outerContainer, ...customOuterContianer }}>
      <View style={{ ...styles.componentContainer, ...componentContainer }}>
        <View style={styles.header}>
          <CommonText customTextStyle={styles.titleStyles} fontWeight={"600"}>
            {title}
          </CommonText>
          {isEditable && (
            <TouchableImage
              onPress={onAdd}
              parentStyle={styles.iconAdd}
              source={images.iconAdd}
              isSvg={false}
            />
          )}
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
            {menuOptions?.length > 0 &&
              menuOptions.map((item, index) => (
                <CustomTouchableOpacity
                  key={index}
                  className={
                    selectedOptions.includes(item.id)
                      ? `${classes["configurableList__item--green"]}`
                      : ``
                  }
                  onPress={() => {
                    if (handlePressCustom) {
                      handlePressCustom(item);
                    } else {
                      onPress(item.id);
                    }
                  }}
                  style={[
                    styles.itemContainer,
                    selectedOptions.includes(item.id)
                      ? styles.selectedBackground
                      : styles.unselectedBackground,
                  ]}
                >
                  <CommonText
                    fontWeight={"500"}
                    customTextStyle={{
                      ...styles.item,
                      ...(selectedOptions.includes(item.id)
                        ? styles.selectedTextColor
                        : styles.unselectedTextColor),
                    }}
                    className={{ className: classes["item--black"] }}
                  >
                    {item.name}
                  </CommonText>
                  {selectedOptions.includes(item.id) && isEditable && (
                    <TouchableImage
                      className={classes["iconTrash"]}
                      onPress={() =>
                        onDelete({
                          itemToBeDeletedId: item.id,
                          prevState: allOptions,
                        })
                      }
                      isSvg={false}
                      source={images.iconTrashBlack}
                      style={styles.iconTrash}
                    />
                  )}
                </CustomTouchableOpacity>
              ))}
            {!menuOptions?.length && (
              <CommonText customTextStyle={styles.message} fontWeight={"500"}>
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
  isEditable: true,
  onAdd: () => {},
  onDelete: () => {},
  onPress: () => {},
  options: [],
  allOptions: [],
  menuOptions: [],
  searchQuery: [],
  selectedOptions: [],
  setMenuOptions: () => {},
  setSearchQuery: () => {},
  title: "DefaultTitle",
};

ConfigurableList.protoTypes = {
  isEditable: PropTypes.bool,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
  onPress: PropTypes.func,
  options: PropTypes.array,
  allOptions: PropTypes.array,
  menuOptions: PropTypes.array,
  searchQuery: PropTypes.array,
  selectedOptions: PropTypes.array,
  setMenuOptions: PropTypes.func,
  setSearchQuery: PropTypes.func,
  title: PropTypes.string,
};

export default ConfigurableList;
