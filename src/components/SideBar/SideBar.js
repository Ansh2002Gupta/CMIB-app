import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import images from "../../images";
import colors from "../../assets/colors";
import styles from "./SideBar.style";

const SideBar = ({ items, onPress }) => {
  const intl = useIntl();
  const [currentList, setCurrentList] = useState(items);
  const [selectedList, setSelecteList] = useState(null);
  const [selectedSubList, setSelecteSubList] = useState(null);
  const [showStaticContent, setShowStaticContent] = useState(true);

  const renderSubItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.subList,
        selectedSubList === item.id && styles.selectedItemBackground,
      ]}
      onPress={() => {
        setSelecteSubList(item.id);
        setSelecteList(null);
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
        onPress={() => setSelecteList(item.id)}
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
      {/* Render subitems if any */}
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

  const handleOnPress = () => {
    onPress();
    setShowStaticContent(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Image source={images.iconCmibLogoWhite} />
      </View>
      {showStaticContent && (
        <>
          <View style={styles.textImageView}>
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
              <TouchableOpacity onPress={handleOnPress}>
                <CommonText
                  customTextStyle={styles.changeText}
                  title={intl.formatMessage({ id: "label.change" })}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <CommonText
              customTextStyle={styles.sessionText}
              title={intl.formatMessage({ id: "label.session" })}
            />
          </View>
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
