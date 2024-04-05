import React from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../../../components/CommonText";
import commonStyles from "../../../theme/styles/commonStyles";
import images from "../../../images";
import styles from "../SavedCandidatesView.styles";

const useSavedCandidates = () => {
  const intl = useIntl();
  const getStatusStyle = () => {};
  const headingTexts = ["candidate_name"];
  const subHeadingText = ["candidate_id", "total_experience"];
  const tableIcon = images.iconMore;
  const formatConfig = {
    total_experience: {
      prefix: `${intl.formatMessage({ id: "label.experience" })}${" : "}`,
      suffix: `${" "}${intl.formatMessage({ id: "label.years" })}`,
    },
  };

  const getColoumConfigs = (item, isHeading) => {
    const tableStyle = isHeading
      ? commonStyles.customTableHeading
      : commonStyles.cellTextStyle(14);
    console.log("getColoumConfigs", item?.funtional_area);

    return [
      {
        content: (
          <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
            {item.candidate_name}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item.candidate_id}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item.total_experience} {intl.formatMessage({ id: "label.years" })}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: (
          <View style={styles.flexRow}>
            {item.funtional_area.map((functionalAreaItem, index) => {
              const remainingNoOfItems = item.funtional_area.length - 2;

              if (isHeading || index < 2) {
                return (
                  <CommonText
                    key={index}
                    customContainerStyle={!isHeading ? styles.arrayStyle : {}}
                    customTextStyle={{ ...tableStyle, ...styles.chipText }}
                  >
                    {functionalAreaItem}
                  </CommonText>
                );
              } else if (index === 2) {
                return (
                  <CommonText
                    key={index}
                    customContainerStyle={!isHeading ? styles.arrayStyle : {}}
                    customTextStyle={tableStyle}
                  >
                    {`+${remainingNoOfItems}`}
                  </CommonText>
                );
              } else {
                return null;
              }
            })}
          </View>
        ),
        style: commonStyles.columnStyle("20%"),
        isFillSpace: true,
      },
      {
        content: (
          <View style={styles.flexRow}>
            {item.designation_applied_for.map((functionalAreaItem, index) => {
              const remainingNoOfItems =
                item.designation_applied_for.length - 2;

              if (isHeading || index < 2) {
                return (
                  <CommonText
                    key={index}
                    customContainerStyle={!isHeading ? styles.arrayStyle : {}}
                    customTextStyle={{ ...tableStyle, ...styles.chipText }}
                  >
                    {functionalAreaItem}
                  </CommonText>
                );
              } else if (index === 2) {
                return (
                  <CommonText
                    key={index}
                    customContainerStyle={!isHeading ? styles.arrayStyle : {}}
                    customTextStyle={tableStyle}
                  >
                    {`+${remainingNoOfItems}`}
                  </CommonText>
                );
              } else {
                return null;
              }
            })}
          </View>
        ),
        style: commonStyles.columnStyle("20%"),
        isFillSpace: true,
      },
    ];
  };
  return {
    data,
    formatConfig,
    getColoumConfigs,
    getStatusStyle,
    headingTexts,
    subHeadingText,
    statusText: [],
    tableIcon,
  };
};

export default useSavedCandidates;

const data = {
  meta: {
    total: 28,
    perPage: 10,
    currentPage: 1,
    lastPage: 3,
    from: 1,
    to: 10,
  },
  records: [
    {
      id: 198,
      candidate_id: "T0000198",
      candidate_name: "NQCA Placement",
      total_experience: "4",
      funtional_area: ["Area", "Audit", "Designation", "CA"],
      designation_applied_for: ["Designation", "CA"],
    },
    {
      id: 197,
      candidate_id: "T0000197",
      candidate_name: "Women Placement",
      total_experience: "6",
      funtional_area: [
        "Area",
        "Auaksfjnkasjksadkfsjdkfkjadsnfkdit",
        "Audit",
        "Designation",
        "CA",
        "Audit",
        "Designation",
        "CA",
      ],
      designation_applied_for: ["Designation"],
    },
    {
      id: 196,
      candidate_id: "T0000196",
      candidate_name: "NQCA Placement",
      total_experience: "6",
      funtional_area: ["Area", "Audit", "Audit", "Designation", "CA"],
      designation_applied_for: ["Designation"],
    },
    {
      id: 195,
      candidate_id: "T0000195",
      candidate_name: "NQCA Placement",
      total_experience: "6",
      funtional_area: ["Area", "Audit"],
      designation_applied_for: ["Designation"],
    },
    {
      id: 194,
      candidate_id: "T0000193",
      candidate_name: "NQCA Placement",
      total_experience: "4",
      funtional_area: ["Area", "Audit"],
      designation_applied_for: [
        "Designation",
        "Designation",
        "Designation",
        "Designation",
      ],
    },
    {
      id: 193,
      candidate_id: "T0000193",
      candidate_name: "NQCA Placement",
      total_experience: "6",
      funtional_area: ["Area", "Audit"],
      designation_applied_for: ["Designation"],
    },
    {
      id: 192,
      candidate_id: "T0000192",
      candidate_name: "Career Ascent",
      total_experience: "4",
      funtional_area: ["Area", "Audit"],
      designation_applied_for: ["Designation"],
    },
  ],
};
