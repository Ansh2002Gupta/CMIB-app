import React from "react";
import { Platform, ScrollView, View } from "@unthinkable/react-core-components";

import CardComponent from "../../../components/CardComponent";
import CommonText from "../../../components/CommonText";
import CustomImage from "../../../components/CustomImage";
import CustomTouchableOpacity from "../../../components/CustomTouchableOpacity";
import useIsWebView from "../../../hooks/useIsWebView";
import classes from "../../../theme/styles/CssClassProvider";
import styles from "./CandidateRoundOneContainer.style";

const CandidateRoundOneContainerTemplate = ({ roundOneCards, onPressCard }) => {
  const { isWebView } = useIsWebView();
  const isWebPlatform = Platform.OS.toLowerCase() === "web";

  const cardComponentWebProps = isWebPlatform
    ? { className: classes["card-box__outline--green"] }
    : {};

  return (
    <ScrollView
      style={{
        ...(!isWebPlatform ? styles.mobContainer : {}),
        ...(isWebView ? styles.webContainerStyle : styles.containerStyle),
      }}
      showsVerticalScrollIndicator={false}
    >
      {roundOneCards.map((card, index) => (
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
              <CustomImage style={styles.imageStyle} source={card.image} />
            </View>
            <View style={styles.textView}>
              <CommonText customTextStyle={styles.titleText} fontWeight={"600"}>
                {card.title}
              </CommonText>
              <CommonText customTextStyle={styles.descriptionText}>
                {card.subTitle}
              </CommonText>
            </View>
          </CardComponent>
        </CustomTouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default CandidateRoundOneContainerTemplate;
