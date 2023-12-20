import React from "react";
import PropTypes from "prop-types";

import BaseLayout from "../Base";

function FiveColumn({
  firstSection,
  firstSectionStyle,
  fourthSection,
  fiveSection,
  fourthSectionStyle,
  fiveSectionStyle,
  isLeftFillSpace,
  isRightFillSpace,
  style,
  secoundSection,
  secoundSectionStyle,
  thirdSection,
  thirdSectionStyle,
}) {
  return (
    <BaseLayout>
      {({ Column }) => (
        <>
          <Column isFillSpace={isLeftFillSpace} style={firstSectionStyle}>
            {firstSection}
          </Column>
          <Column isFillSpace={isRightFillSpace} style={secoundSectionStyle}>
            {secoundSection}
          </Column>
          <Column isFillSpace={isRightFillSpace} style={thirdSectionStyle}>
            {thirdSection}
          </Column>
          <Column isFillSpace={isRightFillSpace} style={fourthSectionStyle}>
            {fourthSection}
          </Column>
          <Column isFillSpace={isRightFillSpace} style={fiveSectionStyle}>
            {fiveSection}
          </Column>
        </>
      )}
    </BaseLayout>
  );
}

FiveColumn.defaultProps = {
  firstSectionStyle: {},
  fourthSectionStyle: {},
  fiveSectionStyle: {},
  isLeftFillSpace: false,
  isRightFillSpace: false,
  style: {},
  secoundSectionStyle: {},
  thirdSectionStyle: {},
};

FiveColumn.propTypes = {
  firstSectionStyle: PropTypes.object,
  fiveSectionStyle: PropTypes.object,
  firstSection: PropTypes.node,
  fiveSection: PropTypes.node,
  fourthSection: PropTypes.node,
  fourthSectionStyle: PropTypes.object,
  isLeftFillSpace: PropTypes.bool,
  isRightFillSpace: PropTypes.bool,
  style: PropTypes.object,
  secoundSectionStyle: PropTypes.object,
  secoundSection: PropTypes.node,
  thirdSectionStyle: PropTypes.object,
  thirdSection: PropTypes.node,
};

export default FiveColumn;
