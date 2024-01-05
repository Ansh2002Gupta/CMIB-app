import React from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";

import CardComponent from "../../components/CardComponent/CardComponent";
import DetailComponent from "../../components/DetailComponent/DetailComponent";

import style from "./DetailCard.style";
const DetailCard = ({
  details,
  handleChange,
  headerId,
  isEditProfile,
  otherDetails,
}) => {
  const intl = useIntl();

  return (
    <CardComponent customStyle={style.cardStyle}>
      <DetailComponent
        customContainerStyle={style.customStyle}
        details={details}
        headerText={intl.formatMessage({ id: headerId })}
        isEditable={isEditProfile}
        handleChange={handleChange}
      />
      {!!otherDetails && (
        <DetailComponent
          details={otherDetails}
          isEditable={isEditProfile}
          handleChange={handleChange}
        />
      )}
    </CardComponent>
  );
};

DetailCard.defaultProps = {
  details: [],
  handleChange: () => {},
  headerId: "",
  isEditProfile: false,
  otherDetails: [],
};

DetailCard.propTypes = {
  details: PropTypes.array,
  handleChange: PropTypes.func,
  headerId: PropTypes.string,
  isEditProfile: PropTypes.bool,
  otherDetails: PropTypes.array,
};

export default DetailCard;
