import React from "react";
import { useNavigate } from "react-router";
import { useIntl } from "react-intl";
import useIsWebView from "../../hooks/useIsWebView";
import { useTheme } from "@unthinkable/react-theme";
import { View, ScrollView } from "@unthinkable/react-core-components";

import getStyles from "./ManageSubscription.style";
import useFetch from "../../hooks/useFetch";
import {
  COMPANY_SUBSCRIPTION_LISTING,
  COMPANY_SUBSCRIPTION_STATUS,
} from "../../services/apiServices/apiEndPoint";
import PurchasedPackage from "../../containers/PurchasedPackageDetail";
import CustomTouchableOpacity from "../../components/CustomTouchableOpacity";
import CommonText from "../../components/CommonText";
import CustomImage from "../../components/CustomImage";
import images from "../../images";
import CAJobsPackagesListing from "../../containers/CAJobsPackgesListing";
import { TwoColumn, TwoRow } from "../../core/layouts";
import Spinner from "../../components/Spinner";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import IconHeader from "../../components/IconHeader/IconHeader";
import { navigations } from "../../constants/routeNames";

function ManageSubscription() {
  const intl = useIntl();
  const { isWebView } = useIsWebView();
  const navigate = useNavigate();

  const theme = useTheme();
  const styles = getStyles(theme);

  const {
    data: subscriptionListingData,
    isLoading: isSubscriptionListingLoading,
    fetchData: fetchDataSubscriptionListing,
    isError: isErrorSubscriptionListing,
    error: errorSubscriptionListing,
  } = useFetch({
    url: COMPANY_SUBSCRIPTION_LISTING,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const {
    data: subscribedPackageData,
    isLoading: isPackageSubscribedLoading,
    isError: isPackageSubscribedError,
    error: errorPackageSubscribed,
  } = useFetch({
    url: `${COMPANY_SUBSCRIPTION_STATUS}`,
  });

  const errorMessage = errorPackageSubscribed || errorSubscriptionListing;

  const handleViewpackages = () => {
    fetchDataSubscriptionListing();
  };

  if (isPackageSubscribedLoading || isSubscriptionListingLoading) {
    return (
      <View style={styles.loaderStyle}>
        <Spinner />
      </View>
    );
  }

  if (isErrorSubscriptionListing || isPackageSubscribedError) {
    return <ErrorComponent errorMsg={errorMessage?.data?.message} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <IconHeader
        showInWeb={isWebView}
        hasIconBar
        headerText={intl.formatMessage({ id: "label.manageSubscription" })}
        intl={intl}
        iconLeft={images.iconBack}
        onPressLeftIcon={() => {
          navigate(navigations.MODULE_LANDING_PAGE);
        }}
      />
      <ScrollView style={styles.container}>
        <View style={{ paddingLeft: 16, paddingRight: 16, width: "100%" }}>
          {!Array.isArray(subscribedPackageData) ? (
            <PurchasedPackage
              packageName={subscribedPackageData?.package_name}
              description={subscribedPackageData?.description}
              price={subscribedPackageData?.price}
              validity={subscribedPackageData?.validity}
              validityDate={subscribedPackageData?.validity_date}
              status={subscribedPackageData?.status}
              subscriptionId={subscribedPackageData?.subscription_id}
            />
          ) : (
            <>
              <TwoRow
                topSection={
                  <View style={styles.headingTextContainer}>
                    <CommonText
                      customTextStyle={styles.headingText}
                      fontWeight={"500"}
                    >
                      {intl.formatMessage({
                        id: "label.subscribe_to_get_started",
                      })}
                    </CommonText>
                    <CommonText
                      customTextStyle={styles.subHeadingText}
                      fontWeight={"500"}
                    >
                      {intl.formatMessage({
                        id: "label.unlock_benefits_features_of_packages",
                      })}
                    </CommonText>
                  </View>
                }
                bottomSection={
                  <View
                    style={
                      isWebView
                        ? styles.pointersButtonContainer
                        : styles.pointersButtonContainerMob
                    }
                  >
                    <View style={styles.pointerMainContainer}>
                      <TwoColumn
                        style={styles.pointersContainer}
                        leftSection={
                          <CustomImage
                            style={styles.tickIcon}
                            source={images.iconTickCircle}
                          />
                        }
                        rightSection={
                          <CommonText
                            customContainerStyle={styles.pointersTextContainer}
                            customTextStyle={
                              isWebView
                                ? styles.pointersTextWeb
                                : styles.pointersText
                            }
                            fontWeight={"600"}
                          >
                            {intl.formatMessage({
                              id: "label.post_jobs_openings_find_top_talent",
                            })}
                          </CommonText>
                        }
                      />
                      <TwoColumn
                        style={styles.pointersContainer}
                        leftSection={
                          <CustomImage
                            style={styles.tickIcon}
                            source={images.iconTickCircle}
                          />
                        }
                        rightSection={
                          <CommonText
                            customTextStyle={
                              isWebView
                                ? styles.pointersTextWeb
                                : styles.pointersText
                            }
                            fontWeight={"600"}
                          >
                            {intl.formatMessage({
                              id: "label.schedule_interviews_with_applicants",
                            })}
                          </CommonText>
                        }
                      />
                      <TwoColumn
                        style={styles.pointersContainer}
                        leftSection={
                          <CustomImage
                            style={styles.tickIcon}
                            source={images.iconTickCircle}
                          />
                        }
                        rightSection={
                          <CommonText
                            customTextStyle={
                              isWebView
                                ? styles.pointersTextWeb
                                : styles.pointersText
                            }
                            fontWeight={"600"}
                          >
                            {intl.formatMessage({
                              id: "label.tap_into_extensive_database_job_seeker",
                            })}
                          </CommonText>
                        }
                      />
                    </View>
                    {!subscriptionListingData &&
                    !subscriptionListingData?.length > 0 ? (
                      <CustomTouchableOpacity
                        style={styles.viewPackagesButton}
                        onPress={handleViewpackages}
                      >
                        <CommonText customTextStyle={styles.viewPackageText}>
                          {intl.formatMessage({ id: "label.view_packages" })}
                        </CommonText>
                        <CustomImage
                          style={styles.arrowDown}
                          source={images.iconLineArrowDown}
                        />
                      </CustomTouchableOpacity>
                    ) : null}
                  </View>
                }
              />
              <CAJobsPackagesListing
                subscriptionListingData={subscriptionListingData}
                isSubscribe={true}
              />
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

export default ManageSubscription;
