import React from "react";
import { useIntl } from "react-intl";
import { Platform, ScrollView, View } from "@unthinkable/react-core-components";

import { TwoRow } from "../../../core/layouts";

import CardComponent from "../../../components/CardComponent";
import CommonText from "../../../components/CommonText";
import CustomImage from "../../../components/CustomImage";
import CustomTouchableOpacity from "../../../components/CustomTouchableOpacity";
import IconHeader from "../../../components/IconHeader/IconHeader";
import useIsWebView from "../../../hooks/useIsWebView";
import classes from "../../../theme/styles/CssClassProvider";
import styles from "./CandidateRoundOneContainer.style";

const CandidateRoundOneContainerTemplate = ({ roundOneCards, onPressCard }) => {
  const { isWebView } = useIsWebView();
  const isWebPlatform = Platform.OS.toLowerCase() === "web";
  const intl = useIntl();

  const cardComponentWebProps = isWebPlatform
    ? { className: classes["card-box__outline--green"] }
    : {};

  return (
    <ScrollView style={{ flex: 1 }}>
      <TwoRow
        topSection={
          <IconHeader headerText={intl.formatMessage({ id: "label.round1" })} />
        }
        bottomSection={
          <TwoRow
            topSection={
              <View
                style={{
                  ...(!isWebPlatform ? styles.mobContainer : {}),
                  ...(isWebView
                    ? styles.webContainerStyle
                    : styles.containerStyle),
                }}
              >
                {roundOneCards.map(
                  (card, index) =>
                    index < 3 && (
                      <CustomTouchableOpacity
                        key={index}
                        onPress={() => {
                          onPressCard(card.id);
                        }}
                        style={styles.mainStyle}
                      >
                        <CardComponent
                          customStyle={{
                            ...styles.componentStyle,
                            ...(isWebView ? styles.webComponentStyle : {}),
                          }}
                          {...cardComponentWebProps}
                        >
                          <View style={styles.imageContainer}>
                            <CustomImage
                              style={styles.imageStyle}
                              source={card.image}
                            />
                          </View>
                          <View
                            style={
                              isWebView ? styles.webTextView : styles.textView
                            }
                          >
                            <CommonText
                              customTextStyle={styles.titleText}
                              fontWeight={"600"}
                            >
                              {card.title}
                            </CommonText>
                            <CommonText
                              customTextStyle={styles.descriptionText}
                            >
                              {card.subTitle}
                            </CommonText>
                          </View>
                        </CardComponent>
                      </CustomTouchableOpacity>
                    )
                )}
              </View>
            }
            bottomSection={
              <View style={styles.secondRowContainer}>
                <View
                  style={{
                    ...(!isWebPlatform ? styles.mobContainer : {}),
                    ...(isWebView
                      ? styles.webContainerSecondRowStyle
                      : styles.containerStyle),
                  }}
                >
                  {roundOneCards.map(
                    (card, index) =>
                      index > 2 && (
                        <CustomTouchableOpacity
                          key={index}
                          onPress={() => {
                            onPressCard(card.id);
                          }}
                          style={styles.mainStyle}
                        >
                          <CardComponent
                            customStyle={{
                              ...styles.componentStyle,
                              ...(isWebView
                                ? styles.webComponentSecondRowStyle
                                : {}),
                            }}
                            {...cardComponentWebProps}
                          >
                            <View style={styles.imageContainer}>
                              <CustomImage
                                style={styles.imageStyle}
                                source={card.image}
                              />
                            </View>
                            <View
                              style={
                                isWebView ? styles.webTextView : styles.textView
                              }
                            >
                              <CommonText
                                customTextStyle={styles.titleText}
                                fontWeight={"600"}
                              >
                                {card.title}
                              </CommonText>
                              <CommonText
                                customTextStyle={styles.descriptionText}
                              >
                                {card.subTitle}
                              </CommonText>
                            </View>
                          </CardComponent>
                        </CustomTouchableOpacity>
                      )
                  )}
                </View>
              </View>
            }
          />
        }
      />
    </ScrollView>
  );
};

export default CandidateRoundOneContainerTemplate;
