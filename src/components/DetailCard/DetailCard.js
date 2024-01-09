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
  customCardStyle,
}) => {
  const intl = useIntl();

  return (
    <CardComponent customStyle={[style.cardStyle, customCardStyle]}>
      <DetailComponent
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
  isEditProfile: false,
  otherDetails: [],
};

DetailCard.propTypes = {
  details: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  headerId: PropTypes.string.isRequired,
  isEditProfile: PropTypes.bool,
  otherDetails: PropTypes.array,
};

export default DetailCard;
