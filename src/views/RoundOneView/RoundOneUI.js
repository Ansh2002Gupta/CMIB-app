import React, { useContext } from "react";
import PropTypes from "prop-types";
import { MediaQueryContext } from "@unthinkable/react-theme";
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "@unthinkable/react-core-components";

import CardComponent from "../../containers/CardComponent/CardComponent";
import CommonText from "../../components/CommonText";
import Header from "../../components/Header/Header";
import images from "../../images";
import styles from "./roundOne.style";

const RoundOneUI = (props) => {
  const { containers, onPressCard, selectedContainer, intl } = props;
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const isWebView = currentBreakpoint !== "xs";

  return (
    <View style={styles.innerContainer}>
      <Header
        headerText={intl.formatMessage({ id: "label.round1" })}
        customHeaderTextStyle={{
          ...styles.headerTextStyle,
          ...(isWebView ? styles.webHeaderTextStyle : null),
        }}
        iconLeft={images.iconDrawer}
        iconRight={images.iconNotification}
      />
      <ScrollView
        style={{
          ...styles.containerStyle,
          ...(isWebView ? styles.webContainerStyle : {}),
        }}
        showsVerticalScrollIndicator={false}
      >
        {containers.map((container) => (
          <TouchableOpacity
            onPress={() => {
              onPressCard(container.id);
            }}
            style={styles.buttonStyle}
          >
            <CardComponent
              customCardComponentStyle={{
                ...styles.componentStyle,
                ...(isWebView && selectedContainer === container.id
                  ? styles.webActiveComponentStyle
                  : isWebView
                  ? styles.webComponentStyle
                  : {}),
              }}
            >
              <View>
                <Image style={styles.imageStyle} source={container.image} />
              </View>
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
    </View>
  );
};

RoundOneUI.propTypes = {
  containers: PropTypes.array.isRequired,
  onPressCard: PropTypes.func.isRequired,
  selectedContainer: PropTypes.number,
};

export default RoundOneUI;
