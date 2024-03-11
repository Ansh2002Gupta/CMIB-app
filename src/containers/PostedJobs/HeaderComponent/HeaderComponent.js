import React from "react";
import { View } from "@unthinkable/react-core-components";
import CommonText from "../../../components/CommonText";
import TouchableImage from "../../../components/TouchableImage";
import images from "../../../images";
import styles from "./HeaderComponent.styles";
import { useIntl } from "react-intl";

const HeaderComponent = ({ isExpanded, setIsExpanded }) => {
  const ArrowUp = images.iconArrowUp;
  const ArrowDown = images.iconArrowDown;
  const intl = useIntl();
  return (
    <View style={styles.containerStyle}>
      <View style={styles.textViewStyle}>
        <CommonText customTextStyle={styles.textStyle} fontWeight={"600"}>
          {intl.formatMessage({ id: "label.job_details" })}
        </CommonText>
      </View>

      <TouchableImage
        source={isExpanded ? ArrowUp : ArrowDown}
        style={styles.iconStyle}
        onPress={() => {
          setIsExpanded(!isExpanded);
        }}
      />
    </View>
  );
};

export default HeaderComponent;
