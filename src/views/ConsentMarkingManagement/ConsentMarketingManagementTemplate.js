import React from "react";
import { Text, View } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";

import styles from "./ConsentMarkingManagement.styles";
import useIsWebView from "../../hooks/useIsWebView";
import { CustomTabs } from "../../components/Tab";
import CustomTable from "../../components/CustomTable";
import { TwoColumn, TwoRow } from "../../core/layouts";
import SearchView from "../../components/SearchView";
import useContentMarketingManagement from "./controller/useContentMarketingManagement";
import {
    ROWS_PER_PAGE_ARRAY as rowsLimit,
    ROUND_ONE_CONSENT_MARKETING_MANAGEMENT as tableHeading,
} from "../../constants/constants";
import colors from "../../assets/colors";
import AddTicketModal from "../../components/AddTicketModal/AddTicketModal";

const ConsentMarketingManagementTemplate = ({

    intl
}) => {

    const { isWebView } = useIsWebView();
    const onViewPress = (item) => {
        console.log("item---", item)
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
    } = useContentMarketingManagement(onViewPress);

    const CommonTableComponent = () => {
        return <View style={{ backgroundColor: colors.backgroundGrey, height: !isWebView && '100%' }}>

            <SearchView
                customParentStyle={{ width: isWebView ? "30%" : "60%", margin: 16 }}
                customSearchCriteria={() => { }}
                placeholder={'Search by company name'}
            />
            <CustomTable
                {...{
                    customTableStyle: { padding: 16 },
                    allDataLoaded,
                    currentPage,
                    currentRecords: [
                        { employer_name: 'Basic', interview_type: 'random', mode: 'Offline', interview_dates: '18/7/2023', shortlisting_round: '2' },
                        { employer_name: 'Basic', interview_type: 'random', mode: 'Offline', interview_dates: '18/7/2023', shortlisting_round: '2' },
                        { employer_name: 'Basic', interview_type: 'random', mode: 'Offline', interview_dates: '18/7/2023', shortlisting_round: '2' },
                        { employer_name: 'Basic', interview_type: 'random', mode: 'Offline', interview_dates: '18/7/2023', shortlisting_round: '2' }
                    ],
                    data: [
                        { employer_name: 'Basic', interview_type: 'random', mode: 'Offline', interview_dates: '18/7/2023', shortlisting_round: '2' },
                        { employer_name: 'Basic', interview_type: 'random', mode: 'Offline', interview_dates: '18/7/2023', shortlisting_round: '2' },
                        { employer_name: 'Basic', interview_type: 'random', mode: 'Offline', interview_dates: '18/7/2023', shortlisting_round: '2' },
                        { employer_name: 'Basic', interview_type: 'random', mode: 'Offline', interview_dates: '18/7/2023', shortlisting_round: '2' }
                    ],
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
                    totalcards,

                }}

            />

        </View>
    }

    return (
        <View style={styles.mainContainer}>
            <View
                style={isWebView ? styles.webHeaderContainer : styles.headerContainer}>
                <CommonText
                    customTextStyle={styles.headerText(isWebView)}
                    fontWeight={"600"}>
                    {intl.formatMessage({ id: "label.consent_marking_management" })}
                </CommonText>

            </View>
            <View style={styles.row}>
                <CustomTabs
                    renderHeader={() => { }}
                    renderFooter={() => { }}
                    tabs={[
                        {
                            label: "AHEMDABAD-I",
                            component: <CommonTableComponent />
                        },
                        {
                            label: "AKOLA",
                            component: <CommonTableComponent />
                        },
                        {
                            label: "AURANGABAD-II",
                            component: <CommonTableComponent />
                        },
                        {
                            label: "GURGAON",
                            component: <CommonTableComponent />
                        },

                    ]}
                />
            </View>
        </View>
    );
};

export default ConsentMarketingManagementTemplate;


