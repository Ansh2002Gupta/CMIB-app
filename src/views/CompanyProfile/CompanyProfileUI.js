import React from "react";
import PropTypes from "prop-types";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
} from "@unthinkable/react-core-components";

import BadgeLabel from "../../components/BadgeLabel/BadgeLabel";
import CardComponent from "../../components/CardComponent/CardComponent";
import DetailComponent from "../../components/DetailComponent/DetailComponent";
import IconHeader from "../../components/IconHeader/IconHeader";
import UploadImage from "../../components/UploadImage/UploadImage";
import images from "../../images";
import style from "./CompanyProfile.style";
import { sourceOfInfo, mapApiDataToUI } from "./mappedData";

const CompanyProfileUI = (props) => {
  const { intl, isLoading, onGoBack, profileResult } = props;
  const mappedData = mapApiDataToUI(profileResult);

  const renderCardWithDetails = (details, headerId, otherDetails) => (
    <CardComponent customStyle={style.cardStyle}>
      <DetailComponent
        details={details}
        headerText={intl.formatMessage({ id: headerId })}
      />
      {!!otherDetails && <DetailComponent details={otherDetails} />}
    </CardComponent>
  );

  return (
    <>
      <IconHeader
        intl={intl}
        headerText={intl.formatMessage({ id: "label.company_profile" })}
        onPressLeftIcon={onGoBack}
        iconLeft={images.iconBack}
        iconRight={images.iconNotification}
      />
      {isLoading ? (
        <View style={style.loaderStyle}>
          <ActivityIndicator />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={style.contentContainerStyle}
        >
          <View style={style.innerContainerStyle}>
            {renderCardWithDetails(
              mappedData.companyDetail,
              "label.company_details"
            )}
            {renderCardWithDetails(
              mappedData.contactPersonInfo,
              "label.contact_person_info"
            )}
            {renderCardWithDetails(
              mappedData.companyProfile,
              "label.other_details",
              mappedData.otherDetails
            )}
            <CardComponent customStyle={style.cardStyle}>
              <DetailComponent
                headerText={intl.formatMessage({ id: "label.source_of_info" })}
              />
              <BadgeLabel
                badgeLabels={sourceOfInfo}
                customTextStyle={style.badgeContainer}
              />
            </CardComponent>
            <CardComponent customStyle={style.cardStyle}>
              <DetailComponent
                headerText={intl.formatMessage({ id: "label.company_logo" })}
              />
              {/* TODO: Dummy Image to be replaced by api response */}
              <UploadImage
                imageUrl={
                  "https://codeskulptor-demos.commondatastorage.googleapis.com/pang/FDqGDmc.png"
                }
                imageName={"CompanyLogo.png"}
                intl={intl}
              />
            </CardComponent>
            <CardComponent customStyle={style.cardStyle}>
              <View style={style.textContainer}>
                <Text style={style.headingText}>
                  {intl.formatMessage({ id: "label.balance_credit" })}:{" "}
                </Text>
                {/* TODO: Dummy text to be replaced by api response */}
                <Text style={style.valueStyle}>2345 INR</Text>
              </View>
            </CardComponent>
          </View>
        </ScrollView>
      )}
    </>
  );
};

CompanyProfileUI.propTypes = {
  intl: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onGoBack: PropTypes.func.isRequired,
  profileResult: PropTypes.object,
};

export default CompanyProfileUI;
