import React from "react";
import PropTypes from "prop-types";
import images from "../../../images";
import SignUpHeader from "../../../components/SignUpHeader/SignUpHeader";
import { FlatList, Text } from "@unthinkable/react-core-components";
import style from "./SignUpWelcomeScreen.style";
import CheckBox from "../../../components/CheckBox/CheckBox";
import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";

const SignUpWelcomeScreenUI = (props) => {
  const {
    intl,
    onClickGoToLogin,
    onClickNext,
    contactDetails,
    setContactDetails,
    options,
    setOptions,
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
    <SignUpHeader
      intl={intl}
      headerText={intl.formatMessage({ id: "label.welcome_to_sign_up" })}
      onClickGoToLogin={onClickGoToLogin}
      image={images.iconWalkthroughSignUpOne}
    >
      <Text style={style.formHeaderStyle}>
        {intl.formatMessage({ id: "label.choose_interest" })}
      </Text>
      <FlatList
        contentContainerStyle={style.contentContainerStyle}
        data={options}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <ButtonComponent
        title={intl.formatMessage({ id: "label.next" })}
        onPress={onClickNext}
        hasIconRight
        disabled={contactDetails.length <= 0}
      />
    </SignUpHeader>
  );
};

SignUpWelcomeScreenUI.propTypes = {
  intl: PropTypes.object.isRequired,
  onClickGoToLogin: PropTypes.func.isRequired,
  onClickNext: PropTypes.func.isRequired,
  setContactDetails: PropTypes.func.isRequired,
  contactDetails: PropTypes.array.isRequired,
  options: PropTypes.array.isRequired,
  setOptions: PropTypes.func.isRequired,
};

export default SignUpWelcomeScreenUI;
