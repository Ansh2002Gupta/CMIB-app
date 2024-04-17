import React, { useContext, useState } from "react";
import { useIntl } from "react-intl";
import { Keyboard, Platform, View } from "@unthinkable/react-core-components";
import useIsWebView from "../../hooks/useIsWebView";

import CommonText from "../../components/CommonText";
import styles from "./PurchasedPackageDetail.style";
import { TwoColumn, TwoRow } from "../../core/layouts";
import CardComponent from "../../components/CardComponent";
import BadgeLabel from "../../components/BadgeLabel/BadgeLabel";
import { formatDate } from "../../utils/util";
import Chip from "../../components/Chip";
import colors from "../../assets/colors";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import usePackageInactiveHistory from "./containers/usePackageInactiveHistory";
import CustomTable from "../../components/CustomTable";
import {
  ROWS_PER_PAGE_ARRAY as rowsLimit,
  INACTIVE_PACKAGE_TABLE_HEADING as tableHeading,
} from "../../constants/constants";
import { useNavigate } from "../../routes";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import { navigations } from "../../constants/routeNames";
import CustomButton from "../../components/CustomButton";
import CustomModal from "../../components/CustomModal";
import PaymentInitiateModal from "../PaymentInitiateModal";
import useKeyboardShowHideListener from "../../hooks/useKeyboardShowHideListener";
import commonStyles from "../../theme/styles/commonStyles";
import RenderMobileItem from "./Component/RenderMobileItems";

