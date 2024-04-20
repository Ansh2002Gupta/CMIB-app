import React from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../../../routes";
import { View, Platform } from "@unthinkable/react-core-components";

import CommonText from "../../../../components/CommonText";
import CustomTouchableOpacity from "../../../../components/CustomTouchableOpacity";
import CustomImage from "../../../../components/CustomImage";
import CardComponent from "../../../../components/CardComponent";
import CustomButton from "../../../../components/CustomButton";
import CustomScrollView from "../../../../components/CustomScrollView";
import CustomTable from "../../../../components/CustomTable";
import DetailCard from "../../../../components/DetailCard";
import usePaymentForm from "./controllers/usePaymentForm";
import images from "../../../../images";
import styles from "./PaymentForm.style";

import { transactionList } from "./controllers/usePaymentForm";
import { TRANSACTION_LIST_HEADING_FOR_NQCA } from "../../../../constants/constants";
import { TwoRow } from "../../../../core/layouts";
import ActionPairButton from "../../../../components/ActionPairButton";
import commonStyles from "../../../../theme/styles/commonStyles";

const PaymentForm = ({ tabHandler }) => {
  const {
    currentModule,
    paymentDetails,
    handleBlur,
    handleInputChange,
    isEditProfile,
    handleDownload,
    getStatusStyle,
    getColoumConfigs,
    handleSaveAndNext,
  } = usePaymentForm();

  const intl = useIntl();
  const navigate = useNavigate();
  const isWebProps =
    Platform.OS.toLowerCase() === "web"
      ? {
          buttonOneStyle: styles.buttonStyle,
          buttonTwoStyle: styles.buttonTwoStyle,
          buttonOneContainerStyle: styles.buttonStyle,
          buttonTwoContainerStyle: styles.buttonTwoStyle,
        }
      : {};

  return (
    <CustomScrollView style={styles.mainContainer}>
      <TwoRow
        topSection={
          <>
            <CardComponent>
              <View style={styles.headerContainer}>
                <CommonText
                  customTextStyle={styles.headerText}
                  fontWeight={"600"}
                >
                  {intl.formatMessage({
                    id: "label.fill_the_payment_form_slots",
                  })}
                </CommonText>
                <CustomTouchableOpacity
                  style={styles.downloadButtonContainer}
                  onPress={handleDownload}
                >
                  <CustomImage
                    source={images.iconDownloading}
                    style={styles.downloadIcon}
                  />
                  <CommonText customTextStyle={styles.downloadText}>
                    {intl.formatMessage({
                      id: "label.downloadPerformaInvoice",
                    })}
                  </CommonText>
                </CustomTouchableOpacity>
              </View>
              <DetailCard
                customCardStyle={styles.customCardStyle}
                details={paymentDetails}
                handleBlur={handleBlur}
                handleChange={(fieldName, value) => {
                  handleInputChange(fieldName, value);
                }}
                isEditProfile={isEditProfile}
              />
              <CustomButton
                withGreenBackground
                iconRight={{
                  rightIconSource: images.iconArrowRightWhite,
                }}
                style={styles.buttonstyle}
              >
                <CommonText customTextStyle={styles.buttonText}>
                  {intl.formatMessage({ id: "label.pay_amount" })}
                </CommonText>
              </CustomButton>
            </CardComponent>

            <CardComponent customStyle={styles.tableCard}>
              <View style={styles.headerContainer}>
                <CommonText
                  customTextStyle={styles.headerText}
                  fontWeight={"600"}
                >
                  {intl.formatMessage({
                    id: "label.paymentHistory",
                  })}
                </CommonText>
              </View>
              <CustomTable
                {...{
                  customTableStyle: styles.customTableStyle,
                  showSearchBar: false,
                  currentRecords: transactionList,
                  data: transactionList,
                  getColoumConfigs,
                  getStatusStyle,
                  isShowPagination: false,
                  isHeading: true,
                  tableHeading:
                    TRANSACTION_LIST_HEADING_FOR_NQCA(currentModule),
                }}
              />
            </CardComponent>
          </>
        }
        isTopFillSpace
        bottomSection={
          <View style={styles.actionBtnContainer}>
            <CustomButton
              style={styles.buttonStyle}
              iconLeft={{
                leftIconSource: images.iconArrowLeft,
              }}
              onPress={() => {
                tabHandler("prev");
              }}
            >
              <CommonText
                fontWeight={"600"}
                customTextStyle={styles.backButtonStyle}
              >
                {intl.formatMessage({ id: "label.back" })}
              </CommonText>
            </CustomButton>
            <ActionPairButton
              buttonOneText={intl.formatMessage({ id: "label.cancel" })}
              buttonTwoText={intl.formatMessage({ id: "label.save" })}
              onPressButtonOne={() => navigate(-1)}
              onPressButtonTwo={() => {
                handleSaveAndNext();
              }}
              // isDisabled={isDisabled}
              // displayLoader={isButtonLoading}
              customStyles={{
                ...isWebProps,
                customContainerStyle: commonStyles.customContainerStyle,
              }}
              isButtonTwoGreen
            />
          </View>
        }
      />
    </CustomScrollView>
  );
};

export default PaymentForm;
