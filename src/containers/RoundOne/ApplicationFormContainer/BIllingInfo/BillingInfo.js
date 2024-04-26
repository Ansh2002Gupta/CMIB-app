import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useTheme } from "@unthinkable/react-theme";
import { useNavigate } from "../../../../routes";
import { View, Platform } from "@unthinkable/react-core-components";

import { ThreeRow, TwoRow } from "../../../../core/layouts";
import MultiColumn from "../../../../core/layouts/MultiColumn";
import { Row } from "../../../../core/components";

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
import useIsWebView from "../../../../hooks/useIsWebView";
import CustomDropdownButton from "../../../../components/CustomDropdownButton/CustomDropdownButton";
import { formatDate } from "../../../../utils/util";
import getStyles from "./BillingInfo.style";

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
  const theme = useTheme();
  const styles = getStyles(theme);
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

  const [showMoreDetails, setShowMoreDetails] = useState(null);

  const { isWebView } = useIsWebView();
  const handleViewMoreDetails = (id) => {
    if (id === showMoreDetails) {
      setShowMoreDetails(-1);
    } else {
      setShowMoreDetails(id);
    }
  };

  const renderValues = ({ label, value }) => {
    return (
      <CommonText customTextStyle={styles.valuesStyle}>
        {label}&nbsp;&#58;&nbsp;{value}
      </CommonText>
    );
  };

  const renderMobSection = (item, index) => {
    return (
      <View style={styles.mobileContainer} key={index}>
        <View>
          <CommonText
            fontWeight={"600"}
            customTextStyle={commonStyles.cellTextStyle()}
          >
            {item.centre_name || "-"}
          </CommonText>
          <View style={styles.subHeadingSection}>
            <CommonText customTextStyle={styles.tableQueryText}>
              {intl.formatMessage({ id: "label.amount" })}&nbsp;&#58;&nbsp;
              {item?.amount || "-"}&nbsp;INR
            </CommonText>
            <CustomDropdownButton
              onPress={() => handleViewMoreDetails(index)}
              text={intl.formatMessage({ id: "label.more_details" })}
            />
          </View>
          {showMoreDetails === index && (
            <ThreeRow
              topSection={renderValues({
                label: intl.formatMessage({ id: "label.vacancy" }),
                value: item.total_vacancies,
              })}
              middleSection={renderValues({
                label: intl.formatMessage({
                  id: "label.pyscometric_written_test",
                }),
                value: item.psychometric_test_fee,
              })}
              bottomSection={
                <View style={styles.interviewDatesContainer}>
                  <CommonText customTextStyle={styles.valuesStyle}>
                    {intl.formatMessage({ id: "label.interview_dates" })}
                    &nbsp;&#58;&nbsp;
                  </CommonText>
                  {item?.interview_dates.map((dates, index) => {
                    const lastItem = item.interview_dates.length - 1 === index;
                    return (
                      <>
                        <CommonText customTextStyle={styles.valuesStyle}>
                          {formatDate(dates)}
                        </CommonText>
                        {!lastItem && (
                          <CommonText customTextStyle={styles.valuesStyle}>
                            ,&nbsp;
                          </CommonText>
                        )}
                      </>
                    );
                  })}
                </View>
              }
            />
          )}
        </View>
      </View>
    );
  };

  const renderFooterComponenet = () => {
    const item = {
      psychometric_test_fee: `Total : ${totalAmount?.totalPsychometricTestFee}`,
      interview_dates: [],
      final_amt: `Total Amount : ${totalAmount?.totalAmount}`,
    };
    const isFooterValues = true;
    return isWebView ? (
      <>
        <MultiColumn
          columns={getColoumConfigs(item, false, undefined, isFooterValues)}
          style={styles.columnStyleBorder}
        />
      </>
    ) : (
      <Row style={styles.bottomContainer}>
        <CommonText fontWeight={"600"} customTextStyle={styles.bottomText}>
          {intl.formatMessage({ id: "label.total_amount" })}
          &nbsp;&#58;&nbsp;
        </CommonText>

        <CommonText fontWeight={"600"} customTextStyle={styles.bottomText}>
          {totalAmount?.totalAmount}&nbsp;INR
        </CommonText>
      </Row>
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
                  isTotalCardVisible: false,
                  customTableStyle: styles.customTableContainerStyle,
                  containerStyle: isWebView
                    ? styles.customTableStyle
                    : styles.customTableStyleMob,
                  showSearchBar: false,
                  currentRecords: billingListData,
                  data: billingListData,
                  getColoumConfigs,
                  isShowPagination: false,
                  isHeading: true,
                  tableHeading: BILLING_INFO_HEADING_FOR_NQCA(currentModule),
                  isRenderFooterComponent: true,
                  renderFooterComponenet,
                  mobileComponentToRender: renderMobSection,
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
