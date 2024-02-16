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
import styles from "./TicketDetails.style";

const TicketDetails = ({ details }) => {
  const intl = useIntl();
  const { isWebView } = useIsWebView();

  const getTopSectionData = (assignedTo) => {
    const isAssigned = !!assignedTo || false;
    const profileIconImage = isAssigned
      ? assignedTo?.profile_photo
      : images.iconAvatar;
    const textFontWeight = isAssigned ? "600" : "500";
    const headingText = isAssigned
      ? assignedTo?.name
      : intl.formatMessage({ id: "label.admin_not_assigned" });
    const roleText = isAssigned ? assignedTo?.type : "";

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
            detailHeading: intl.formatMessage({ id: "label.ticket_number" }),
            subDetailHeading: details?.readable_id,
          })}
          isLeftFillSpace
          isRightFillSpace
          rightSection={renderDetails({
            detailHeading: intl.formatMessage({ id: "label.status" }),
            subDetailHeading: details?.status,
          })}
        />
      ),
    },
    {
      content: renderDetails({
        detailHeading: intl.formatMessage({ id: "label.query_type" }),
        subDetailHeading: details?.query_type,
      }),
    },
    {
      content: renderDetails({
        detailHeading: intl.formatMessage({ id: "label.created_on" }),
        subDetailHeading: formatDate(details?.created_at),
      }),
    },
    {
      content: renderDetails({
        detailHeading: intl.formatMessage({ id: "label.assigned_to" }),
        subDetailHeading: details?.assigned_to?.name || "-",
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
                    // name={!!details?.assigned_to && details?.assigned_to?.name}
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
                detailHeading: intl.formatMessage({ id: "label.query_type" }),
                subDetailHeading: details?.query_type,
              })}
              bottomSection={renderDetails({
                detailHeading: intl.formatMessage({ id: "label.created_on" }),
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
