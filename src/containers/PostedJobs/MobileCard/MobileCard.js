import React from "react";
import { View } from "@unthinkable/react-core-components";
import CommonText from "../../../components/CommonText";
import CustomImage from "../../../components/CustomImage";
import images from "../../../images";
import TouchableImage from "../../../components/TouchableImage";
import styles from "./MobileCard.styles";

const MobileCard = ({
  item,
  onIconPress,
  tableIcon,
  containerStyle = {},
  contentContainerStyle = {},
  designationTextStyle = {},
  detailTextStyle = {},
  iconStyle = {},
  getStatusStyle,
  lastElement,
}) => {
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
          {item.designation}
        </CommonText>
        <View style={styles.detailsContainer}>
          <View style={styles.flexOneRow}>
            <View style={styles.contentContainer}>
              <CommonText
                customTextStyle={{
                  ...styles.numberTextStyle,
                  ...detailTextStyle,
                }}
              >{`${item.number_of_applications} Applicants`}</CommonText>
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
              >{`${item.number_of_interviews} interviews`}</CommonText>
            </View>
            <View style={styles.detailRow}>
              <CustomImage style={styles.iconTicket} source={images.dotIcon} />

              <CommonText customTextStyle={getStatusStyle(item.status)}>
                {item.status === 0 ? "Inactive" : "Active"}
              </CommonText>
            </View>
          </View>
        </View>
      </View>
      <TouchableImage
        onPress={() => {
          onIconPress && onIconPress(item);
        }}
        source={tableIcon}
        style={styles.tableStyle}
      />
    </View>
  );
};

export default MobileCard;
