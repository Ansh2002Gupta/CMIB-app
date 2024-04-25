import React from "react";
import { useTheme } from "@unthinkable/react-theme";
import { View } from "@unthinkable/react-core-components";
import CommonText from "../../../components/CommonText";
import CustomImage from "../../../components/CustomImage";
import images from "../../../images";
import TouchableImage from "../../../components/TouchableImage";
import getStyles from "./MobileCard.styles";

const MobileCard = ({
  item,
  onEditPress,
  onViewPress,
  containerStyle = {},
  contentContainerStyle = {},
  designationTextStyle = {},
  detailTextStyle = {},
  iconStyle = {},
  getStatusStyle,
  lastElement,
  statusData,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <View
      style={{
        ...styles.cardContainer,
        ...(lastElement && { borderBottomWidth: 0 }),
        ...containerStyle,
      }}
    >
      <View style={{ ...styles.contentContainer, ...contentContainerStyle }}>
        <CommonText
          customTextStyle={{
            ...styles.designationText,
            ...designationTextStyle,
          }}
        >
          {item?.designation ?? "-"}
        </CommonText>
        <View style={styles.detailsContainer}>
          <View style={styles.flexOneRow}>
            <View style={styles.contentContainer}>
              <CommonText
                customTextStyle={{
                  ...styles.numberTextStyle,
                  ...detailTextStyle,
                }}
              >{`${
                item?.number_of_applications ?? "-"
              } Applicants`}</CommonText>
            </View>
            <View style={styles.detailRow}>
              <CustomImage
                style={{ ...styles.iconTicket, ...iconStyle }}
                source={images.dotIcon}
              />
              <CommonText
                customContainerStyle={styles.marginLeft4}
                customTextStyle={{
                  ...styles.numberTextStyle,
                  ...detailTextStyle,
                }}
              >{`${item?.number_of_interviews ?? "-"} Interviews`}</CommonText>
            </View>
            <View style={styles.detailRow}>
              <CustomImage style={styles.iconTicket} source={images.dotIcon} />

              <CommonText
                customTextStyle={{
                  ...getStatusStyle(item?.status),
                  ...styles.textAlign,
                }}
                customContainerStyle={styles.contentContainer}
              >
                {item?.status
                  ? item.status === 0
                    ? statusData[1]?.name
                    : statusData[0]?.name
                  : "-"}
              </CommonText>
            </View>
          </View>
        </View>
      </View>
      <TouchableImage
        onPress={() => {
          onViewPress && onViewPress(item);
        }}
        source={images.iconEye}
        isSvg={false}
        style={{ ...styles.tableStyle, ...styles.marginRight16 }}
      />
      <TouchableImage
        onPress={() => {
          onEditPress && onEditPress(item);
        }}
        isSvg={false}
        source={images.iconEdit}
        style={styles.tableStyle}
      />
    </View>
  );
};

export default MobileCard;
