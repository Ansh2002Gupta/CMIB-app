import React from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../../../routes";
import { View, Platform } from "@unthinkable/react-core-components";

import CardComponent from "../../../../components/CardComponent";
import CommonText from "../../../../components/CommonText";
import CustomScrollView from "../../../../components/CustomScrollView";
import CustomTable from "../../../../components/CustomTable";
import { TRANSACTION_LIST_HEADING } from "../../../../constants/constants";
import useBillingInfo, { transactionList } from "./controller/useBillingInfo";
import styles from "./BillingInfo.style";
import { TwoRow } from "../../../../core/layouts";
import images from "../../../../images";
import ActionPairButton from "../../../../components/ActionPairButton";
import CustomButton from "../../../../components/CustomButton";
import commonStyles from "../../../../theme/styles/commonStyles";

const BillingInfo = ({ tabHandler }) => {
  const { getStatusStyle, getColoumConfigs, handleSaveAndNext } =
    useBillingInfo();
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
                currentRecords: transactionList,
                data: transactionList,
                getColoumConfigs,
                getStatusStyle,
                isShowPagination: false,
                isHeading: true,
                tableHeading: TRANSACTION_LIST_HEADING,
              }}
            />
          </CardComponent>
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

export default BillingInfo;
