import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import CommonText from "../../components/CommonText";
import CustomImage from "../../components/CustomImage";
import MultiRow from "../../core/layouts/MultiRow";
import ProfileIcon from "../../components/ProfileIcon/ProfileIcon";
import { ThreeRow, TwoColumn, TwoRow } from "../../core/layouts";
import images from "../../images";
import styles from "./ViewProfileDetails.style";

const ViewProfileDetails = ({ onPressCross, onPressEditIcon }) => {
  const intl = useIntl();
  const firstName = "Kashish";
  const lastName = "Bhatheja";
  const profileImage = "https://picsum.photos/id/10/200/300";
  const email = "kashish.bhatheja@gmail.com";
  const phone = "+91-1234567890";
  const designation = "Senior Chartered Accountant";
  const section = [
    {
      content: (
        <TwoRow
          style={styles.secondSectionStyle}
          topSectionStyle={styles.crossStyle}
          topSection={
            <CustomImage
              source={images.iconCloseDark}
              style={styles.crossIconStyle}
              onClick={onPressCross}
            />
          }
          bottomSection={
            <ProfileIcon
              showEditIcon
              firstName={firstName}
              lastName={lastName}
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
            <CommonText
              customTextStyle={styles.headingText}
              fontWeight={"600"}
            >{`${firstName} ${lastName}`}</CommonText>
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
};

ViewProfileDetails.propTypes = {
  onPressCross: PropTypes.func,
  onPressEditIcon: PropTypes.func,
};

export default ViewProfileDetails;
