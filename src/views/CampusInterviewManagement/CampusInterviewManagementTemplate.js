import React from "react";
import { Text, View } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";

import styles from "./CampusInterviewManagement.styles";
import useIsWebView from "../../hooks/useIsWebView";
import { CustomTabs } from "../../components/Tab";
import CustomTable from "../../components/CustomTable";
import { TwoColumn, TwoRow } from "../../core/layouts";
import useCampusInterviewManagement from "./controller/useCampusInterviewManagement";
import {
    ROWS_PER_PAGE_ARRAY as rowsLimit,
    ROUND_ONE_CONSENT_MARKETING_MANAGEMENT as tableHeading,
    ROUND_ONE_CONSENT_MARKETING_MANAGEMENT_CAMPUS as campusTableHeading
} from "../../constants/constants";
import colors from "../../assets/colors";
import RenderMobileItem from "../../containers/PurchasedPackageDetail/Component/RenderMobileItems";

const CampusInterviewManagementTemplate = ({
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
        getCampusColoumConfigs,
    } = useCampusInterviewManagement(onViewPress);

    const WrittenTestTable = () => {
        return <View style={{ backgroundColor: colors.backgroundGrey, height: !isWebView && '100%' }}>

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
                    placeholder: "",
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
                containerStyle={{ flex: 1, backgroundColor: colors.white }}
            // mobileComponentToRender={getMobileView}
            />

        </View>
    }

    const CampusInterviewTable = () => {
        return <View style={{ backgroundColor: colors.backgroundGrey, height: !isWebView && '100%' }}>
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
                    getColoumConfigs: getCampusColoumConfigs,
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
                    placeholder: "",
                    rowsLimit,
                    rowsPerPage,
                    subHeadingText,
                    tableHeading: campusTableHeading,
                    tableIcon,
                    extraDetailsText,
                    extraDetailsKey,
                    showSearchBar: false,
                    totalcards,
                }}
                containerStyle={{ flex: 1, backgroundColor: "white" }}

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
                    {intl.formatMessage({ id: "label.campus_interview_management" })}
                </CommonText>
            </View>
            <View style={styles.row}>
                <CustomTabs
                    containerStyle={!isWebView ? {} : {
                        paddingTop: 20
                    }}
                    renderHeader={() => { }}
                    renderFooter={() => { }}
                    tabs={[
                        {
                            label: "Written Test",
                            component: <WrittenTestTable />
                        },
                        {
                            label: "Campus Interview",
                            component: <CampusInterviewTable />
                        }
                    ]}
                />
            </View>
        </View>
    );
};

export default CampusInterviewManagementTemplate;
