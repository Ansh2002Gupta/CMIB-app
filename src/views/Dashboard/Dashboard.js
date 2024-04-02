import React, { useContext, useState } from "react";
import { useIntl } from "react-intl";
import { View, Text } from "@unthinkable/react-core-components";
import useIsWebView from "../../hooks/useIsWebView";

import AddDesignation from "../../containers/AddDesignation/AddDesignation";
import CommonText from "../../components/CommonText";
import CustomCell from "../../components/CustomCell/";
import DetailCard from "../../components/DetailCard/DetailCard";
import MultiColumn from "../../core/layouts/MultiColumn";
import SearchView from "../../components/SearchView";
import TouchableImage from "../../components/TouchableImage";
import images from "../../images";
import styles from "./dashboard.style";
import IconHeader from "../../components/IconHeader/IconHeader";
import { TwoColumn, TwoRow } from "../../core/layouts";
import CustomButton from "../../components/CustomButton";
import CustomTouchableOpacity from "../../components/CustomTouchableOpacity";
import useFetch from "../../hooks/useFetch";
import {
  COMPANY_SUBSCRIPTION_LISTING,
  USER_TYPE_COMPANY,
} from "../../services/apiServices/apiEndPoint";
import CustomImage from "../../components/CustomImage";
import PackageListing from "./PackageListing";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { ScrollView } from "@unthinkable/react-core-components";

// Just ignore this file as just to test custom component
function DashboardView() {
  const intl = useIntl();
  const { isWebView } = useIsWebView();

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
    url: `${USER_TYPE_COMPANY}/1/status`,
  });

  console.log(subscribedPackageData, "subscribedPackageData");
  // const [userProfileDetails] =
  //   useContext(UserProfileContext);

  // const [isEnabled, setIsEnabled] = useState(false);

  // const dataList = ["Apple", "Banana", "Orange", "Mango", "Pineapple", "Grape"];
  // const FilterIcon = images.iconFilter;
  // const MoreIcon = images.iconMore;
  // const AddIcon = images.iconAdd;

  // const toggleSwitch = () => {
  //   setIsEnabled((previousState) => !previousState);
  // };

  // const handleAddDesignation = () => {
  //   setIsEnabled((previousState) => !previousState);
  // };

  // const handleSearchResults = (filteredData) => { };

  // const searchData = [
  //   {
  //     content: <SearchView data={dataList} onSearch={handleSearchResults} />,
  //     style: {},
  //     isFillSpace: true,
  //   },
  //   {
  //     content: (
  //       <TouchableImage
  //         source={FilterIcon}
  //         parentStyle={styles.imageParentStyle}
  //       />
  //     ),
  //     style: {},
  //     isFillSpace: false,
  //   },
  //   {
  //     content: (
  //       <TouchableImage
  //         source={MoreIcon}
  //         disabled={false}
  //         isSelector={true}
  //         parentStyle={styles.imageParentStyle}
  //       />
  //     ),
  //     style: {},
  //     isFillSpace: false,
  //   },
  // ];

  // const [selectBoxState, setSelectBoxState] = useState([
  //   {
  //     isSelected: false,
  //     label: "Ca Jobs",
  //     name: "Ca Jobs",
  //     selectedIndex: null,
  //     value: "Ca Jobs",
  //   },
  //   {
  //     isSelected: false,
  //     label: "Nqca",
  //     name: "Nqca",
  //     selectedIndex: null,
  //     value: "Nqca",
  //   },
  // ]);

  // const handleModuleSelection = (updatedSelectedItems) => {
  //   const updatedState = selectBoxState.map((item) => {
  //     if (item.value === updatedSelectedItems) {
  //       if (item.isSelected) {
  //         item.isSelected = false;
  //       } else {
  //         item.isSelected = true;
  //       }
  //       return item;
  //     }
  //     return item;
  //   });
  //   setSelectBoxState(updatedState);
  // };

  const handleViewpackages = () => {
    fetchDataSubscriptionListing();
  };

  return (
    <View style={styles.container}>
      <TwoRow
        topSection={
          <IconHeader
            hasActionButton={false}
            showInWeb={isWebView}
            hasIconBar
            headerText={intl.formatMessage({ id: "label.dashboard" })}
            intl={intl}
          />
        }
        isBottomFillSpace
        bottomSection={
          <ScrollView style={{ flex: 1 }}>
            <View style={{ paddingLeft: 16, paddingRight: 16 }}>
              <TwoRow
                topSection={
                  <View style={styles.headingTextContainer}>
                    <CommonText
                      customTextStyle={styles.headingText}
                      fontWeight={"500"}
                    >
                      Subscribe to Get Started!
                    </CommonText>
                    <CommonText
                      customTextStyle={styles.subHeadingText}
                      fontWeight={"500"}
                    >
                      Unlock the following benefits and features by subscribing
                      to one of our packages, starting at just ₹2000.
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
                            Post Jobs Openings and find top talent effortlessly
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
                            Schedule Interviews with Applicants & streamline
                            hiring process
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
                            Tap into an extensive database of Job Seekers
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
                          View Packages
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
              <PackageListing
                subscriptionListingData={subscriptionListingData}
              />
            </View>
          </ScrollView>
        }
      />
    </View>
  );
}

export default DashboardView;
