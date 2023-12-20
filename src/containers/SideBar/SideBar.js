import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { useNavigate } from "../../routes";
import { navigations } from "../../constants/routeNames";
import {
  FlatList,
  Image,
  Platform,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import CustomList from "../../components/CustomList/CustomList";
import { CMS_URI } from "../../constants/constants";
import images from "../../images";
import styles from "./SideBar.style";

const SideBar = ({
  handleDisplayHeader,
  onClose,
  onPress,
  resetList,
  showCloseIcon,
  items,
}) => {
  const navigate = useNavigate();
  const intl = useIntl();
  const [currentList, setCurrentList] = useState(items);
  const [selectedList, setSelecteList] = useState(null);
  const [selectedSubList, setSelecteSubList] = useState(null);
  const [showStaticContent, setShowStaticContent] = useState(true);
  const [showBackIcon, setShowBackIcon] = useState(false);
  const [showClose, setShowClose] = useState(true);

  const renderSubItem = ({ item }) => (
    <CustomList
      item={{ ...item, isSelected: selectedSubList === item.id }}
      onSelect={(id) => {
        setSelecteSubList(item.id);
        setSelecteList(null);
      }}
    />
  );
  const renderItem = ({ item }) => (
    <>
      <CustomList
        item={{ ...item, isSelected: selectedList === item.id }}
        onSelect={(id) => {
          setSelecteList(id);
          setSelecteSubList(null);
        }}
      />
      {item.subitems && (
        <FlatList
          data={item.subitems}
          renderItem={renderSubItem}
          keyExtractor={(subitem) => subitem.id}
        />
      )}
    </>
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
  const handleBottomViewNavigation = () => {
    if (Platform.OS === "web") {
      window.location.replace(CMS_URI);
    } else {
      onClose();
      navigate(navigations.WEB_VIEW, {
        state: { uri: CMS_URI },
      });
      handleDisplayHeader();
    }
  };
  const dynamicPadding =
    showBackIcon || showClose ? styles.imageViewStyles : styles.imgViewStyle;

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
        <View style={[styles.imageView, dynamicPadding]}>
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
        <TouchableOpacity
          style={styles.bottomView}
          onPress={handleBottomViewNavigation}
        >
          <View style={styles.imageTextView}>
            <Image source={images.iconFooterGlobal} style={styles.globalIcon} />
            <CommonText
              customTextStyle={styles.visitWebsiteText}
              title={intl.formatMessage({ id: "label.visit_website" })}
            />
          </View>
          <Image source={images.iconRightArrow} style={styles.globalIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

SideBar.propTypes = {
  handleDisplayHeader: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
  resetList: PropTypes.func.isRequired,
  showCloseIcon: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
};

export default SideBar;
