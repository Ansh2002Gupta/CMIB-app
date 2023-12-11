import React, { useContext, useState, useEffect } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { MediaQueryContext } from "@unthinkable/react-theme";
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
} from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import CardComponent from "../../containers/CardComponent/CardComponent";
import Header from "../../components/Header/Header";
import styles from "./roundOne.style";

const RoundOneUI = (props) => {
  const intl = useIntl();
  const { containers, onPressCard, selectedContainer } = props;
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const isWebView = currentBreakpoint !== "xs";

  return (
    <Header
      headerText={intl.formatMessage({ id: "label.round1" })}
      customHeaderTextStyle={{
        ...styles.headerTextStyle,
        ...(isWebView ? styles.webHeaderTextStyle : null),
      }}
    >
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
    </Header>
  );
};

RoundOneUI.propTypes = {
  containers: PropTypes.array.isRequired,
  onPressCard: PropTypes.func.isRequired,
  selectedContainer: PropTypes.number,
};

export default RoundOneUI;
