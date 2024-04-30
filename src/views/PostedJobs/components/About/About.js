import React from "react";

import DetailCard from "../../../../components/DetailCard";

const About = ({ details = [], style = {} }) => {
  return (
    <DetailCard
      details={details}
      headerId={"About Servicenow"} //TODO: need to check company name, added comment in figma
      customCardStyle={{ ...style }}
      isColumnVariableWidth
    />
  );
};

export default About;
