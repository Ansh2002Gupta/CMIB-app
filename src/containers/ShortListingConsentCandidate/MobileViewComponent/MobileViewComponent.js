import React, { useState } from "react";
import { useTheme } from "@unthinkable/react-theme";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../../../components/CommonText";
import TouchableImage from "../../../components/TouchableImage";
import PopupMessage from "../../../components/PopupMessage/PopupMessage";
import images from "../../../images";
import { getPassRejected } from "../../../constants/constants";
import { getMobileValue } from "../../../views/ShortListingConsentCandidate/mappedData";
import getStyles from "./MobileViewComponent.styles";

const RenderMobileItem = ({ item, lastElement, onPress, selectedTabs }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const [currentPopUpMessage, setCurrentPopupMessage] = useState(-1);
  const onIconPress = (item) => {
    setCurrentPopupMessage(item.application_id);
  };
  const mappedDataValues = getMobileValue(selectedTabs, item);
  const optionArray = [
    {
      name: "View candidate Details",
      id: item.application_id,
    },
    {
      name: "Shortlist Candidate",
      id: item.application_id,
    },
  ];

  const tabsWithoutShortlist = new Set([3, 4, 5, 6, 7, 8]);

  if (tabsWithoutShortlist.has(selectedTabs)) {
    const shortlistIndex = optionArray.findIndex(
      (option) => option.name === "Shortlist Candidate"
    );
    if (shortlistIndex !== -1) {
      optionArray.splice(shortlistIndex, 1);
    }
  }
  switch (selectedTabs) {
    case 5:
      optionArray.push({
        name: "Update Written Test Result",
        id: item.application_id,
      });
      break;
    case 6:
      optionArray.push({
        name: "Mark Candidate as Offered",
        id: item.application_id,
      });
      break;
  }

  return (
    <View
      style={{
        ...styles.container,
        ...(lastElement ? styles.borderBottom0 : {}),
      }}
    >
      <View style={styles.flex1}>
        <CommonText customTextStyle={styles.font14}>
          {item?.name ?? "-"}
        </CommonText>
        <View style={styles.innerContainer}>
          <CommonText customTextStyle={styles.textStyle}>
            {item?.application_number ?? "-"}
          </CommonText>
          <TouchableImage
            source={images.dotIcon}
            isSvg={false}
            style={styles.marginLeft(8)}
          />
          {Object.keys(mappedDataValues).length == 0 && (
            <CommonText
              customContainerStyle={styles.marginLeft(4)}
              customTextStyle={styles.textStyle}
            >
              {`Rank: #${item?.rank ?? "-"}`}
            </CommonText>
          )}
          {Object.keys(mappedDataValues).length > 0 && (
            <View style={{ flexDirection: "row" }}>
              <CommonText
                customContainerStyle={styles.marginLeft(4)}
                customTextStyle={styles.textStyle}
              >
                {`${mappedDataValues.key}:`}
              </CommonText>
              <CommonText
                customContainerStyle={styles.marginLeft(4)}
                customTextStyle={styles.textStyleGreen}
              >
                {`${mappedDataValues.value}`}
              </CommonText>
            </View>
          )}
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableImage
          onPress={() => {
            onIconPress(item);
          }}
          source={images.iconMore}
          imageStyle={{ height: 20, width: 20 }}
          isSvg={true}
        />
        {currentPopUpMessage === item.application_id && (
          <PopupMessage
            message={optionArray}
            labelName={"name"}
            onPopupClick={(items) => {
              setCurrentPopupMessage(-1);
              onPress(items.name, item);
            }}
            itemSelected={item}
            isPopupModal
            onPopUpClose={() => {
              setCurrentPopupMessage(-1);
            }}
          />
        )}
      </View>
    </View>
  );
};
export default RenderMobileItem;
