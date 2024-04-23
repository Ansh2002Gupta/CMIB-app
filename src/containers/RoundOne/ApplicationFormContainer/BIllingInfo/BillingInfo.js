import React from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../../../routes";
import { View, Platform } from "@unthinkable/react-core-components";

import { TwoRow } from "../../../../core/layouts";
import MultiColumn from "../../../../core/layouts/MultiColumn";

import ActionPairButton from "../../../../components/ActionPairButton";
import CardComponent from "../../../../components/CardComponent";
import CommonText from "../../../../components/CommonText";
import CustomButton from "../../../../components/CustomButton";
import CustomScrollView from "../../../../components/CustomScrollView";
import CustomTable from "../../../../components/CustomTable";
import ErrorComponent from "../../../../components/ErrorComponent/ErrorComponent";
import LoadingScreen from "../../../../components/LoadingScreen";
import useBillingInfo from "./controller/useBillingInfo";
import { BILLING_INFO_HEADING_FOR_NQCA } from "../../../../constants/constants";
import images from "../../../../images";
import commonStyles from "../../../../theme/styles/commonStyles";
import styles from "./BillingInfo.style";

const BillingInfo = ({ isEditable, tabHandler, setIsEditable }) => {
  const {
    currentModule,
    fetchData,
    getColoumConfigs,
    billingListData,
    isLoadingBilling,
    isErrorListing,
    errorWhileFetchingList,
    totalAmount,
  } = useBillingInfo();
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

  const renderFooterComponenet = () => {
    const item = {
      psychometric_test_fee: `Total : ${totalAmount?.totalPsychometricTestFee}`,
      interview_dates: [],
      amount: `Total : ${totalAmount?.totalAmount}`,
    };
    const subTotalItem = {
      interview_dates: [],
      finalAmount: totalAmount?.finalAmount,
    };
    const isShowFinalAmount = true;
    return (
      <>
        <MultiColumn
          columns={getColoumConfigs(item, false, 0)}
          style={styles.columnStyleBorder}
        />
        <MultiColumn
          columns={getColoumConfigs(subTotalItem, false, 0, isShowFinalAmount)}
          style={styles.columnStyleBorder}
        />
      </>
    );
  };

  return (
    <CustomScrollView style={styles.mainContainer}>
      {isLoadingBilling && !isErrorListing && <LoadingScreen />}
      {!isLoadingBilling && !isErrorListing && (
        <TwoRow
          topSection={
            <CardComponent customStyle={styles.tableCard}>
              <View style={styles.headerContainer}>
                <CommonText
                  customTextStyle={styles.headerText}
                  fontWeight={"600"}
                >
                  {intl.formatMessage({
                    id: "label.billing_info",
                  })}
                </CommonText>
              </View>
              <CustomTable
                {...{
                  customTableStyle: styles.customTableStyle,
                  showSearchBar: false,
                  currentRecords: billingListData,
                  data: billingListData,
                  getColoumConfigs,
                  isShowPagination: false,
                  isHeading: true,
                  tableHeading: BILLING_INFO_HEADING_FOR_NQCA(currentModule),
                  isRenderFooterComponent: true,
                  renderFooterComponenet,
                }}
              />
            </CardComponent>
          }
          isTopFillSpace
          bottomSection={
            <View style={styles.actionBtnContainer}>
              <View
                style={{
                  ...(!isEditable && { flex: 1 }),
                }}
              >
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
              </View>
              {isEditable ? (
                <ActionPairButton
                  buttonOneText={intl.formatMessage({ id: "label.cancel" })}
                  buttonTwoText={intl.formatMessage({
                    id: "label.save_and_next",
                  })}
                  onPressButtonOne={() => {
                    isEditable ? setIsEditable(false) : navigate(-1);
                  }}
                  onPressButtonTwo={() => {
                    tabHandler("next");
                  }}
                  customStyles={{
                    ...isWebProps,
                    customContainerStyle: commonStyles.customContainerStyle,
                  }}
                  isButtonTwoGreen
                />
              ) : (
                <CustomButton
                  withGreenBackground
                  style={styles.buttonStyle}
                  onPress={() => {
                    tabHandler("next");
                  }}
                >
                  <CommonText
                    fontWeight={"600"}
                    customTextStyle={styles.nextButtonStyle}
                  >
                    {intl.formatMessage({ id: "label.next" })}
                  </CommonText>
                </CustomButton>
              )}
            </View>
          }
        />
      )}
      {!isLoadingBilling && isErrorListing && (
        <ErrorComponent
          errorMsg={errorWhileFetchingList?.data?.message}
          onRetry={() => {
            fetchData({});
          }}
        />
      )}
    </CustomScrollView>
  );
};

export default BillingInfo;
