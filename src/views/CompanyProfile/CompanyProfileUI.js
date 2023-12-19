import React from "react";
import PropTypes from "prop-types";
import { ScrollView, Text, View } from "@unthinkable/react-core-components";

import BadgeLabel from "../../components/BadgeLabel/BadgeLabel";
import CardComponent from "../../components/CardComponent/CardComponent";
import DetailComponent from "../../components/DetailComponent/DetailComponent";
import IconHeader from "../../components/IconHeader/IconHeader";
import UploadImage from "../../components/UploadImage/UploadImage";
import images from "../../images";
import style from "./CompanyProfile.style";

const CompanyProfileUI = (props) => {
  const { intl, onGoBack } = props;
  //TODO: Dummy data to be replace by api response.
  const companyDetail = [
    { title: "Company Name", value: "Appdynamics" },
    { title: "Entity", value: "Firm of Chartered accountants" },
    {
      title: "Firm Registration No.[FRN]",
      value: "NRO0123456",
    },
    {
      title: "Partners(No.)",
      value: 3,
      isRow: true,
    },
    {
      title: "Current Industry",
      value: "APM",
      isRow: true,
    },
    {
      title: "Address of Correspondence",
      value: "Plot number SCO-90, near Udhyog Vihar Phase 4, Sector 22A",
    },
    {
      title: "Email ID",
      value: "a@appdynamics.co",
    },
    {
      title: "ISD/STD Code",
      value: "+91",
      isRow: true,
    },
    {
      title: "Telephone Number",
      value: "1234 5678 21",
      isRow: true,
    },
  ];

  const contactPersonInfo = [
    { title: "Salutation", value: "Mr", isRow: true },
    {
      title: "Contact Person Name",
      value: "Pooja Dhar",

      isRow: true,
    },
    {
      title: "Contact Person Designation",
      value: "Senior Chartered Accountant",
    },
    {
      title: "Mobile Number",
      value: "+91-1234 5678 21",
    },
    {
      title: "Email ID",
      value: "Pooja.dhar@j&k.co",
    },
  ];

  const companyProfile = [
    { title: "Short Profile of the Company", value: "Short Profile" },
  ];

  const otherDetails = [
    { title: "Website", value: "www.appdynamics.in", isLink: true },
    {
      title: "Nature of Supplier",
      value: "Registered",
    },
    {
      title: "Company Type",
      value: "Nil Rated",
    },
  ];

  const sourceOfInfo = [
    "Campus",
    "Based on Previous Participation",
    "Telephonic Call",
  ];

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
    <>
      <IconHeader
        intl={intl}
        headerText={intl.formatMessage({ id: "label.company_profile" })}
        onPressLeftIcon={onGoBack}
        iconLeft={images.iconBack}
        iconRight={images.iconNotification}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={style.contentContainerStyle}
      >
        <View style={style.innerContainerStyle}>
          {renderCardWithDetails(companyDetail, "label.company_details")}
          {renderCardWithDetails(
            contactPersonInfo,
            "label.contact_person_info"
          )}
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
              <Text style={style.valueStyle}>2345 INR</Text>
            </View>
          </CardComponent>
        </View>
      </ScrollView>
    </>
  );
};

CompanyProfileUI.propTypes = {
  intl: PropTypes.object.isRequired,
  onGoBack: PropTypes.func.isRequired,
};

export default CompanyProfileUI;
