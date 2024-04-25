import { View } from "@unthinkable/react-core-components";
import { useTheme } from "@unthinkable/react-theme";
import React from "react";
import CommonText from "../../../../components/CommonText";
import TouchableImage from "../../../../components/TouchableImage";
import images from "../../../../images";
import { useIntl } from "react-intl";
import { formatDate } from "../../../../utils/util";
import getStyles from "./RenderMobileItems.styles";

const RenderMobileItem = ({ item, lastElement, onPress }) => {
  const intl = useIntl();
  const theme = useTheme();
  const styles = getStyles(theme);

  const onIconPress = (item) => {
    onPress(item);
  };

  return (
    <View
      style={{
        ...styles.container,
        ...(lastElement ? styles.borderBottom0 : {}),
      }}
    >
      <View style={styles.flex1}>
        <CommonText
          customTextStyle={styles.font14}
          customTextProps={{ numberOfLines: 1 }}
        >
          {item?.package_name ?? "-"}
        </CommonText>
        <View style={styles.innerContainer}>
          <CommonText customTextStyle={styles.textStyle}>
            {item?.price ?? "-"}
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
            {item?.validity ?? "-"}
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
            {formatDate(item?.start_date) +
              "-" +
              formatDate(item?.validity_date) ?? "-"}
          </CommonText>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableImage
          onPress={() => {
            onIconPress(item);
          }}
          source={images.iconEyeSvg}
          imageStyle={{ height: 20, width: 20 }}
          isSvg={true}
        />
      </View>
    </View>
  );
};
export default RenderMobileItem;
