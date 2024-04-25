import React from "react";
import { useTheme } from "@unthinkable/react-theme";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import {
  Image,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import { TwoRow } from "../../../core/layouts";

import CardComponent from "../../../components/CardComponent";
import CommonText from "../../../components/CommonText";
import IconHeader from "../../../components/IconHeader/IconHeader";
import useIsWebView from "../../../hooks/useIsWebView";
import classes from "../../../theme/styles/CssClassProvider";
import getStyles from "./MainContainer.style";

const MainContainerTemplate = ({
  onPressCard,
  roundOneTabs,
  selectedTab,
  hasRoundone,
}) => {
  const { isWebView } = useIsWebView();
  const intl = useIntl();
  const theme = useTheme();
  const styles = getStyles(theme);
  const isWebPlatform = Platform.OS.toLowerCase() === "web";

  const cardComponentWebProps = isWebPlatform
    ? { className: classes["card-box__outline--green"] }
    : {};

  return (
    <ScrollView
      style={{
        ...(!isWebPlatform ? styles.mobContainer : {}),
      }}
      showsVerticalScrollIndicator={false}
    >
      <TwoRow
        topSection={
          <IconHeader
            headerText={
              hasRoundone
                ? intl.formatMessage({ id: "label.round1" })
                : intl.formatMessage({ id: "label.round2" })
            }
          />
        }
        bottomSectionStyle={{
          ...(isWebView ? styles.webContainerStyle : styles.containerStyle),
        }}
        bottomSection={
          <>
            {roundOneTabs.map((container, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  onPressCard(container.id);
                }}
                style={styles.buttonStyle}
              >
                <CardComponent
                  customStyle={{
                    ...styles.componentStyle,
                    ...(isWebView ? styles.webComponentStyle : {}),
                  }}
                  {...cardComponentWebProps}
                >
                  <Image style={styles.imageStyle} source={container.image} />
                  <View
                    style={{
                      ...styles.addApplicationView,
                      ...(isWebView ? styles.webAddApplicationView : null),
                    }}
                  >
                    <CommonText
                      customTextStyle={styles.addApplicationFormText}
                      fontWeight={"600"}
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
          </>
        }
      />
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
