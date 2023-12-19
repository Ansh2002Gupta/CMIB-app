import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { View, Modal } from '@unthinkable/react-core-components';

import CommonText from '../../components/CommonText';
import styles from './dashboard.style';
import Popover from '../../components/Popover';
import PopoverContainer from '../../containers/PopoverContainer';
import ModalComponents from '../../containers/ModalComponents';

function DashboardView() {
  const intl = useIntl();
  const [isVisible, setIsVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalselect, setModalSelect] = useState();

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const openPopover = () => {
    setIsVisible(true);
  };
  const closePopover = () => {
    setIsVisible(false);
  };
  const handleLogout = () => {};

  return (
    <View style={styles.container}>
      <Popover
        isVisible={isVisible}
        closePopover={closePopover}
        content={
          <PopoverContainer
            openModal={openModal}
            closePopover={closePopover}
            setModalSelect={(val) => {
              setModalSelect(val);
            }}
          />
        }
      />
      <Modal isVisible={modalVisible} backdrop={true}>
        <div
          style={styles.modal}
        >
          {modalselect === 3 && (
            <ModalComponents.LogoutModal
              closeModal={closeModal}
              handleLogout={handleLogout}
            />
          )}

          {modalselect === 1 && (
            <ModalComponents.ViewProfileModal
              closeModal={closeModal}
              setModalSelect={(val) => {
                setModalSelect(val);
              }}
            />
          )}
          {modalselect === -1 && (
            <ModalComponents.ChnageProfileModal closeModal={closeModal} />
          )}
        </div>
      </Modal>

      {/* this is temporary div */}
      <div
        style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer' }}
        onClick={openPopover}
      >
        Presshere
      </div>

      <CommonText
        customTextStyle={styles.header}
        title={intl.formatMessage({ id: 'label.dashboard' })}
      />
    </View>
  );
}

export default DashboardView;
