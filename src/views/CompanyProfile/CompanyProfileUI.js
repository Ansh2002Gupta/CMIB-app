import React from "react";
import PropTypes from "prop-types";
import Header from "../../components/Header/Header";
import images from "../../images";
import style from "./CompanyProfile.style";
import CardCaomponent from "../../components/CardComponent/CardComponent";
import DetailComponent from "../../components/DetailComponent/DetailComponent";

const CompanyProfileUI = (props) => {
  const { intl, onGoBack } = props;
  const details = [
    { title: "Designation", value: "Senior Chartered Accountant" },
    { title: "Mobile Number", value: "+91-1234 5678 21" },
    { title: "Email ID", value: "pooja.dhar@j&k.co", isLink: true },
  ];

  return (
    <Header
      intl={intl}
      headerText={intl.formatMessage({ id: "label.company_profile" })}
      onPressLeftIcon={onGoBack}
      iconLeft={images.iconBack}
      iconRight={images.iconNotification}
    >
      <CardCaomponent>
        <DetailComponent
          details={details}
          headerText={intl.formatMessage({ id: "label.company_details" })}
        />
      </CardCaomponent>
      <CardCaomponent>
        <DetailComponent
          details={details}
          headerText={intl.formatMessage({ id: "label.source_of_info" })}
        />
      </CardCaomponent>
    </Header>
  );
};

CompanyProfileUI.propTypes = {
  intl: PropTypes.object.isRequired,
  onGoBack: PropTypes.func.isRequired,
};

export default CompanyProfileUI;