function PurchasedPackageDetail({
  packageName,
  description,
  price,
  validity,
  validityDate,
  status,
  subscriptionId,
}) {
  const intl = useIntl();
  const { isWebView } = useIsWebView();
  const navigate = useNavigate();
  const [showPaymentInitiateModal, setShowPaymentInitiateModal] =
    useState(false);
  const [modalStyle, setModalStyle] = useState({});
  const isIosPlatform = Platform.OS.toLowerCase() === "ios";

  const keyboardDidHideCallback = () => {
    if (isIosPlatform) {
      setModalStyle({ ...styles.modalInnerContainer });
    }
  };

  const keyboardDidShowCallback = (e) => {
    const keyboardHeight = e?.endCoordinates?.height;
    if (isIosPlatform) {
      setModalStyle(commonStyles.largeModalContainer(keyboardHeight));
    }
  };

  useKeyboardShowHideListener({
    keyboardDidHideCallback,
    keyboardDidShowCallback,
  });

  const validityDateFormatted = formatDate(new Date(validityDate));

  const onViewPress = (item) => {
    navigate(`${navigations.PREVIOUS_SUBSCRIPTION_DETAILS}/${item.subscription_id}`);
  };

  const {
    allDataLoaded,
    currentPage,
    currentRecords,
    setCurrentRecords,
    defaultCategory,
    getColoumConfigs,
    handleLoadMore,
    handlePageChange,
    handleRowPerPageChange,
    handleSearchResults,
    getErrorDetails,
    indexOfFirstRecord,
    indexOfLastRecord,
    isError,
    isFirstPageReceived,
    isGeetingJobbSeekers,
    subHeadingText,
    extraDetailsText,
    extraDetailsKey,
    loadingMore,
    rowsPerPage,
    inactiveSubscriptionListData,
    totalcards,
    headingTexts,
    tableIcon,
    isHeading,
  } = usePackageInactiveHistory(onViewPress);

  const handleOnPress = () => {
    navigate(`${navigations.OTHER_PACKAGES}`);
  };

  const handleOnPressRenew = () => {
    setShowPaymentInitiateModal(true);
  };

  const isPackageActive = status === "Active";

  const renderPaymentInitiateModal = () => {
    return (
      <CustomModal
        headerText={"Pay Amount"}
        customInnerContainerStyle={{
          ...styles.modalInnerContainer,
          ...modalStyle,
        }}
        headerTextStyle={styles.headerTextStyle}
        onBackdropPress={() => {
          setShowPaymentInitiateModal(false);
        }}
      >
        <PaymentInitiateModal
          onPressCancel={() => {
            Keyboard.dismiss();
            setShowPaymentInitiateModal(false);
          }}
          amount={price}
          subscriptionId={subscriptionId}
        />
      </CustomModal>
    );
  };

  const renderMobileComponent = (item, index) => {
    return <RenderMobileItem item={item} lastElement={inactiveSubscriptionListData.length -1 === index} onPress={(item)=> {onViewPress(item)}} />;
  };

  return (
    <View style={styles.container}>
      <CommonText customTextStyle={styles.currentPackageText}>
        {intl.formatMessage({ id: "label.current_package" })}
      </CommonText>
      <CardComponent
        customStyle={{
          ...styles.componentStyle,
          ...(isWebView ? styles.webComponentStyle : {}),
        }}
      >
        <TwoRow
          topSection={
            <TwoColumn
              leftSectionStyle={isWebView ? { width: '70%' } : { width: '60%' }}
              rightSectionStyle={isWebView ? {width: '30%', alignItems: 'flex-end'} : {width: '40%', alignItems: 'flex-end'}}
              style={{ justifyContent: 'space-between' }}
              leftSection={
                <>
                  <View>
                    <CommonText
                      customTextStyle={styles.packageNameText}
                      fontWeight={"500"}
                    >
                      {packageName}
                    </CommonText>
                  </View>
                  <CommonText
                    customTextStyle={styles.packageValidityText}
                    fontWeight={"500"}
                  >
                    {`${intl.formatMessage({
                      id: "label.validityFor",
                    })} ${validity} days`}
                  </CommonText>
                </>
              }
              rightSection={
                <CommonText
                  customTextStyle={styles.packagePriceText}
                  fontWeight={"500"}
                >
                  {price}
                </CommonText>
              }
            />
          }
          bottomSection={
            <CommonText
              customTextStyle={styles.packageDescriptionText}
              fontWeight={"500"}
            >
              {description}
            </CommonText>
          }
        />
        <View style={styles.borderStyle} />
        <View
          style={
            isWebView
              ? styles.badgeLabelContainer
              : styles.badgeLabelContainerMob
          }
        >
          <Chip
            bgColor={
              isPackageActive ? colors.lightGreen : colors.lightOrangeThird
            }
            textColor={isPackageActive ? colors.darkSecondGreen : colors.red}
            style={{
              backgroundColor: isPackageActive
                ? colors.lightGreen
                : colors.lightOrangeThird,
              borderRadius: 16,
              width: 200,
            }}
            label={[
              `${intl.formatMessage({
                id: `label.${isPackageActive ? "valid_till" : "expiredOn"}`,
              })} ${validityDateFormatted}`,
            ]}
          />
          <View
            style={
              isWebView ? { flexDirection: "row" } : { flexDirection: "column" }
            }
          >
            <CustomButton
              style={
                isWebView
                  ? { paddingVertical: 12, paddingHorizontal: 16 }
                  : {
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      marginTop: 16,
                    }
              }
              onPress={() => {
                handleOnPress();
              }}
            >
              <CommonText customTextStyle={styles.viewOtherText}>
                {intl.formatMessage({ id: "label.viewOtherPackages" })}
              </CommonText>
            </CustomButton>
            {!isPackageActive ? (
              <CustomButton
                style={
                  isWebView
                    ? {
                        paddingVertical: 12,
                        paddingHorizontal: 16,
                        marginLeft: 24,
                        backgroundColor: colors.green,
                      }
                    : {
                        paddingVertical: 12,
                        paddingHorizontal: 16,
                        backgroundColor: colors.green,
                        marginTop: 16,
                      }
                }
                onPress={() => {
                  handleOnPressRenew();
                }}
              >
                <CommonText customTextStyle={styles.renewSubscriptionText}>
                  {intl.formatMessage({ id: "label.renewSubscription" })}
                </CommonText>
              </CustomButton>
            ) : null}
          </View>
        </View>
      </CardComponent>
      <View>
        <TwoRow
          topSection={
            <CommonText customTextStyle={styles.subscriptionHistoryText}>
              {intl.formatMessage({ id: "label.subscriptionHistory" })}
            </CommonText>
          }
          bottomSection={
            <View style={{flex: 1}}>
              {!isError && (
                <CustomTable
                  {...{
                    customTableStyle:{padding:0, marginTop: 24},
                    allDataLoaded,
                    currentPage,
                    currentRecords,
                    data: inactiveSubscriptionListData,
                    setCurrentRecords,
                    defaultCategory,
                    getColoumConfigs,
                    handleLoadMore,
                    handlePageChange,
                    handleRowPerPageChange,
                    handleSearchResults,
                    headingTexts,
                    isTotalCardVisible: false,
                    hideTotalCount: false,
                    indexOfFirstRecord,
                    indexOfLastRecord,
                    isFirstPageReceived,
                    isGeetingJobbSeekers,
                    isHeading,
                    loadingMore,
                    placeholder: intl.formatMessage({
                      id: "label.serach_by_applicant_name_id",
                    }),
                    rowsLimit,
                    rowsPerPage,
                    subHeadingText,
                    tableHeading,
                    tableIcon,
                    extraDetailsText,
                    extraDetailsKey,
                    showSearchBar: false,
                    totalcards
                  }}
                  containerStyle={{flex: 1, backgroundColor: 'white'}}
                  mobileComponentToRender={(item, index) => renderMobileComponent(item, index)}
                />
              )}
              {isError && !!getErrorDetails()?.errorMessage && (
                <ErrorComponent
                  errorMsg={getErrorDetails()?.errorMessage}
                  onRetry={() => getErrorDetails()?.onRetry()}
                />
              )}
            </View>
          }
        />
      </View>
      {showPaymentInitiateModal && renderPaymentInitiateModal()}
    </View>
  );
}

export default PurchasedPackageDetail;
