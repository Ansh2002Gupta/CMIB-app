import React from "react";
import { useParams } from "react-router";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../../../components/CommonText";
import CustomLabelView from "../../../components/CustomLabelView";
import CustomButton from "../../../components/CustomButton";
import useFetch from "../../../hooks/useFetch";
import { usePost } from "../../../hooks/useApiRequest";
import useGetUserDetails from "../../../services/apiServices/hooks/UserProfile/useGetUserDetails";
import {
  PAYMENT_INFO,
  PAY,
  ROUNDS,
  USER_TYPE_MEMBER,
} from "../../../services/apiServices/apiEndPoint";
import images from "../../../images";
import commonStyles from "../../../theme/styles/commonStyles";
import styles from "./PaymentDetails.style";

const Pay = ({ intl, isWebView }) => {
  const { currentModules } = useGetUserDetails;
  const id = useParams();
  const { data: paymentData } = useFetch({
    url: `${USER_TYPE_MEMBER}/${currentModules}${ROUNDS}/${id}${PAYMENT_INFO}`,
  });
  const { makeRequest: payCandidateAmount } = usePost({
    url: `${USER_TYPE_MEMBER}/${currentModules}${ROUNDS}/${id}${PAY}`,
  });

  const payAmount = () => {
    payCandidateAmount({
      onSuccessCallback: async (data) => {
        if (isWebView) {
          if (data?.data && data?.data?.url) {
            window.open(data?.data?.url, "_self");
          } else {
            window.location.reload();
          }
        }
      },
    });
  };
  return (
    <View style={styles.cardContainer}>
      <CommonText customTextStyle={styles.customTextStyle}>
        {intl.formatMessage({
          id: "label.payMentionedAmountsubmitapplication",
        })}
      </CommonText>
      <CustomLabelView
        label={intl.formatMessage({ id: "label.amount_to_be_paid" })}
      >
        <CommonText>{`₹${paymentData?.amount}`}</CommonText>
      </CustomLabelView>
      <CustomButton
        disabled={paymentData?.is_paid}
        onPress={payAmount}
        withGreenBackground
        iconRight={{ rightIconSource: images.iconArrowRightWhite }}
        style={{ ...commonStyles.buttonStyle, ...styles.buttonStyle }}
      >
        {intl.formatMessage({ id: "label.payAmount" })}
      </CustomButton>
    </View>
  );
};

export default Pay;
