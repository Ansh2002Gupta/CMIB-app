import React from "react";

import CustomModal from "../../components/CustomModal";
import { useIntl } from "react-intl";
import { KEYS } from "../../constants/constants";
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
        modalDetails?.decision === KEYS.OFFER_ACCEPTED
          ? intl.formatMessage({ id: "label.message_acception" })
          : intl.formatMessage({ id: "label.message_rejection" })
      }
      secondaryText={
        modalDetails?.decision === KEYS.OFFER_ACCEPTED
          ? intl.formatMessage({
              id: "label.acception_description",
            })
          : intl.formatMessage({ id: "label.rejection_description" })
      }
      showActionButtonOnSuccess
      imageOnSuccess={
        modalDetails?.decision === KEYS.OFFER_ACCEPTED
          ? images.iconSuccess
          : images.iconError
      }
      customStyles={{
        buttonTwoTextStyle:
          modalDetails?.decision !== KEYS.OFFER_ACCEPTED
            ? styles.buttonTwoText
            : {},
        buttonTwoStyle:
          modalDetails?.decision !== KEYS.OFFER_ACCEPTED
            ? styles.buttonTwo
            : {},
      }}
      handleButtonOnePress={() => setShowModal((prev) => !prev)}
      handleButtonTwoPress={() => handleConfirmation()}
      isLoading={isPatching}
      isButtonOneDisabled={isPatching}
    />
  );
};

export default FinalConfirmation;
