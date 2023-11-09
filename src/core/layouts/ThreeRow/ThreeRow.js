import React from 'react';
import BaseLayout from '../Base';
import layoutStyle from './threeRow.style';

function ThreeRow({
  style,
  topSectionStyle,
  middleSectionStyle,
  bottomSectionStyle,
  topSection,
  middleSection,
  bottomSection,
}) {
  return (
    <BaseLayout style={{...layoutStyle, ...style}}>
      {({Row}) => (
        <>
          <Row style={topSectionStyle}>{topSection}</Row>
          <Row style={middleSectionStyle}>{middleSection}</Row>
          <Row style={bottomSectionStyle}>{bottomSection}</Row>
        </>
      )}
    </BaseLayout>
  );
}

ThreeRow.defaultProps = {
  style: {},
  topSectionStyle: {},
  middleSectionStyle: {},
  bottomSectionStyle: {},
};

export default ThreeRow;
