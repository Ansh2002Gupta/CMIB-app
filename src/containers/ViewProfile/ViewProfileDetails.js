import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import CommonText from "../../components/CommonText";
import MultiRow from "../../core/layouts/MultiRow";
import ProfileIcon from "../../components/ProfileIcon/ProfileIcon";
import TouchableImage from "../../components/TouchableImage";
import { ThreeRow, TwoColumn, TwoRow } from "../../core/layouts";
import images from "../../images";
import styles from "./ViewProfileDetails.style";

const ViewProfileDetails = ({
  onPressCross,
  onPressEditIcon,
  userProfileDetails,
}) => {
  const intl = useIntl();

  const name = userProfileDetails?.name;
  const email = userProfileDetails?.email;
  const phone = userProfileDetails?.mobile_number;
  const designation = userProfileDetails?.designation;
  const profileImage = userProfileDetails?.profile_photo;

  console.log("yser", userProfileDetails);
  const section = [
    {
      content: (
        <TwoRow
          style={styles.secondSectionStyle}
          topSectionStyle={styles.crossStyle}
          topSection={
            <TouchableImage
              style={styles.crossIconStyle}
              source={images.iconCloseDark}
              onPress={onPressCross}
            />
          }
          bottomSection={
            <ProfileIcon
              showEditIcon
              name={name}
              profileImage={profileImage}
              imageContainerStyle={styles.imageContainerStyle}
              initialContainerStyle={styles.initialContainerStyle}
              onPressEditIcon={onPressEditIcon}
            />
          }
        />
      ),
    },
    {
      content: (
        <ThreeRow
          style={styles.secondSectionStyle}
          topSection={
            <CommonText customTextStyle={styles.headingText} fontWeight={"600"}>
              {name}
            </CommonText>
          }
          middleSection={
            <CommonText customTextStyle={styles.subHeadingText}>
              {phone}
            </CommonText>
          }
          bottomSection={
            <CommonText customTextStyle={styles.subHeadingText}>
              {email}
            </CommonText>
          }
        />
      ),
    },
    {
      content: (
        <TwoColumn
          style={styles.designationContainer}
          leftSection={
            <CommonText customTextStyle={styles.subHeadingText}>
              {`${intl.formatMessage({
                id: "label.designation",
              })}:`}
              &nbsp;
            </CommonText>
          }
          rightSection={
            <CommonText
              customTextStyle={styles.designationText}
              fontWeight={"600"}
            >
              {designation}
            </CommonText>
          }
        />
      ),
    },
  ];
  return <MultiRow style={styles.profileMainContainer} rows={section} />;
};

ViewProfileDetails.defaultProps = {
  onPressCross: () => {},
  onPressEditIcon: () => {},
  userProfileDetails: {},
};

ViewProfileDetails.propTypes = {
  onPressCross: PropTypes.func,
  onPressEditIcon: PropTypes.func,
  userProfileDetails: PropTypes.object,
};

export default ViewProfileDetails;
