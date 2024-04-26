import React from "react";
import { useTheme } from "@unthinkable/react-theme";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import ActionPairButton from "../ActionPairButton";
import useIsWebView from "../../hooks/useIsWebView";
import getStyles from "./SaveCancelButton.style";

const SaveCancelButton = ({
  isEditable,
  isLoading,
  onClickSave,
  onClickCancel,
  isValidAllFields,
}) => {
  const intl = useIntl();
  const theme = useTheme();
  const style = getStyles(theme);
  const { isWebView } = useIsWebView();

  if (isEditable) {
    const isWebProps = isWebView
      ? {
          buttonOneStyle: style.customButtonStyle,
          buttonOneTextStyle: style.buttonTextStyle,
          buttonTwoStyle: style.customButtonStyle,
          buttonTwoTextStyle: style.buttonTextStyle,
          buttonOneContainerStyle: style.customButtonStyle,
          buttonTwoContainerStyle: style.customButtonStyle,
        }
      : {};
    return (
      <View
        style={{
          ...(isWebView ? style.webButtonContainer : {}),
          ...style.buttonContainer,
        }}
      >
        <ActionPairButton
          buttonOneText={intl.formatMessage({ id: "label.cancel" })}
          buttonTwoText={intl.formatMessage({ id: "label.save_changes" })}
          displayLoader={isLoading}
          isButtonTwoGreen
          isDisabled={isLoading || isValidAllFields}
          onPressButtonOne={onClickCancel}
          onPressButtonTwo={onClickSave}
          customStyles={{
            ...isWebProps,
          }}
        />
      </View>
    );
  }
  return null;
};

export default SaveCancelButton;
