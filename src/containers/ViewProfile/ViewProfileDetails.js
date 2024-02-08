import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import { ThreeRow, TwoColumn, TwoRow } from "../../core/layouts";

import CustomTouchableOpacity from "../../components/CustomTouchableOpacity";
import CommonText from "../../components/CommonText";
import MultiRow from "../../core/layouts/MultiRow";
import ProfileIcon from "../../components/ProfileIcon/ProfileIcon";
import TouchableImage from "../../components/TouchableImage";
import useOutsideClick from "../../hooks/useOutsideClick";
import images from "../../images";
import styles from "./ViewProfileDetails.style";

const ViewProfileDetails = ({
  onPressCross,
  onPressEditIcon,
  userProfileDetails,
  setShowDeleteAccountModal,
}) => {
  const intl = useIntl();
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const name = userProfileDetails?.name;
  const email = userProfileDetails?.email;
  const code = userProfileDetails?.mobile_country_code;
  const phone = userProfileDetails?.mobile_number;
  const designation = userProfileDetails?.designation;
  const profileImage = userProfileDetails?.profile_photo;

  const handleMore = () => {
    setShowDeletePopup((prev) => !prev);
  };

  const handleConfirmation = () => {
    setShowDeleteAccountModal(true);
  };

  const deletePopUpRef = useRef(null);
  useOutsideClick(deletePopUpRef, () => setShowDeletePopup(false));

  const section = [
    {
      content: (
        <TwoRow
          style={styles.secondSectionStyle}
          topSectionStyle={styles.crossStyle}
          topSection={
            <View style={styles.headerLeftIcons}>
              <View style={styles.iconMoreContainer} ref={deletePopUpRef}>
                <TouchableImage source={images.iconMore} onPress={handleMore} />
                {showDeletePopup && (
                  <CustomTouchableOpacity
                    style={styles.deletetextContainer}
                    onPress={handleConfirmation}
                  >
                    <CommonText customTextStyle={styles.deletetext}>
                      {intl.formatMessage({ id: "label.delete_account" })}
                    </CommonText>
                  </CustomTouchableOpacity>
                )}
              </View>
              <TouchableImage
                style={styles.crossIconStyle}
                source={images.iconCloseDark}
                onPress={onPressCross}
              />
            </View>
          }
          bottomSection={
            <ProfileIcon
              customOuterContainer={styles.customOuterContainer}
              customContainerStyle={styles.customOuterContainer}
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
              {code}
              {"-"}
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
  setShowDeleteAccountModal: () => {},
  userProfileDetails: {},
};

ViewProfileDetails.propTypes = {
  onPressCross: PropTypes.func,
  onPressEditIcon: PropTypes.func,
  setShowDeleteAccountModal: PropTypes.func,
  userProfileDetails: PropTypes.object,
};

export default ViewProfileDetails;
