import React from "react";
import PropTypes from "prop-types";
import { FlatList, View } from "@unthinkable/react-core-components";

import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";
import CommonText from "../../../components/CommonText";
import CheckBox from "../../../components/CheckBox/CheckBox";
import ToastComponent from "../../../components/ToastComponent/ToastComponent";
import style from "./SignUpWelcomeScreen.style";

const SignUpWelcomeScreenUI = (props) => {
  const {
    contactDetails,
    handleDismissToast,
    isLoading,
    intl,
    options,
    onClickNext,
    setContactDetails,
    setOptions,
    validationError,
  } = props;

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
    <View style={style.innerContainer}>
      <CommonText
        customTextStyle={style.formHeaderStyle}
        title={intl.formatMessage({ id: "label.choose_interest" })}
      />
      <FlatList
        contentContainerStyle={style.contentContainerStyle}
        data={options}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <ButtonComponent
        disabled={contactDetails.length <= 0}
        displayLoader={isLoading}
        hasIconRight
        onPress={onClickNext}
        title={intl.formatMessage({ id: "label.next" })}
      />
      {!!validationError && (
        <ToastComponent
          toastMessage={validationError}
          onDismiss={handleDismissToast}
        />
      )}
    </View>
  );
};

SignUpWelcomeScreenUI.propTypes = {
  contactDetails: PropTypes.array.isRequired,
  handleDismissToast: PropTypes.func,
  intl: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  options: PropTypes.array.isRequired,
  onClickNext: PropTypes.func.isRequired,
  setContactDetails: PropTypes.func.isRequired,
  setOptions: PropTypes.func.isRequired,
  validationError: PropTypes.bool,
};

export default SignUpWelcomeScreenUI;
