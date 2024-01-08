import React from "react";
import PropTypes from "prop-types";
import { ScrollView, Text, View } from "@unthinkable/react-core-components";

import BadgeLabel from "../../components/BadgeLabel/BadgeLabel";
import CardComponent from "../../components/CardComponent/CardComponent";
import CommonText from "../../components/CommonText";
import DetailComponent from "../../components/DetailComponent/DetailComponent";
import UploadImage from "../../components/UploadImage/UploadImage";
import style from "./CompanyProfile.style";
import {
  companyDetail,
  companyProfile,
  contactPersonInfo,
  otherDetails,
  sourceOfInfo,
} from "./dummyData";

const CompanyProfileUI = (props) => {
  const { intl } = props;

  const renderCardWithDetails = (details, headerId, otherDetails) => (
    <CardComponent>
      <DetailComponent
        details={details}
        headerText={intl.formatMessage({ id: headerId })}
      />
      {!!otherDetails && <DetailComponent details={otherDetails} />}
    </CardComponent>
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={style.contentContainerStyle}
    >
      <View style={style.innerContainerStyle}>
        {renderCardWithDetails(companyDetail, "label.company_details")}
        {renderCardWithDetails(contactPersonInfo, "label.contact_person_info")}
        {renderCardWithDetails(
          companyProfile,
          "label.other_details",
          otherDetails
        )}
        <CardComponent>
          <DetailComponent
            headerText={intl.formatMessage({ id: "label.source_of_info" })}
          />
          <BadgeLabel
            badgeLabels={sourceOfInfo}
            customTextStyle={style.badgeContainer}
          />
        </CardComponent>
        <CardComponent>
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
        <CardComponent>
          <View style={style.textContainer}>
            <Text style={style.headingText}>
              {intl.formatMessage({ id: "label.balance_credit" })}:{" "}
            </Text>
            {/* TODO: Dummy text to be replaced by api response */}
            <CommonText customTextStyle={style.valueStyle} fontWeight="600">
              2345 INR
            </CommonText>
          </View>
        </CardComponent>
      </View>
    </ScrollView>
  );
};

CompanyProfileUI.propTypes = {
  intl: PropTypes.object.isRequired,
  onGoBack: PropTypes.func.isRequired,
};

export default CompanyProfileUI;
