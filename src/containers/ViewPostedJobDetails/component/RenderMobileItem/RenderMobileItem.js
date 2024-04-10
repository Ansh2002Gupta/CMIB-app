import { View } from "@unthinkable/react-core-components";
import React from "react";
import CommonText from "../../../../components/CommonText";
import TouchableImage from "../../../../components/TouchableImage";
import images from "../../../../images";
import styles from "./RenderMobileItem.styles";
import PopupMessage from "../../../../components/PopupMessage/PopupMessage";
const RenderMobileItem = ({ item, lastItem }) => {
  return (
    <View
      style={{
        ...styles.container,
        ...(lastItem ? styles.borderBottom0 : {}),
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
      <PopupMessage message={item?.action.map((item) => item.name)} />
    </View>
  );
};
export default RenderMobileItem;
