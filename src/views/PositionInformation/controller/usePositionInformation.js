import React, { useContext, useEffect, useState } from "react";
import styles from "../styles";
import CommonText from "../../../components/CommonText";
import commonStyles from "../../../theme/styles/commonStyles";
import useFetch from "../../../hooks/useFetch";
import { SideBarContext } from "../../../globalContext/sidebar/sidebarProvider";
import {
  dummy,
  formatBondDetail,
  formatMonthlyData,
  formatPositionDetail,
  formatPostinAndVaccanyData,
  formatYearlyData,
  keys,
} from "./utils";
import { useIntl } from "react-intl";
import { addValueOnField } from "./utils";

const positionInfoDetails = (intl) => [
  [
    {
      key: keys.noOfPosition,
      isMandatory: true,
      label: "label.noOfPositionsOrVacancy",
      placeholder: "label.noOfPositionsOrVacancy",
    },
    {
      key: keys.compensation,
      isMandatory: true,
      label: "label.compensation",
      placeholder: "label.compensation",
    },
    {
      key: keys.startingSalaryIncludingPerks,
      isMandatory: true,
      label: "label.starting_salary_including_perks",
      placeholder: "label.starting_salary_including_perks",
    },
  ],
  [
    {
      key: keys.roleAndResponsibility,
      isMandatory: true,
      label: "label.roles_and_responsibility",
      placeholder: "label.roles_and_responsibility",
      isHtmlDescription: true,
    },
    { isEmptyField: true },
    { isEmptyField: true },
  ],
  [
    {
      key: keys.detailsOfCTC,
      isMandatory: true,
      label: "label.details_of_ctc",
      placeholder: "label.details_of_ctc",
    },
    { isEmptyField: true },
    { isEmptyField: true },
  ],
];

const bondDetail = () => [
  [
    {
      key: keys.bondRequired,
      isMandatory: true,
      label: "label.bond_required",
      placeholder: "label.bond_required",
    },
    {
      key: keys.monthsBondPeriod,
      isMandatory: true,
      label: "label.months_bond_period",
      placeholder: "label.months_bond_period",
    },
    {
      key: keys.exitAmount,
      isMandatory: true,
      label: "label.exit_amount",
      placeholder: "label.exit_amount",
    },
  ],
];

