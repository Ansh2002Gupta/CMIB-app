import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Image } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import MultiRow from "../../core/layouts/MultiRow";
import ProfileIcon from "../../components/ProfileIcon/ProfileIcon";
import { ThreeRow, TwoColumn, TwoRow } from "../../core/layouts";
import images from "../../images";
import styles from "./ViewProfileModal.style";

const ViewProfileModal = ({ closeModal, setModalSelect }) => {
  const intl = useIntl();
  const firstName = "Kashish";
  const lastName = "Bhatheja";
  const profileImage = "https://picsum.photos/id/10/200/300";
  const email = "kashish.natheja@gmail.com";
  const phone = "+91-1234567890";
  const createdDate = "10/10/2023";
  const designation = "Senior Chartered Accountant";
  const section = [
    {
      content: (
        <TwoRow
          style={styles.secondSectionStyle}
          topSectionStyle={styles.crossStyle}
          topSection={
            <Image
              source={images.iconCross}
              style={styles.crossIconStyle}
              onClick={closeModal}
            />
          }
          bottomSection={
            <ProfileIcon
              firstName={firstName}
              lastName={lastName}
              profileImage={profileImage}
              imageContainerStyle={styles.imageContainerStyle}
              initialContainerStyle={styles.initialContainerStyle}
              onClick={() => {
                setModalSelect(-1);
              }}
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
          <CommonText
          customTextStyle={styles.subHeadingText}
        >
          {`${intl.formatMessage({
            id: "label.designation",
          })}:`}&nbsp;
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

ViewProfileModal.propTypes = {
  closeModal: PropTypes.func,
  setModalSelect: PropTypes.func,
};
export default ViewProfileModal;
