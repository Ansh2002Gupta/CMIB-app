import React from "react";
import styles from "../styles";
import CommonText from "../../../components/CommonText";
import commonStyles from "../../../theme/styles/commonStyles";

const keys = {
  noOfPosition: "noOfPosition",
  compensation: "compensation",
  startingSalaryIncludingPerks: "startingSalaryIncludingPerks",
  roleAndResponsibility: "roleAndResponsibility",
  detailsOfCTC: "detailsOfCTC",
  bondRequired: "bondRequired",
  monthsBondPeriod: "monthsBondPeriod",
  exitAmount: "exitAmount",
};

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
    },
    {},
    {},
  ],
  [
    {
      key: keys.detailsOfCTC,
      isMandatory: true,
      label: "label.details_of_ctc",
      placeholder: "label.details_of_ctc",
    },
    {},
    {},
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
      key: keys.compensation,
      isMandatory: true,
      label: "label.months_bond_period",
      placeholder: "label.months_bond_period",
    },
    {
      key: keys.startingSalaryIncludingPerks,
      isMandatory: true,
      label: "label.exit_amount",
      placeholder: "label.exit_amount",
    },
  ],
];

const usePositionInformation = () => {
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
            {item?.documentName}
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
            {item?.documentType}
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
            {item?.numberOfCopies}
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
            {item?.value ?? "----"}
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

  return {
    postionDetail: positionInfoDetails(),
    bondDetail: bondDetail(),
    getColoumConfigs: getColoumConfigs,
    getRequiredDocumentsColumnConfigs,
    getPostingAndCategoriesColumnConfigs,
  };
};

export default usePositionInformation;
