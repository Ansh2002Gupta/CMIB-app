import React, { useState } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { Platform, View } from "@unthinkable/react-core-components";

import ActionPairButton from "../ActionPairButton";
import CommonText from "../CommonText";
import CustomModal from "../CustomModal";
import CustomTextInput from "../CustomTextInput";
import images from "../../images";
import styles from "./JobOfferResponseModal.style";

const isIos = Platform.OS.toLowerCase() === "ios";

const JobOfferResponseModal = ({
  data,
  setShowJobOfferResponseModal,
  handleAcceptRejectOffer,
  isLoading,
}) => {
  const intl = useIntl();

  return (
    <>
      <CustomModal
        headerText={intl.formatMessage({ id: "label.job_offer_response" })}
        isIconCross
        onPressIconCross={() => setShowJobOfferResponseModal((prev) => !prev)}
      >
        <View style={isIos ? styles.mobContainer : {}}>
          <View>
            <CommonText
              customTextStyle={[styles.subHeaderText]}
              fontWeight="500"
            >
              We're thrilled to extend this offer to you! Your next steps await
              your decision
            </CommonText>
            <View style={styles.jobDetailsOuterContainer}>
              <View style={styles.inRow}>
                <CommonText customTextStyle={styles.companyText}>
                  Company:{" "}
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
                  Designation:{" "}
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
              Still deciding? Take your time, but remember, the clock is
              ticking. Your future awaits your response!
            </CommonText>
          </View>
          <ActionPairButton
            displayLoader={isLoading}
            onPressButtonOne={() =>
              handleAcceptRejectOffer({
                decision: false,
                applicantID: data?.job_id,
              })
            }
            onPressButtonTwo={() =>
              handleAcceptRejectOffer({
                decision: true,
                applicantID: data?.job_id,
              })
            }
            isButtonTwoGreen
            isDisabled={isLoading}
            iconLeft={{
              leftIconAlt: "cross here",
              leftIconSource: images.iconCrossInsideCircle,
              isLeftIconNotSvg: true,
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
    </>
  );
};

JobOfferResponseModal.propTypes = {
  onPressButtonOne: PropTypes.func.isRequired,
  onPressButtonTwo: PropTypes.func.isRequired,
  queryTypeData: PropTypes.array.isRequired,
};

export default JobOfferResponseModal;
