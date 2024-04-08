import React from "react";
import styles from "./styles";
import useIsWebView from "../../hooks/useIsWebView";
import CommonText from "../../components/CommonText";
import { TwoRow } from "../../core/layouts";
import SearchView from "../../components/SearchView";
import SavedJobComponent from "../../components/SavedJobComponent";
import { FlatList, Platform, View } from "@unthinkable/react-core-components";
import { useIntl } from "react-intl";
import Spinner from "../../components/Spinner";
import {
  ROWS_PER_PAGE_ARRAY as rowsLimit,
  STATUS_CODES,
} from "../../constants/constants";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import PaginationFooter from "../../components/PaginationFooter";
import { useNavigate } from "react-router";
import { navigations } from "../../constants/routeNames";

const AllJobsTemplate = ({
  data,
  handleSearch,
  handleLoadMore,
  error,
  rowsPerPage,
  currentPage,
  handlePageChange,
  totalPages,
  isJobListLoading,
  handleRowPerPageChange,
  isFirstPageReceived,
}) => {
  const { isWebView } = useIsWebView();
  const intl = useIntl();
  const isWeb = Platform.OS.toLowerCase() === "web";
  const navigate = useNavigate();

  const keyExtractor = (item) => item.id;

  const handleClickOnJobCard = (jobId) => {
    navigate(`${navigations.CA_JOBS}/${navigations.JOB_DETAIL}/${jobId}`);
  };

  const renderJobCard = ({ item, index }) => {
    return (
      <View style={styles.jobComponent}>
        <SavedJobComponent
          details={item}
          onPress={handleClickOnJobCard}
          isSaveVisible={true} //TODO: need to check if job is saved or not
          containerStyle={{ ...(index === 0 ? styles.savedJobComponent : {}) }}
        />
      </View>
    );
  };

  const listSection = () => {
    if ((isWeb && isJobListLoading) || isFirstPageReceived) {
      return (
        <View style={styles.loaderStyle}>
          <Spinner />
        </View>
      );
    }

    if (error && error?.code !== STATUS_CODES.UNAUTHORIZED_USER) {
      return <ErrorComponent errorMsg={error.message} />;
    }

    if (!data?.length) {
      return (
        <View style={styles.noResultContainer}>
          <CommonText customTextStyle={styles.noResultText} fontWeight={"600"}>
            {intl.formatMessage({ id: "label.no_result_found" })}
          </CommonText>
        </View>
      );
    }

    return (
      <FlatList
        data={data}
        renderItem={renderJobCard}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        onEndReached={() => {
          handleLoadMore();
        }}
        ListFooterComponent={
          <View style={{ ...styles.loaderStyle, ...styles.listFooter }}>
            {isJobListLoading ? <Spinner /> : null}
          </View>
        }
        onEndReachedThreshold={0.1}
        style={styles.flatlist}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TwoRow
        topSection={
          isWeb && (
            <View style={styles.header}>
              <CommonText customTextStyle={styles.headerText}>
                {intl.formatMessage({ id: "label.all_Jobs" })}
              </CommonText>
            </View>
          )
        }
        bottomSection={
          <TwoRow
            style={styles.innerContainer}
            topSection={
              <SearchView
                placeholder={intl.formatMessage({
                  id: "label.allJobSearchPlaceholder",
                })}
                customParentStyle={isWebView && styles.customParentStyle}
                customSearchCriteria={handleSearch}
              />
            }
            topSectionStyle={styles.topSection}
            bottomSection={
              <View>
                <View style={styles.listSectionContainer}>{listSection()}</View>
                {isWeb && (
                  <PaginationFooter
                    {...{
                      rowsPerPage,
                      rowsLimit,

                      currentPage,
                      handlePageChange,
                      prevNextBtnstyles: isWebView
                        ? styles.previousButtonWeb
                        : styles.previousButton,
                      siblingCount: 1,
                      totalcards: totalPages,
                      containerStyle: styles.pagination,
                      handleRowPerPageChange,
                    }}
                  />
                )}
              </View>
            }
            bottomSectionStyle={styles.bottomSectionStyle}
          />
        }
        isBottomFillSpace
      />
    </View>
  );
};

export default AllJobsTemplate;
