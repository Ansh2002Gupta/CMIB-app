import React from 'react'
import BaseLayout from '../Base'
import layoutStyle from './twoColumn.style'

function TwoColumn({ style, leftSectionStyle, rightSectionStyle, leftSection, rightSection, isLeftFillSpace, isRightFillSpace }) {
  return (
    <BaseLayout
      style={{...layoutStyle, ...style}}
    >
      {
        ({ Row, Column }) => (
          <>
            <Column isFillSpace={isLeftFillSpace} style={leftSectionStyle}>
              {leftSection}
            </Column>
            <Column isFillSpace={isRightFillSpace} style={rightSectionStyle}>
              {rightSection}
            </Column>
          </>
        )
      }
    </BaseLayout>
  )
}

TwoColumn.defaultProps = {
  style: {},
  leftSectionStyle: {},
  rightSectionStyle: {},
  isLeftFillSpace: false,
  isRightFillSpace: false
}

export default TwoColumn
