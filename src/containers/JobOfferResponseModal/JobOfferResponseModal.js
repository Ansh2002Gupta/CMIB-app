import React from "react";
import { useIntl } from "react-intl";
import { useTheme } from "@unthinkable/react-theme";
import { Platform, View } from "@unthinkable/react-core-components";
import PropTypes from "prop-types";

import ActionPairButton from "../../components/ActionPairButton";
import CommonText from "../../components/CommonText";
import CustomModal from "../../components/CustomModal";
import FinalConfirmation from "../FinalConfirmation/FinalConfirmation";
import { KEYS } from "../../constants/constants";
import images from "../../images";
import getStyles from "./JobOfferResponseModal.style";

const isIos = Platform.OS.toLowerCase() === "ios";

const JobOfferResponseModal = ({
  data,
  setShowJobOfferResponseModal,
  handleAcceptRejectOffer,
  isLoading,
  confirmModalDetails,
  showConfirmModal,
  setShowConfirmModal,
  handleConfirmation,
  isPatching,
  isPatchingSuccess,
  isPatchingError,
}) => {
  const intl = useIntl();
  const theme = useTheme();
  const styles = getStyles(theme);

  const renderModal = () => {
    if (showConfirmModal) {
      return (
        <FinalConfirmation
          {...{ handleConfirmation, isPatching }}
          modalDetails={confirmModalDetails}
          showModal={showConfirmModal}
          setShowModal={setShowConfirmModal}
        />
      );
    } else {
      return (
        <CustomModal
          headerText={intl.formatMessage({ id: "label.job_offer_response" })}
          isIconCross
          onPressIconCross={() => setShowJobOfferResponseModal((prev) => !prev)}
          topLeftIcon={images.handShakeIcon}
        >
          <View style={isIos ? styles.mobContainer : {}}>
            <View>
              <CommonText
                customTextStyle={[styles.subHeaderText]}
                fontWeight="500"
              >
                {intl.formatMessage({ id: "label.offer_extend_msg" })}
              </CommonText>
              <View style={styles.jobDetailsOuterContainer}>
                <View style={styles.inRow}>
                  <CommonText customTextStyle={styles.companyText}>
                    Company:&nbsp;
                  </CommonText>
                  <CommonText
                    customTextStyle={styles.companyText}
                    fontWeight="600"
                  >
                    {data?.company_name}
                  </CommonText>
                </View>
                <View style={styles.inRow}>
                  <CommonText customTextStyle={styles.companyText}>
                    Designation:&nbsp;
                  </CommonText>
                  <CommonText
                    customTextStyle={styles.companyText}
                    fontWeight="600"
                  >
                    {data?.designation}
                  </CommonText>
                </View>
              </View>
              <CommonText customTextStyle={styles.footerText} fontWeight="500">
                {intl.formatMessage({ id: "label.clock_ticking_msg" })}
              </CommonText>
            </View>
            <ActionPairButton
              displayLoader={isLoading}
              onPressButtonOne={() => {
                handleAcceptRejectOffer({
                  decision: KEYS.OFFERE_REJECTED,
                  applicantID: data?.id,
                });
              }}
              onPressButtonTwo={() => {
                handleAcceptRejectOffer({
                  decision: KEYS.OFFER_ACCEPTED,
                  applicantID: data?.id,
                });
              }}
              isButtonTwoGreen
              isDisabled={isLoading}
              iconLeft={{
                leftIconAlt: "cross here",
                leftIconSource: images.iconCircleCross,
                isLeftIconNotSvg: false,
              }}
              iconRight={{
                rightIconAlt: "tick here",
                rightIconSource: images.iconTickInsideCircle,
              }}
              buttonOneText={intl.formatMessage({ id: "label.reject_offer" })}
              buttonTwoText={intl.formatMessage({ id: "label.accept_offer" })}
            ></ActionPairButton>
          </View>
        </CustomModal>
      );
    }
  };

  return renderModal();
};

JobOfferResponseModal.propTypes = {
  onPressButtonOne: PropTypes.func,
  onPressButtonTwo: PropTypes.func,
  queryTypeData: PropTypes.array,
};

export default JobOfferResponseModal;
