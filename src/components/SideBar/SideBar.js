import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import {
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import images from "../../images";
import colors from "../../assets/colors";
import styles from "./SideBar.style";

const SideBar = ({ items, handleItemListRendering }) => {
  const intl = useIntl();
  const [currentList, setCurrentList] = useState(items);
  const [selectedList, setSelectedList] = useState(null);
  const [selectedSubList, setSelectedSubList] = useState(null);
  const [showStaticContent, setShowStaticContent] = useState(true);

  const renderSubItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.subList,
        selectedSubList === item.id && styles.selectedItemBackground,
      ]}
      onPress={() => {
        setSelectedSubList(item.id);
        setSelectedList(null);
      }}
    >
      <CommonText
        customTextStyle={[
          styles.subListText,
          selectedSubList === item.id && styles.selectedItem,
        ]}
        title={item.title}
      />
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <View>
      <TouchableOpacity
        style={[
          styles.list,
          selectedList === item.id && styles.selectedItemBackground,
        ]}
        onPress={() => setSelectedList(item.id)}
      >
        <CommonText
          customTextStyle={{
            ...styles.listText,
            ...(selectedList === item.id && styles.selectedItem),
            ...(item.subitems &&
              item.subitems.length > 0 && { color: colors.subHeadingGray }),
          }}
          title={item.title}
        />
      </TouchableOpacity>
      {item.subitems && (
        <FlatList
          data={item.subitems}
          renderItem={renderSubItem}
          keyExtractor={(subitem) => subitem.id}
        />
      )}
    </View>
  );

  useEffect(() => {
    setCurrentList(items);
  }, [items]);

  const handleRenderList = () => {
    handleItemListRendering();
    setShowStaticContent(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Image source={images.iconCmibLogoWhite} />
      </View>
      {showStaticContent && (
        <>
          <View>
            <CommonText
              customTextStyle={styles.moduleText}
              title={intl.formatMessage({
                id: "label.module",
              })}
            />
            <View style={styles.textView}>
              <CommonText
                customTextStyle={styles.newQualifiedText}
                title={intl.formatMessage({
                  id: "label.newely_qualified_placements",
                })}
              />
              <TouchableOpacity onPress={handleRenderList}>
                <CommonText
                  customTextStyle={styles.changeText}
                  title={intl.formatMessage({ id: "label.change" })}
                />
              </TouchableOpacity>
            </View>
          </View>
          <CommonText
            customTextStyle={styles.sessionText}
            title={intl.formatMessage({ id: "label.session" })}
          />
        </>
      )}
      <View style={styles.container}>
        <FlatList
          data={currentList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.bottomView}>
        <View style={styles.imageTextView}>
          <Image source={images.iconFooterGlobal} style={styles.globalIcon} />
          <CommonText
            customTextStyle={styles.visitWebsiteText}
            title={intl.formatMessage({ id: "label.visit_website" })}
          />
        </View>
        <Image source={images.iconRightArrow} style={styles.globalIcon} />
      </View>
    </View>
  );
};

SideBar.propTypes = {
  items: PropTypes.array.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default SideBar;
