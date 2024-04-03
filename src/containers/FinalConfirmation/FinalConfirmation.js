import React from "react";

import CustomModal from "../../components/CustomModal";
import { useIntl } from "react-intl";
import images from "../../images";
import styles from "./FinalConfirmation.style";

const FinalConfirmation = ({
  handleConfirmation,
  setShowModal,
  isPatching,
  modalDetails,
}) => {
  const intl = useIntl();
  return (
    <CustomModal
      isSuccess
      headerText={
        modalDetails?.decision === 7
          ? intl.formatMessage({ id: "label.message_acception" })
          : intl.formatMessage({ id: "label.message_rejection" })
      }
      secondaryText={
        modalDetails?.decision === 7
          ? intl.formatMessage({
              id: "label.acception_description",
            })
          : intl.formatMessage({ id: "label.rejection_description" })
      }
      showActionButtonOnSuccess
      imageOnSuccess={
        modalDetails?.decision === 7 ? images.iconSuccess : images.iconError
      }
      customStyles={{
        buttonTwoTextStyle:
          modalDetails?.decision !== 7 ? styles.buttonTwoText : {},
        buttonTwoStyle: modalDetails?.decision !== 7 ? styles.buttonTwo : {},
      }}
      handleButtonOnePress={() => setShowModal((prev) => !prev)}
      handleButtonTwoPress={() => handleConfirmation()}
      isLoading={isPatching}
      isButtonOneDisabled={isPatching}
    />
  );
};

export default FinalConfirmation;
