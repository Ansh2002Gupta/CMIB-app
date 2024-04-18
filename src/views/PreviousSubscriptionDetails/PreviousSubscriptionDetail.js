import React from "react";
import { useIntl } from "react-intl";
import { TwoColumn, TwoRow } from "../../core/layouts";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

import IconHeader from "../../components/IconHeader/IconHeader";
import useIsWebView from "../../hooks/useIsWebView";
import CommonText from "../../components/CommonText";
import CardComponent from "../../components/CardComponent";
import styles from "./PreviousSubscriptionDetail.styles";
import { ImageBackground, View } from "@unthinkable/react-core-components";
import {
  COMPANY_INACTIVE_SUBSCRIPTION_LISTING,
  COMPANY_SUBSCRIPTION_DETAIL,
} from "../../services/apiServices/apiEndPoint";
import useFetch from "../../hooks/useFetch";
import { formatDate } from "../../utils/util";
import DetailCard from "../../components/DetailCard";
import Spinner from "../../components/Spinner";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import images from "../../images";
import { navigations } from "../../constants/routeNames";

const PreviousSubscriptionDetail = () => {
  const intl = useIntl();
  const { isWebView } = useIsWebView();
  const params = useParams();
  const navigate = useNavigate();

  const higher_secondary_detail = () => [
    {
      key: "packageName",
      label: "label.packageName",
      value: inactiveSubscriptionDetail?.package_name ?? "-",
    },
    {
      key: "description",
      label: "label.description",
      value: inactiveSubscriptionDetail?.description ?? "-",
    },
    {
      key: "price",
      label: "label.price",
      value: inactiveSubscriptionDetail?.price ?? "--",
    },
    {
      key: "packageValidityPeriod",
      label: "label.packageValidityPeriod",
      value: `${inactiveSubscriptionDetail?.validity ?? "--"} Days`,
    },
    {
      key: "startDate",
      label: "label.startDate",
      value: formatDate(inactiveSubscriptionDetail?.start_date) ?? "--",
    },
    {
      key: "endDate",
      label: "label.endDate",
      value: formatDate(inactiveSubscriptionDetail?.end_date) ?? "--",
    },
  ];

  const {
    data: inactiveSubscriptionDetail,
    isLoading: isInactiveSubscriptionDetailLoading,
    isError: isInactiveSubscriptionDetailError,
    error: errorInactiveSubscriptionDetailData,
  } = useFetch({
    url: `${COMPANY_SUBSCRIPTION_DETAIL}/${params.subscriptionId}`,
  });

  if (isInactiveSubscriptionDetailLoading) {
    return (
      <View style={styles.loaderStyle}>
        <Spinner />
      </View>
    );
  }

  if (isInactiveSubscriptionDetailError) {
    return (
      <ErrorComponent
        errorMsg={errorInactiveSubscriptionDetailData?.data?.message}
      />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {!isWebView ? (
        <IconHeader
          showInWeb={isWebView}
          hasIconBar
          headerText={intl.formatMessage({
            id: "label.previous_subscription_detail",
          })}
          intl={intl}
          iconLeft={images.iconBack}
          onPressLeftIcon={() => {
            navigate(navigations.MANAGE_SUBSCRIPTION);
          }}
        />
      ) : null}
      <TwoRow
        topSection={
          isWebView ? (
            <IconHeader
              hasIconBar
              headerText={intl.formatMessage({
                id: "label.previous_subscription_detail",
              })}
            />
          ) : null
        }
        isBottomFillSpace
        bottomSectionStyle={{ padding: 24 }}
        bottomSection={
          <>
            <DetailCard details={higher_secondary_detail()} />
          </>
        }
      />
    </View>
  );
};

export default PreviousSubscriptionDetail;
