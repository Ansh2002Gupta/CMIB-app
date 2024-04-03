import React, { useEffect } from "react";
import styles from "../JobApplicantsView.style";
import CommonText from "../../../components/CommonText";
import { View } from "@unthinkable/react-core-components";
import commonStyles from "../../../theme/styles/commonStyles";
import CustomTouchableOpacity from "../../../components/CustomTouchableOpacity";
import TouchableImage from "../../../components/TouchableImage";
import images from "../../../images";
import Chip from "../../../components/Chip";
import { JOB_APPLICANTS } from "../../../services/apiServices/apiEndPoint";
import useFetch from "../../../hooks/useFetch";
import useIsWebView from "../../../hooks/useIsWebView";

const useJobApplicants = () => {
  let isHeading = true;
  let headingTexts = ["application_id"];
  let subHeadingText = ["status"];
  let statusText = ["active_inactive"];
  let tableIcon = images.iconMore;
  const { isWebView } = useIsWebView();

  //We'll uncomment this code when API is available

  // const { data, isLoading, fetchData } = useFetch({
  //   url: JOB_APPLICANTS,
  //   otherOptions: {
  //     skipApiCallOnMount: true,
  //   },
  // });

  // console.log("data", data);

  // useEffect(() => {
  //   fetchData({});
  // }, []);

  function getStatusStyle(status) {
    status = status.toLowerCase();
    switch (status) {
      case "inactive":
        return {
          ...(!isWebView ? styles.inactive : styles.inactiveWeb),
          ...styles.cellTextStyle(12),
        };
      case "active":
        return {
          ...(!isWebView ? styles.active : styles.activeWeb),
          ...styles.cellTextStyle(12),
        };
      default:
        return styles.cellTextStyle(12);
    }
  }

  const onIconPress = () => {};

  const getColoumConfigs = (item, isHeading) => {
    const tableStyle = isHeading
      ? commonStyles.customTableHeading
      : styles.cellTextStyle(14);
    return [
      {
        content: (
          <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
            {item.name}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item.application_id}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: (
          <View style={styles.inactiveActiveStyle}>
            {isHeading ? (
              <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
                {item.active_inactive}
              </CommonText>
            ) : (
              <Chip
                label={item?.active_inactive}
                style={getStatusStyle(item.active_inactive)}
              />
            )}
          </View>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText
            customTextStyle={{
              ...tableStyle,
              ...(!isHeading ? styles.underLineText : {}),
            }}
          >
            {item?.job_id}
          </CommonText>
        ),
        style: commonStyles.columnStyle("20%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText
            customTextStyle={{
              ...tableStyle,
              ...(!isHeading ? styles.underLineText : {}),
            }}
          >
            {item?.designation}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>{item?.status}</CommonText>
        ),
        style: commonStyles.columnStyle("10%"),
        isFillSpace: true,
      },
      {
        content: !isHeading && (
          <TouchableImage
            onPress={() => {
              onIconPress(item);
            }}
            source={images.iconMore}
            imageStyle={styles.iconTicket}
            isSvg={true}
          />
        ),
        style: {
          ...commonStyles.columnStyle("5%"),
          ...styles.iconTicketColoum,
        },
        isFillSpace: true,
      },
    ];
  };
  return {
    getColoumConfigs,
    isHeading,
    headingTexts,
    subHeadingText,
    statusText,
    tableIcon,
    getStatusStyle,
  };
};

export default useJobApplicants;
