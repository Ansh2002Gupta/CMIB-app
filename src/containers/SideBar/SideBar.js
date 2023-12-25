import React, { useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { useNavigate } from "../../routes";
import {
  FlatList,
  Image,
  TouchableOpacity,
  View,
  Platform,
} from "@unthinkable/react-core-components";

import Config from "../../components/ReactConfig/ReactConfig";
import CommonText from "../../components/CommonText";
import CustomList from "../../components/CustomList/CustomList";
import { navigations } from "../../constants/routeNames";
import images from "../../images";
import styles from "./SideBar.style";

const SideBar = ({
  items,
  onClose,
  onPress,
  resetList,
  showCloseIcon,
}) => {
  const intl = useIntl();
  const [selectedItem, setSelectedItem] = useState("");

  // Define a function to handle the selection of an item
  const handleSelectItem = (item) => {
    setSelectedItem(item.title);
    resetList();
  };

  const handleBottomViewNavigation = () => {
    const uri = Config.REACT_APP_CMS_URI;
    window.location.href = uri;
  };

  // Render functions for items and sub-items
  const renderItem = ({ item }) => (
    <>
      <CustomList item={item} onSelect={() => handleSelectItem(item)} />
      {item.subitems && (
        <FlatList
          data={item.subitems}
          renderItem={renderItem} // Recursive call to handle sub-items
          keyExtractor={(subitem) => subitem.id}
        />
      )}
    </>
  );

  return (
    <View style={styles.mainContainerWeb}>
      <View style={styles.container}>
        {showCloseIcon && (
          <TouchableOpacity onPress={onClose} style={styles.leftArrowButton}>
            <Image source={images.iconClose} style={styles.leftArrow} />
          </TouchableOpacity>
        )}
        <View
          style={[
            styles.imageView,
            showCloseIcon ? styles.imageViewStyles : styles.imgViewStyle,
          ]}
        >
          <Image source={images.iconCmibLogoWhite} />
        </View>
        <View>
          <CommonText
            customTextStyle={styles.moduleText}
            title={intl.formatMessage({ id: "label.module" })}
          />
          {/* Right Now It's a static data, we will replace it by dynamic data as we get API */}
          <View style={styles.textView}>
            <CommonText
              customTextStyle={styles.newQualifiedText}
              title={
                selectedItem ||
                intl.formatMessage({ id: "label.newly_qualified_placements" })
              }
            />
            <TouchableOpacity
              onPress={onPress}
              style={styles.changeTextContainer}
            >
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
        <FlatList
          data={items}
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
  );
};

SideBar.propTypes = {
  items: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
  resetList: PropTypes.func.isRequired,
  showCloseIcon: PropTypes.bool.isRequired,
};

export default SideBar;
