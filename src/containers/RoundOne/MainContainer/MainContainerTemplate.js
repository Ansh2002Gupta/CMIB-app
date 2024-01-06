import React from "react";
import PropTypes from "prop-types";
import {
  Image,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import CardComponent from "../../CardComponent";
import CommonText from "../../../components/CommonText";
import useIsWebView from "../../../hooks/useIsWebView";
import styles from "./MainContainer.style";

const MainContainerTemplate = ({ onPressCard, roundOneTabs, selectedTab }) => {
  const { isWebView } = useIsWebView();
  const isWebPlatform = Platform.OS.toLowerCase() === "web";

  return (
    <ScrollView
      style={{
        ...(!isWebPlatform ? styles.mobContainer : {}),
        ...(isWebView ? styles.webContainerStyle : styles.containerStyle),
      }}
      showsVerticalScrollIndicator={false}
    >
      {roundOneTabs.map((container, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            onPressCard(container.id);
          }}
          style={styles.buttonStyle}
        >
          <CardComponent
            customCardComponentStyle={{
              ...styles.componentStyle,
              ...(isWebView && selectedTab === container.id
                ? styles.webActiveComponentStyle
                : isWebView
                ? styles.webComponentStyle
                : {}),
            }}
          >
            <Image style={styles.imageStyle} source={container.image} />
            <View
              style={{
                ...styles.addApplicationView,
                ...(isWebView ? styles.webAddApplicationView : null),
              }}
            >
              <CommonText
                title={container.title}
                customTextStyle={styles.addApplicationFormText}
              />
              <CommonText
                title={container.subTitle}
                customTextStyle={styles.addApplicationFormDescriptionText}
              />
            </View>
          </CardComponent>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

MainContainerTemplate.defaultProps = {
  selectedTab: null,
};

MainContainerTemplate.propTypes = {
  onPressCard: PropTypes.func.isRequired,
  roundOneTabs: PropTypes.array.isRequired,
  selectedTab: PropTypes.number,
};

export default MainContainerTemplate;