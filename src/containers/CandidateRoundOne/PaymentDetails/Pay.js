import React from "react";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../../../components/CommonText";
import CustomLabelView from "../../../components/CustomLabelView";
import CustomButton from "../../../components/CustomButton";
import useFetch from "../../../hooks/useFetch";
import { usePost } from "../../../hooks/useApiRequest";
import images from "../../../images";
import commonStyles from "../../../theme/styles/commonStyles";
import styles from "./PaymentDetails.style";

const Pay = ({ intl, isWebView }) => {
  const { data: paymentData } = useFetch({
    url: `member/nqca-placements/rounds/264/payment-info`,
  });
  const { makeRequest: payCandidateAmount } = usePost({
    url: `member/nqca-placements/rounds/264/pay`,
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
