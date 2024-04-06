import { Image, View } from "@unthinkable/react-core-components";
import React from "react";
import styles from "./styles";
import CommonText from "../../../../components/CommonText";
import useIsWebView from "../../../../hooks/useIsWebView";
import colors from "../../../../assets/colors";
import images from "../../../../images";
import Chip from "../../../../components/Chip";
import { useIntl } from "react-intl";

const JobDetailHeader = ({ actionButtons, data }) => {
  const { isWebView } = useIsWebView();
  const intl = useIntl();
  const {
    logoUrl,
    companyName,
    location,
    designation,
    chipData,
    isContractual,
    salaryText,
    experienceText,
  } = data ?? {};

  const locationText = location;

  const contractualLabel = intl.formatMessage({
    id: "label.contractual",
  });

  const contractualText = isContractual
    ? isWebView || location
      ? `( ${contractualLabel} )`
      : contractualLabel
    : null;

  const companyLogo = (
    <View style={styles.companyLogo}>
      <Image
        source={{
          uri: logoUrl,
        }}
        style={{
          ...(isWebView
            ? styles.webProfileImageStyle
            : styles.mobileProfileImageStyle),
        }}
      />
    </View>
  );

  const jobHeaderChip = () => {
    return (
      <View style={styles.headerChip}>
        {chipData.map((value) => {
          return (
            <Chip
              label={value.label}
              style={{
                backgroundColor: value.bgColor,
                color: value.textColor,
                ...styles.chip,
              }}
            />
          );
        })}
      </View>
    );
  };

  const jobHeaderTitleAndDescription = () => {
    return (
      <View>
        <View style={styles.headerTitleContainer}>
          {companyLogo}
          <View style={styles.companyInfo}>
            <CommonText customTextStyle={styles.companyName}>
              {companyName}
            </CommonText>
            <CommonText customTextStyle={styles.designation}>
              {designation}
            </CommonText>
            {isWebView && jobHeaderChip()}
            {isWebView && jobHeaderDescription()}
          </View>
        </View>
        {!isWebView && jobHeaderChip()}
        {!isWebView && jobHeaderDescription()}
      </View>
    );
  };

  const TextWithIcon = ({ icon, text }) => {
    return (
      <View style={styles.textWithIcon}>
        <Image source={icon} style={styles.headerDescriptionIcon} />
        <CommonText customTextStyle={styles.compensationText}>
          {text}
        </CommonText>
      </View>
    );
  };

  const jobHeaderDescription = () => {
    return (
      <View style={styles.headerDescription}>
        <View style={styles.descriptionContent}>
          {salaryText && (
            <>
              <TextWithIcon icon={images.iconRupeeSign} text={salaryText} />
              {(isWebView || experienceText) && (
                <CommonText customTextStyle={styles.bar}>|</CommonText>
              )}
            </>
          )}
          {experienceText && (
            <TextWithIcon icon={images.iconBreifcase} text={experienceText} />
          )}
          {isWebView && (
            <View style={styles.locationTextContainer}>
              {experienceText && (locationText || contractualText) && (
                <CommonText customTextStyle={styles.bar}>|</CommonText>
              )}
              {locationText && (
                <TextWithIcon icon={images.iconLocation} text={locationText} />
              )}
              <CommonText
                customTextStyle={{
                  ...styles.compensationText,
                  ...(locationText ? styles.contractText : {}),
                }}
              >
                {contractualText}
              </CommonText>
            </View>
          )}
        </View>
        {!isWebView && (
          <View style={styles.locationTextContainer}>
            {locationText && (
              <TextWithIcon icon={images.iconLocation} text={locationText} />
            )}
            <CommonText
              customTextStyle={{
                ...styles.compensationText,
                ...(locationText ? styles.contractText : {}),
              }}
            >
              {contractualText}
            </CommonText>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {jobHeaderTitleAndDescription()}
      {actionButtons}
    </View>
  );
};

export default JobDetailHeader;
