import React from "react";
import { useIntl } from "react-intl";
import { TwoRow } from "../../core/layouts";

import IconHeader from "../../components/IconHeader/IconHeader";
import useIsWebView from "../../hooks/useIsWebView";
import styles from "./OtherPackages.style";
import { ScrollView, View } from "@unthinkable/react-core-components";
import { COMPANY_SUBSCRIPTION_LISTING } from "../../services/apiServices/apiEndPoint";
import useFetch from "../../hooks/useFetch";
import Spinner from "../../components/Spinner";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import CaJobsPackagesListing from "../CAJobsPackgesListing/CaJobsPackagesListing";

const OtherPackages = () => {
  const intl = useIntl();
  const { isWebView } = useIsWebView();

  const {
    data: subscriptionListingData,
    isLoading: isSubscriptionListingLoading,
    isError: isErrorSubscriptionListing,
    error: errorSubscriptionListing,
  } = useFetch({
    url: COMPANY_SUBSCRIPTION_LISTING,
  });

  return (
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
                  />
                </ScrollView>
              )}
            </>
          )}
        </>
      }
    />
  );
};

export default OtherPackages;
