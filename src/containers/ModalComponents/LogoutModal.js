import React from 'react';
import { useIntl } from 'react-intl';
import { Image } from '@unthinkable/react-core-components';
import { Button } from '@unthinkable/react-button';
import PropTypes from 'prop-types';

import { ThreeRow, TwoColumn, TwoRow } from '../../core/layouts';

import CommonText from '../../components/CommonText';
import images from '../../images';
import styles from './modalComponent.style';

const LogoutModal = ({ closeModal, handleLogout }) => {
  const intl = useIntl();

  return (
    <div>
      <ThreeRow
        style={styles.mainContainer}
        topSection={
          <Image
            source={images.iconAlertTriangle}
            alt={'warning'}
            style={styles.imageStyle}
          />
        }
        middleSection={
          <TwoRow
            style={styles.middleSectionStyle}
            topSection={
              <CommonText
                customTextStyle={styles.headingText}
                title={intl.formatMessage({ id: 'label.logout' })}
              />
            }
            bottomSection={
              <CommonText
                customTextStyle={styles.subHeadingText}
                title={intl.formatMessage({ id: 'account.logoutMessage' })}
              />
            }
          />
        }
        bottomSection={
          <TwoColumn
            style={styles.bottomSectionStyle}
            leftSection={
              <Button
                text={intl.formatMessage({ id: 'label.cancel' })}
                onPress={closeModal}
                disabled={false}
                disabledContainerStyle={{ opacity: 0.5 }}
                containerStyle={styles.cancelButton}
                textStyle={styles.buttonText}
              />
            }
            rightSection={
              <Button
                text={intl.formatMessage({ id: 'label.logout' })}
                onPress={handleLogout}
                disabled={false}
                disabledContainerStyle={{ opacity: 0.5 }}
                containerStyle={styles.logoutButton}
                textStyle={styles.buttonText}
              />
            }
          />
        }
      />
    </div>
  );
};

LogoutModal.propTypes = {
  closeModal: PropTypes.func,
  handleLogout:PropTypes.func
};

export default LogoutModal;