const usePositionInformation = ({ centerId, companyId }) => {
  const intl = useIntl();
  const [sideBarState] = useContext(SideBarContext);
  const { selectedModule } = sideBarState;
  const [positionTabs, setPositionTabs] = useState([]);
  const { data, isLoading, error } = useFetch({
    url: `member/${selectedModule.key}/centres/${centerId}/companies/${companyId}/positions`,
  });

  const getPostingAndCategoriesColumnConfigs = (item, isHeading) => {
    const tableStyle = isHeading
      ? styles.tableHeadingText
      : styles.cellTextStyle();

    const tableContainerStyle = isHeading ? styles.tableHeadingContainer : {};

    return [
      {
        content: (
          <CommonText
            customTextStyle={tableStyle}
            customContainerStyle={tableContainerStyle}
          >
            {item?.placeOfPosting ?? "-"}
          </CommonText>
        ),
        style: { ...commonStyles.columnStyle("15%"), ...tableContainerStyle },
        isFillSpace: true,
      },
      {
        content: (
          <CommonText
            customTextStyle={tableStyle}
            customContainerStyle={tableContainerStyle}
          >
            {item?.general ?? "-"}
          </CommonText>
        ),
        style: { ...commonStyles.columnStyle("8%"), ...tableContainerStyle },
        isFillSpace: true,
      },
      {
        content: (
          <CommonText
            customTextStyle={tableStyle}
            customContainerStyle={tableContainerStyle}
          >
            {item?.obc ?? "-"}
          </CommonText>
        ),
        style: { ...commonStyles.columnStyle("8%"), ...tableContainerStyle },
        isFillSpace: true,
      },
      {
        content: (
          <CommonText
            customTextStyle={tableStyle}
            customContainerStyle={tableContainerStyle}
          >
            {item?.sc ?? "-"}
          </CommonText>
        ),
        style: { ...commonStyles.columnStyle("8%"), ...tableContainerStyle },
        isFillSpace: true,
      },
      {
        content: (
          <CommonText
            customTextStyle={tableStyle}
            customContainerStyle={tableContainerStyle}
          >
            {item?.st ?? "-"}
          </CommonText>
        ),
        style: { ...commonStyles.columnStyle("8%"), ...tableContainerStyle },
        isFillSpace: true,
      },
      {
        content: (
          <CommonText
            customTextStyle={tableStyle}
            customContainerStyle={tableContainerStyle}
          >
            {item?.ph ?? "-"}
          </CommonText>
        ),
        style: { ...commonStyles.columnStyle("8%"), ...tableContainerStyle },
        isFillSpace: true,
      },
      {
        content: (
          <CommonText
            customTextStyle={tableStyle}
            customContainerStyle={tableContainerStyle}
          >
            {item?.others ?? "-"}
          </CommonText>
        ),
        style: { ...commonStyles.columnStyle("8%"), ...tableContainerStyle },
        isFillSpace: true,
      },
      {
        content: (
          <CommonText
            customTextStyle={tableStyle}
            customContainerStyle={tableContainerStyle}
          >
            {item?.total ?? "-"}
          </CommonText>
        ),
        style: { ...commonStyles.columnStyle("8%"), ...tableContainerStyle },
        isFillSpace: true,
      },
    ];
  };

  const getRequiredDocumentsColumnConfigs = (item, isHeading) => {
    const tableStyle = isHeading
      ? styles.tableHeadingText
      : styles.cellTextStyle();

    const tableContainerStyle = isHeading ? styles.tableHeadingContainer : {};

    return [
      {
        content: (
          <CommonText
            customTextStyle={tableStyle}
            customContainerStyle={tableContainerStyle}
          >
            {item?.doc_name}
          </CommonText>
        ),
        style: { ...commonStyles.columnStyle("15%"), ...tableContainerStyle },
        isFillSpace: true,
      },
      {
        content: (
          <CommonText
            customTextStyle={tableStyle}
            customContainerStyle={tableContainerStyle}
          >
            {item?.doc_type}
          </CommonText>
        ),
        style: { ...commonStyles.columnStyle("15%"), ...tableContainerStyle },
        isFillSpace: true,
      },
      {
        content: (
          <CommonText
            customTextStyle={tableStyle}
            customContainerStyle={tableContainerStyle}
          >
            {item?.no_of_photocopies}
          </CommonText>
        ),
        style: { ...commonStyles.columnStyle("15%"), ...tableContainerStyle },
        isFillSpace: true,
      },
    ];
  };

  const getColoumConfigs = (item, isHeading) => {
    const tableStyle = isHeading
      ? styles.tableHeadingText
      : styles.cellTextStyle();

    const { highlight: isHighlighted } = item;

    const tableContainerStyle = isHighlighted && styles.highlightCell;

    return [
      {
        content: (
          <CommonText
            fontWeight={isHighlighted && "600"}
            customTextStyle={tableStyle}
            customContainerStyle={tableContainerStyle}
          >
            {item?.label ?? "----"}
          </CommonText>
        ),
        style: {
          ...commonStyles.columnStyle("15%"),
          ...tableContainerStyle,
        },
        isFillSpace: true,
      },
      {
        content: (
          <CommonText
            fontWeight={"600"}
            customContainerStyle={tableContainerStyle}
            customTextStyle={tableStyle}
          >
            {item?.amount ?? "----"}
          </CommonText>
        ),
        style: {
          ...commonStyles.columnStyle("20%"),
          ...tableContainerStyle,
        },
        isFillSpace: true,
      },
    ];
  };

  const getTabData = () => {
    if (data) {
      setPositionTabs(
        data?.map((item) => {
          return {
            designation: item?.designation,
            compensation: item?.compensation,
            starting_salary: item?.starting_salary,
            role_responsibility: item?.role_responsibility,
            monthlyData: formatMonthlyData(item.monthly, intl),
            yearlyData: formatYearlyData(item.yearly, intl),
            requiredDocuments: item.required_docs,
            postingAndVaccancyData: formatPostinAndVaccanyData(
              item.posting_details[0]
            ),
            selectionProcess: item?.selection_process,
            postionDetail: addValueOnField({
              state: formatPositionDetail(item),
              details: positionInfoDetails(),
            }),
            bondDetail: addValueOnField({
              state: formatBondDetail(item?.bond_details),
              details: bondDetail(),
            }),
          };
        })
      );
    }
  };

  useEffect(() => {
    getTabData();
  }, []);

  return {
    positionTabs,
    getColoumConfigs: getColoumConfigs,
    getRequiredDocumentsColumnConfigs,
    getPostingAndCategoriesColumnConfigs,
    isLoading,
    error: error?.data,
  };
};

export default usePositionInformation;
