import { View } from "@unthinkable/react-core-components";
import React, { useState } from "react";
import { useTheme } from "@unthinkable/react-theme";
import CommonText from "../../../../components/CommonText";
import TouchableImage from "../../../../components/TouchableImage";
import images from "../../../../images";
import PopupMessage from "../../../../components/PopupMessage/PopupMessage";
import { useIntl } from "react-intl";
import getStyles from "./RenderMobileItem.styles";

const RenderMobileItem = ({ item, lastElement, onPress }) => {
  const intl = useIntl();
  const theme = useTheme();
  const styles = getStyles(theme);
  const [currentPopUpMessage, setCurrentPopupMessage] = useState(-1);
  const onIconPress = (item) => {
    setCurrentPopupMessage(item.application_id);
  };
  const optionArray = [
    {
      id: item.application_id,
      name: intl.formatMessage({ id: "label.view_interview_details" }),
    },
    {
      id: item.application_id,
      name: intl.formatMessage({ id: "label.edit_interview_details" }),
    },
  ];
  if (
    item.is_primary_schedule_accepted ||
    item.is_alternate_schedule_accepted
  ) {
    optionArray.push({
      id: item.application_id,
      name: intl.formatMessage({ id: "label.offer_job" }),
    });
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
            {item?.applicant_id ?? "-"}
          </CommonText>
          <TouchableImage
            source={images.dotIcon}
            isSvg={false}
            style={styles.marginLeft(8)}
          />
          <CommonText
            customContainerStyle={styles.marginLeft(4)}
            customTextStyle={styles.textStyle}
          >
            {item?.status ?? "-"}
          </CommonText>
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
            message={item?.action ? item?.action : optionArray}
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
