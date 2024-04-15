import React from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import ActionPairButton from "../ActionPairButton";
import useIsWebView from "../../hooks/useIsWebView";
import style from "./SaveCancelButton.style";

const SaveCancelButton = ({
  isEditable,
  isLoading,
  onClickSave,
  onClickCancel,
  isValidAllFields,
}) => {
  const intl = useIntl();
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
