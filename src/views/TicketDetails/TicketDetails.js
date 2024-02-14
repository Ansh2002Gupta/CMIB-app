import React from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import MultiRow from "../../core/layouts/MultiRow";
import { TwoColumn, TwoRow } from "../../core/layouts";

import CommonText from "../../components/CommonText";
import ProfileIcon from "../../components/ProfileIcon/ProfileIcon";
import useIsWebView from "../../hooks/useIsWebView";
import { formatDate } from "../../utils/util";
import images from "../../images";
import styles from "./TicketDetails.styles";

const TicketDetails = ({ details }) => {
  const intl = useIntl();
  const { isWebView } = useIsWebView();
  const role = "Admin";

  const getTopSectionData = (assignedTo) => {
    const isAssigned = !!assignedTo || false;
    const profileIconImage = isAssigned ? undefined : images.iconAvatar;
    const textFontWeight = isAssigned ? "600" : "500";
    const headingText = isAssigned
      ? assignedTo
      : intl.formatMessage({ id: "label.admin_not_assigned" });
    const roleText = isAssigned ? role : "";

    return {
      profileIconImage,
      textFontWeight,
      headingText,
      roleText,
    };
  };

  const topSectionData = getTopSectionData(details?.assigned_to);

  const renderDetails = ({ detailHeading, subDetailHeading }) => {
    return (
      <View style={styles.detailsSection}>
        <CommonText customTextStyle={styles.detailHeading}>
          {detailHeading}
        </CommonText>
        <CommonText customTextStyle={styles.subDetailHeading}>
          {subDetailHeading}
        </CommonText>
      </View>
    );
  };

  const rowConfigs = [
    {
      content: (
        <TwoColumn
          leftSection={renderDetails({
            detailHeading: "Ticket Number",
            subDetailHeading: details?.readable_id,
          })}
          isLeftFillSpace
          isRightFillSpace
          rightSection={renderDetails({
            detailHeading: "Status",
            subDetailHeading: details?.status,
          })}
        />
      ),
    },
    {
      content: renderDetails({
        detailHeading: "Query Type",
        subDetailHeading: details?.query_type,
      }),
    },
    {
      content: renderDetails({
        detailHeading: "Data Created On",
        subDetailHeading: formatDate(details?.created_at),
      }),
    },
    {
      content: renderDetails({
        detailHeading: "Assigned To",
        subDetailHeading: details?.assigned_to || "-",
      }),
    },
  ];

  return (
    <View style={styles.container}>
      {isWebView ? (
        <TwoRow
          style={styles.webContainer}
          topSectionStyle={!details?.assigned_to ? styles.disabled : {}}
          topSection={
            <TwoRow
              style={styles.webContainer}
              topSectionStyle={!details?.assigned_to ? styles.disabled : {}}
              topSection={
                <View>
                  <ProfileIcon
                    name={details?.assigned_to}
                    profileImage={topSectionData.profileIconImage}
                    customContainerStyle={styles.profileIcon}
                  />
                  <CommonText
                    fontWeight={topSectionData.textFontWeight}
                    customTextStyle={styles.headingText}
                  >
                    {topSectionData.headingText}
                  </CommonText>
                  {details?.assigned_to && (
                    <CommonText customTextStyle={styles.roleText}>
                      {topSectionData.roleText}
                    </CommonText>
                  )}
                  <View style={styles.horizontalLine} />
                </View>
              }
            />
          }
          bottomSection={
            <TwoRow
              topSection={renderDetails({
                detailHeading: "Query Type",
                subDetailHeading: details?.query_type,
              })}
              bottomSection={renderDetails({
                detailHeading: "Created On",
                subDetailHeading: formatDate(details?.created_at),
              })}
            />
          }
        />
      ) : (
        <View style={styles.mobileContainer}>
          <View style={styles.ticketDetailsCard}>
            <MultiRow rows={rowConfigs} />
          </View>
        </View>
      )}
    </View>
  );
};

export default TicketDetails;
