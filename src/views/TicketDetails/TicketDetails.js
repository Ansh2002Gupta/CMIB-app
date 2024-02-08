import React from "react";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import useIsWebView from "../../hooks/useIsWebView";
import styles from "./TicketDetails.styles";
import { TwoColumn, TwoRow } from "../../core/layouts";
import ProfileIcon from "../../components/ProfileIcon/ProfileIcon";
import MultiRow from "../../core/layouts/MultiRow";
import images from "../../images";

const TicketDetails = ({ details }) => {
  const { assigned_to, created_at, id, query_type, status } = details;
  const { isWebView } = useIsWebView();
  const role = "Admin";

  const getTopSectionData = (assignedTo) => {
    const isAssigned = !!assignedTo;
    const profileIconImage = isAssigned ? undefined : images.iconAvatar;
    const textFontWeight = isAssigned ? "600" : "500";
    const headingText = isAssigned ? assignedTo : "Admin Not Assigned";
    const roleText = isAssigned ? role : "";

    return {
      profileIconImage,
      textFontWeight,
      headingText,
      roleText,
    };
  };

  const topSectionData = getTopSectionData(assigned_to);

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
            subDetailHeading: id,
          })}
          isLeftFillSpace
          isRightFillSpace
          rightSection={renderDetails({
            detailHeading: "Status",
            subDetailHeading: status,
          })}
        />
      ),
    },
    {
      content: renderDetails({
        detailHeading: "Query Type",
        subDetailHeading: query_type,
      }),
    },
    {
      content: renderDetails({
        detailHeading: "Data Created On",
        subDetailHeading: created_at,
      }),
    },
    {
      content: renderDetails({
        detailHeading: "Assigned To",
        subDetailHeading: assigned_to,
      }),
    },
  ];

  return (
    <View style={styles.container}>
      {isWebView ? (
        <TwoRow
          style={styles.webContainer}
          topSectionStyle={!assigned_to ? styles.disabled : {}}
          topSection={
            <TwoRow
              style={styles.webContainer}
              topSectionStyle={!assigned_to ? styles.disabled : {}}
              topSection={
                <View>
                  <ProfileIcon
                    name={assigned_to}
                    profileImage={topSectionData.profileIconImage}
                    customContainerStyle={styles.profileIcon}
                  />
                  <CommonText
                    fontWeight={topSectionData.textFontWeight}
                    customTextStyle={styles.headingText}
                  >
                    {topSectionData.headingText}
                  </CommonText>
                  {assigned_to && (
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
                subDetailHeading: query_type,
              })}
              bottomSection={renderDetails({
                detailHeading: "Created On",
                subDetailHeading: created_at,
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
