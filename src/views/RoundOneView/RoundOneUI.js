import React from "react";
import PropTypes from "prop-types";
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "@unthinkable/react-core-components";

import CardComponent from "../../containers/CardComponent/CardComponent";
import CommonText from "../../components/CommonText";
import useIsWebView from "../../hooks/useIsWebView";
import styles from "./RoundOne.style";

const RoundOneUI = (props) => {
  const { containers, onPressCard, selectedContainer, intl } = props;
  const { isWebView } = useIsWebView();

  return (
    <View style={styles.innerContainer}>
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
                  customTextStyle={styles.addApplicationFormText}
                  fontWeight="600"
                >
                  {container.title}
                </CommonText>
                <CommonText
                  customTextStyle={styles.addApplicationFormDescriptionText}
                >
                  {container.subTitle}
                </CommonText>
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
  intl: PropTypes.object.isRequired,
  onPressCard: PropTypes.func.isRequired,
  selectedContainer: PropTypes.number,
};

export default RoundOneUI;
