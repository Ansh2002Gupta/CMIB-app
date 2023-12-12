import React from "react";
import PropTypes from "prop-types";

import CardComponent from "../../components/CardComponent/CardComponent";
import DetailComponent from "../../components/DetailComponent/DetailComponent";
import IconHeader from "../../components/IconHeader/IconHeader";
import images from "../../images";

const CompanyProfileUI = (props) => {
  const { intl, onGoBack } = props;
  const details = [
    { title: "Designation", value: "Senior Chartered Accountant" },
    { title: "Mobile Number", value: "+91-1234 5678 21" },
    { title: "Email ID", value: "pooja.dhar@j&k.co", isLink: true },
  ];

  return (
    <>
      <IconHeader
        intl={intl}
        headerText={intl.formatMessage({ id: "label.company_profile" })}
        onPressLeftIcon={onGoBack}
        iconLeft={images.iconBack}
        iconRight={images.iconNotification}
      />
      <CardComponent>
        <DetailComponent
          details={details}
          headerText={intl.formatMessage({ id: "label.company_details" })}
        />
      </CardComponent>
      <CardComponent>
        <DetailComponent
          details={details}
          headerText={intl.formatMessage({ id: "label.source_of_info" })}
        />
      </CardComponent>
    </>
  );
};

CompanyProfileUI.propTypes = {
  intl: PropTypes.object.isRequired,
  onGoBack: PropTypes.func.isRequired,
};

export default CompanyProfileUI;
