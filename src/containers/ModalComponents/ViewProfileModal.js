import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Image } from '@unthinkable/react-core-components';

import { FourRow, ThreeRow, TwoRow } from '../../core/layouts';

import CommonText from '../../components/CommonText';
import ProfileIcon from '../../components/ProfileIcon/ProfileIcon';
import images from '../../images';
import styles from './modalComponent.style';

const ViewProfileModal = ({ closeModal, setModalSelect }) => {
  const intl = useIntl();
  const firstName = 'Kashish';
  const lastName = 'Bhatheja';
  const profileImage = 'https://picsum.photos/id/10/200/300';
  const email = 'kashish.natheja@gmail.com';
  const phone = '+91-1234567890';
  const createdDate = '10/10/2023';
  const designation = 'Senior Chartered Accountant';

  return (
    <div>
      <FourRow
        style={styles.profileMainContainer}
        firstSection={
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
                icon={images.iconEdit}
              />
            }
          />
        }
        secondSection={
          <ThreeRow
            style={styles.secondSectionStyle}
            topSection={
              <CommonText
                customTextStyle={styles.headingText}
                title={`${firstName} ${lastName}`}
              />
            }
            middleSection={
              <CommonText
                customTextStyle={styles.subHeadingText}
                title={phone}
              />
            }
            bottomSection={
              <CommonText
                customTextStyle={styles.subHeadingText}
                title={email}
              />
            }
          />
        }
        thirdSection={
          <CommonText
            customTextStyle={styles.subHeadingText}
            title={`${intl.formatMessage({
              id: 'account.designation',
            })}: ${designation}`}
          />
        }
        thirdSectionStyle={styles.thirdSectionStyle}
      />
    </div>
  );
};

ViewProfileModal.propTypes = {
  closeModal: PropTypes.func,
  setModalSelect: PropTypes.func,
};

export default ViewProfileModal;
