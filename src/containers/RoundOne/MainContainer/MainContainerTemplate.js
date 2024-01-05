import React from "react";
import PropTypes from "prop-types";
import {
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import CardComponent from "../../CardComponent/CardComponent";
import CommonText from "../../../components/CommonText";
import useIsWebView from "../../../hooks/useIsWebView";
import styles from "./MainContainer.style";

const MainContainerTemplate = ({
  containers,
  onPressCard,
  selectedContainer,
}) => {
  const { isWebView } = useIsWebView();

  return (
    <ScrollView
      style={{
        ...(isWebView ? styles.webContainerStyle : styles.containerStyle),
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
  );
};

MainContainerTemplate.defaultProps = {
  selectedContainer: null,
};

MainContainerTemplate.propTypes = {
  containers: PropTypes.array.isRequired,
  onPressCard: PropTypes.func.isRequired,
  selectedContainer: PropTypes.number,
};

export default MainContainerTemplate;
