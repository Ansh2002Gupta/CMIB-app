import React, { useContext, useEffect, useState } from "react";
import { useTheme } from "@unthinkable/react-theme";
import { useParams } from "react-router";
import { View } from "@unthinkable/react-core-components";

import commonStyles from "../../../../../theme/styles/commonStyles";
import CommonText from "../../../../../components/CommonText";
import { convertStringtoNumber, formatDate } from "../../../../../utils/util";
import useFetch from "../../../../../hooks/useFetch";
import useGetCurrentUser from "../../../../../hooks/useGetCurrentUser";
import {
  APPLICATION,
  BILLING_INFO,
  ROUNDS,
  USER_TYPE_COMPANY,
} from "../../../../../services/apiServices/apiEndPoint";
import { useIntl } from "react-intl";
import {
  API_VERSION_QUERY_PARAM,
  NEWLY_QUALIFIED,
  SESSION_ID_QUERY_PARAM,
  UPDATED_API_VERSION,
} from "../../../../../constants/constants";
import { SideBarContext } from "../../../../../globalContext/sidebar/sidebarProvider";
import getStyles from "../BillingInfo.style";

const useBillingInfo = () => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const intl = useIntl();
  const { id } = useParams();
  const { currentModule } = useGetCurrentUser();
  const [billingListData, setBillingListData] = useState([]);
  const [sideBarState] = useContext(SideBarContext);
  const sessionId = sideBarState?.selectedSession?.value;
  const [totalAmount, setTotalAmount] = useState({
    totalPsychometricTestFee: 0,
    totalAmount: 0,
    finalAmount: 0,
  });

  const {
    fetchData,
    isLoading: isLoadingBilling,
    isError: isErrorListing,
    error: errorWhileFetchingList,
  } = useFetch({
    url:
      USER_TYPE_COMPANY +
      `/${currentModule}` +
      ROUNDS +
      `/${id}` +
      APPLICATION +
      `${BILLING_INFO}?${SESSION_ID_QUERY_PARAM}=${sessionId}`,
    apiOptions: {
      headers: {
        [API_VERSION_QUERY_PARAM]: UPDATED_API_VERSION,
      },
    },
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  useEffect(() => {
    const fetchBillingData = async () => {
      let totalPsychometricTestFee = 0;
      let totalAmount = 0;
      let finalAmount = 0;
      if (currentModule && sessionId) {
        const newData = await fetchData();
        if (!!newData && newData.length) {
          newData.forEach((item) => {
            totalPsychometricTestFee += convertStringtoNumber(
              item?.psychometric_test_fee
            );
            totalAmount += convertStringtoNumber(item?.amount);
            finalAmount = totalAmount + totalPsychometricTestFee;
          });
          setTotalAmount({
            totalPsychometricTestFee,
            totalAmount,
            finalAmount,
          });
          setBillingListData([...newData]);
        }
      }
    };
    fetchBillingData();
  }, [currentModule, sessionId]);

  const getColoumConfigs = (
    item,
    isHeading,
    index,
    isShowFinalAmount = false
  ) => {
    const tableStyle = isHeading
      ? commonStyles.tableHeadingText
      : commonStyles.cellTextStyle();

    const isPsychometricTab =
      currentModule === NEWLY_QUALIFIED
        ? {
            content: !!item.psychometric_test_fee && (
              <CommonText customTextStyle={tableStyle}>
                {item.psychometric_test_fee}&nbsp;INR
              </CommonText>
            ),
            style: commonStyles.columnStyle("25%"),
            isFillSpace: true,
          }
        : {};

    return [
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item.centre_name}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item.total_vacancies}
          </CommonText>
        ),
        style: commonStyles.columnStyle("10%"),
        isFillSpace: true,
      },
      {
        ...isPsychometricTab,
      },
      {
        content: isHeading ? (
          <CommonText customTextStyle={tableStyle}>
            {item.interview_dates}
          </CommonText>
        ) : (
          <View style={styles.interviewDatesContainer}>
            {item?.interview_dates.map((dates, index) => {
              const lastItem = item.interview_dates.length - 1 === index;
              return (
                <>
                  <CommonText customTextStyle={tableStyle}>
                    {formatDate(dates)}
                  </CommonText>
                  {!lastItem && (
                    <CommonText customTextStyle={tableStyle}>
                      ,&nbsp;
                    </CommonText>
                  )}
                </>
              );
            })}
          </View>
        ),
        style: commonStyles.columnStyle("20%"),
        isFillSpace: true,
      },
      {
        content: isShowFinalAmount ? (
          <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
            {intl.formatMessage({ id: "label.total_amount" })}
            &#58;&nbsp;&nbsp;&nbsp;
            {item.finalAmount}&nbsp;INR
          </CommonText>
        ) : (
          <CommonText customTextStyle={tableStyle}>
            {item.amount}&nbsp;INR
          </CommonText>
        ),
        style: commonStyles.columnStyle("30%"),
        isFillSpace: true,
      },
    ];
  };

  return {
    billingListData,
    currentModule,
    errorWhileFetchingList,
    fetchData,
    getColoumConfigs,
    isLoadingBilling,
    isErrorListing,
    totalAmount,
  };
};

export default useBillingInfo;
