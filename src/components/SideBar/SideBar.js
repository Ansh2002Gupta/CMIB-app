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

const SideBar = ({ items, onPress, resetList, showCloseIcon, onClose }) => {
  const intl = useIntl();
  const [currentList, setCurrentList] = useState(items);
  const [selectedList, setSelecteList] = useState(null);
  const [selectedSubList, setSelecteSubList] = useState(null);
  const [showStaticContent, setShowStaticContent] = useState(true);
  const [showBackIcon, setShowBackIcon] = useState(false);
  const [showClose, setShowClose] = useState(true);

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
        onPress={() => {
          setSelecteList(item.id);
          setSelecteSubList(null);
        }}
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

  const handleOnPress = () => {
    onPress();
    setShowBackIcon(true);
    setShowClose(false);
    setShowStaticContent(false);
  };

  const resetSidebar = () => {
    setShowBackIcon(false);
    setShowStaticContent(true);
    setShowClose(true);
    resetList();
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        {showBackIcon ? (
          <TouchableOpacity
            onPress={resetSidebar}
            style={styles.leftArrowButton}
          >
            <Image source={images.iconLeftArrow} style={styles.leftArrow} />
          </TouchableOpacity>
        ) : null}
        {showCloseIcon && showClose ? (
          <TouchableOpacity
            onPress={() => {
              onClose();
            }}
            style={styles.leftArrowButton}
          >
            <Image source={images.iconClose} style={styles.leftArrow} />
          </TouchableOpacity>
        ) : null}
        <View
          style={[
            styles.imageView,
            { paddingTop: showBackIcon || showClose ? 24 : 40 },
          ]}
        >
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
                <TouchableOpacity onPress={handleOnPress}>
                  <CommonText
                    customTextStyle={styles.changeText}
                    title={intl.formatMessage({ id: "label.change" })}
                  />
                </TouchableOpacity>
              </View>
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
    </View>
  );
};

SideBar.propTypes = {
  items: PropTypes.array.isRequired,
  onPress: PropTypes.func.isRequired,
  resetList: PropTypes.func.isRequired,
  showCloseIcon: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SideBar;
