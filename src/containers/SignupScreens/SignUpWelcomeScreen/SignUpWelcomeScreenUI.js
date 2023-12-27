import React, { useContext } from "react";
import PropTypes from "prop-types";
import { MediaQueryContext } from "@unthinkable/react-theme";
import { FlatList, View } from "@unthinkable/react-core-components";

import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";
import CheckBox from "../../../components/CheckBox/CheckBox";
import CommonText from "../../../components/CommonText";
import HeaderTextWithLabelAndDescription from "../../../components/HeaderTextWithLabelAndDescription";
import LabelWithLinkText from "../../../components/LabelWithLinkText";
import ToastComponent from "../../../components/ToastComponent/ToastComponent";
import useIsWebView from "../../../hooks/useIsWebView";
import { getResponsiveStyles, style } from "./SignUpWelcomeScreen.style";

const SignUpWelcomeScreenUI = ({
  contactDetails,
  handleDismissToast,
  intl,
  onClickNext,
  onClickGoToLogin,
  options,
  setContactDetails,
  setOptions,
  validationError,
}) => {
  const { isWebView } = useIsWebView();
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const showContentHeader =
    currentBreakpoint !== "xs" && currentBreakpoint !== "sm";

  const handleToggle = (id) => {
    const updatedItems = options.map((item) => {
      if (item.id === id) {
        return { ...item, isSelected: !item.isSelected };
      }
      return item;
    });
    setOptions(updatedItems);
    const toggledItem = updatedItems.find((item) => item.id === id);
    if (toggledItem.isSelected) {
      setContactDetails([...contactDetails, { module: toggledItem.id }]);
    } else {
      setContactDetails(contactDetails.filter((item) => item.module !== id));
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <CheckBox
        id={item.id}
        index={index}
        title={item.title}
        isSelected={item.isSelected}
        handleCheckbox={handleToggle}
      />
    );
  };

  return (
    <View
      style={
        isWebView
          ? getResponsiveStyles({ str: "signupContainer", currentBreakpoint })
          : style.innerContainer
      }
    >
      {isWebView && (
        <HeaderTextWithLabelAndDescription
          label={intl.formatMessage({ id: "label.step_one" })}
          {...(showContentHeader
            ? {
                headerText: intl.formatMessage({ id: "label.welcome_to_cmib" }),
              }
            : {})}
        />
      )}
      <View style={style.signUpSubContainer}>
        <CommonText
          customTextStyle={
            isWebView
              ? [style.formHeaderStyle, style.webFormHeaderStyle]
              : style.formHeaderStyle
          }
          title={intl.formatMessage({ id: "label.choose_interest" })}
        />
        <FlatList
          contentContainerStyle={style.contentContainerStyle}
          data={options}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <View style={style.signupFooterContainer}>
          <ButtonComponent
            title={intl.formatMessage({ id: "label.next" })}
            onPress={onClickNext}
            hasIconRight
            disabled={contactDetails.length <= 0}
          />
          {isWebView && (
            <LabelWithLinkText
              labelText={intl.formatMessage({ id: "label.already_account" })}
              linkText={intl.formatMessage({ id: "label.login_here" })}
              onLinkClick={onClickGoToLogin}
            />
          )}
        </View>
      </View>
      {!!validationError && (
        <ToastComponent
          toastMessage={validationError}
          onDismiss={handleDismissToast}
        />
      )}
    </View>
  );
};

SignUpWelcomeScreenUI.defaultProps = {
  handleDismissToast: () => {},
  validationError: false,
};

SignUpWelcomeScreenUI.propTypes = {
  contactDetails: PropTypes.array.isRequired,
  handleDismissToast: PropTypes.func,
  intl: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  onClickNext: PropTypes.func.isRequired,
  onClickGoToLogin: PropTypes.func.isRequired,
  setContactDetails: PropTypes.func.isRequired,
  setOptions: PropTypes.func.isRequired,
  validationError: PropTypes.bool,
};

export default SignUpWelcomeScreenUI;
