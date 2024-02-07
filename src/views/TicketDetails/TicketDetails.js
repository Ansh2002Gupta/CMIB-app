import React from "react";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import useIsWebView from "../../hooks/useIsWebView";
import styles from "./TicketDetails.styles";
import { FourColumn, TwoColumn, TwoRow } from "../../core/layouts";
import ProfileIcon from "../../components/ProfileIcon/ProfileIcon";
import MultiRow from "../../core/layouts/MultiRow";

const TicketDetails = ({ isDisabled = false, details }) => {
  const { assigned_to, created_at, id, query_type, status } = details;
  const { isWebView } = useIsWebView();
  const role = "Admin";

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
    <View style={isDisabled ? styles.disabled : styles.container}>
      {isWebView ? (
        <TwoRow
          style={styles.webContainer}
          topSection={
            <View>
              <ProfileIcon
                name={assigned_to}
                customContainerStyle={styles.profileIcon}
              />
              <CommonText
                fontWeight={"600"}
                customTextStyle={styles.headingText}
              >
                {assigned_to}
              </CommonText>
              <CommonText customTextStyle={styles.roleText}>{role}</CommonText>
              <View style={styles.horizontalLine} />
            </View>
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
