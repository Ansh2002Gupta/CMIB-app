import React from "react";
import { useIntl } from "react-intl";
import { useTheme } from "@unthinkable/react-theme";
import { TwoRow } from "../../core/layouts";
import { useNavigate } from "react-router";

import IconHeader from "../../components/IconHeader/IconHeader";
import useIsWebView from "../../hooks/useIsWebView";
import { ScrollView, View } from "@unthinkable/react-core-components";
import {
  COMPANY_SUBSCRIPTION_LISTING,
  COMPANY_SUBSCRIPTION_STATUS,
} from "../../services/apiServices/apiEndPoint";
import useFetch from "../../hooks/useFetch";
import Spinner from "../../components/Spinner";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import CaJobsPackagesListing from "../CAJobsPackgesListing/CaJobsPackagesListing";
import images from "../../images";
import { navigations } from "../../constants/routeNames";
import getStyles from "./OtherPackages.style";

const OtherPackages = () => {
  const intl = useIntl();
  const theme = useTheme();
  const styles = getStyles(theme);
  const { isWebView } = useIsWebView();
  const navigate = useNavigate();

  const {
    data: subscriptionListingData,
    isLoading: isSubscriptionListingLoading,
    isError: isErrorSubscriptionListing,
    error: errorSubscriptionListing,
  } = useFetch({
    url: COMPANY_SUBSCRIPTION_LISTING,
  });

  const {
    data: subscribedPackageData,
    isLoading: isPackageSubscribedLoading,
    isError: isPackageSubscribedError,
    error: errorPackageSubscribed,
  } = useFetch({
    url: `${COMPANY_SUBSCRIPTION_STATUS}`,
  });

  return (
    <View style={{ flex: 1 }}>
      {!isWebView ? (
        <IconHeader
          showInWeb={isWebView}
          hasIconBar
          headerText={intl.formatMessage({ id: "label.otherPackages" })}
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
                id: "label.otherPackages",
              })}
            />
          ) : null
        }
        isBottomFillSpace
        bottomSection={
          <>
            {isSubscriptionListingLoading ? (
              <View style={styles.loaderStyle}>
                <Spinner />
              </View>
            ) : (
              <>
                {isErrorSubscriptionListing ? (
                  <ErrorComponent
                    errorMsg={errorSubscriptionListing?.data?.message}
                  />
                ) : (
                  <ScrollView style={styles.container}>
                    <CaJobsPackagesListing
                      subscriptionListingData={subscriptionListingData}
                      isExpired={
                        subscribedPackageData?.status.toLowerCase() ===
                        "inactive"
                      }
                    />
                  </ScrollView>
                )}
              </>
            )}
          </>
        }
      />
    </View>
  );
};

export default OtherPackages;
