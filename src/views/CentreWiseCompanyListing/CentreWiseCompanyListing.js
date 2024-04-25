import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useTheme } from "@unthinkable/react-theme";
import { View } from "@unthinkable/react-core-components";
import useNavigateScreen from "../../services/hooks/useNavigateScreen";
import getStyles from "./CentreWiseCompanyListing.styles";
import IconHeader from "../../components/IconHeader/IconHeader";
import { CustomTabs } from "../../components/Tab";
import CustomTable from "../../components/CustomTable";
import useGetCenterWiseComppanyList from "./controller/useGetCenterWiseCompanyList";
import {
  ROWS_PER_PAGE_ARRAY as rowsLimit,
  COMPANY_NAME_LISTING as tableHeading,
} from "../../constants/constants";
import RenderMobileItem from "../../containers/PurchasedPackageDetail/Component/RenderMobileItems";
import { urlService } from "../../services/urlService";
import { useNavigate, useParams } from "react-router";
import CommonText from "../../components/CommonText";
import PopupMessage from "../../components/PopupMessage/PopupMessage";
import images from "../../images";
import TouchableImage from "../../components/TouchableImage";
import { navigations } from "../../constants/routeNames";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";

const CentreWiseCompanyListing = () => {
  const id = urlService.getQueryStringValue("id");
  const [currentPopUpMessage, setCurrentPopupMessage] = useState(-1);
  const intl = useIntl();
  const theme = useTheme()
  const styles = getStyles(theme)

  const {
    allDataLoaded,
    currentRecords,
    currentPage,
    filterApplyHandler,
    filterCategory,
    getColoumConfigs,
    getStatusStyle,
    handleLoadMore,
    handlePageChange,
    handleRowPerPageChange,
    handleSearchResults,
    handleSaveAddTicket,
    headingTexts,
    indexOfFirstRecord,
    indexOfLastRecord,
    isHeading,
    isTicketListingLoading,
    isFirstPageReceived,
    getErrorDetails,
    isError,
    loadingMore,
    onIconPress,
    queryTypeData,
    rowsPerPage,
    setCurrentRecords,
    statusData,
    statusText,
    subHeadingText,
    tableIcon,
    totalcards,
    companyLocation,
    companyNameListing,
    fetchCompanyName,
  } = useGetCenterWiseComppanyList(id);

  const navigate = useNavigate();

  const getMobileView = (item, index) => {
    return (
      <View style={styles.mobileContainerStyle}>
        <CommonText customContainerStyle={styles.flex1}>
          {item?.name ?? "-"}
        </CommonText>
        <View>
          <TouchableImage
            onPress={() => {
              setCurrentPopupMessage(item.id);
            }}
            source={images.iconMore}
            imageStyle={styles.iconStyle}
            isSvg={true}
          />
          {currentPopUpMessage === item.id && (
            <View>
              <PopupMessage
                message={[
                  {
                    name: intl.formatMessage({
                      id: "label.viewCompanyDetails",
                    }),
                  },
                ]}
                onPopupClick={() => {
                  setCurrentPopupMessage(-1);
                  navigate(navigations.COMPANY_DETAILS);
                }}
                labelName={"name"}
                isPopupModal
                onPopUpClose={() => setCurrentPopupMessage(-1)}
              />
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View>
      <IconHeader
        headerText={intl.formatMessage({
          id: "label.center_wise_company_detail",
        })}
        isBorderVisible={false}
      />
      <View>
        <CustomTabs
          tabs={companyLocation ?? []}
          cleanupFuntion={(item) => {
            const centerId = companyLocation[item].id;
            fetchCompanyName(centerId);
          }}
          containerStyle={styles.iconHeaderStyle}
        />
        {!isError && (
          <CustomTable
            {...{
              allDataLoaded,
              currentPage,
              currentRecords,
              filterApplyHandler,
              filterCategory,
              getColoumConfigs,
              getStatusStyle,
              handleLoadMore,
              getErrorDetails,
              tableHeading,
              handlePageChange,
              handleRowPerPageChange,
              handleSearchResults,
              handleSaveAddTicket,
              headingTexts,
              indexOfFirstRecord,
              indexOfLastRecord,
              isHeading,
              isFirstPageReceived,
              loadingMore,
              onIconPress,
              queryTypeData,
              rowsLimit,
              rowsPerPage,
              setCurrentRecords,
              statusData,
              statusText,
              subHeadingText,
              tableHeading,
              tableIcon,
              totalcards,
              placeholder: intl.formatMessage({
                id: "label.search_by_company_name",
              }),
            }}
            isTicketListingLoading={isTicketListingLoading}
            mobileComponentToRender={getMobileView}
            isFilterVisible={false}
            containerStyle={styles.innerContainerStyle}
            isTotalCardVisible={false}
            data={companyNameListing}
          />
        )}
        {isError && !!getErrorDetails()?.errorMessage && (
          <ErrorComponent
            errorMsg={getErrorDetails()?.errorMessage}
            onRetry={() => getErrorDetails()?.onRetry()}
          />
        )}{" "}
      </View>
    </View>
  );
};

export default CentreWiseCompanyListing;
