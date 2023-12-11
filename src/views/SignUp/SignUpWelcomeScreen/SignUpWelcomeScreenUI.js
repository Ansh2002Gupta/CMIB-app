import React, { useState } from "react";
import PropTypes from "prop-types";
import images from "../../../images";
import SignUpHeader from "../../../components/SignUpHeader/SignUpHeader";
import { FlatList, Text } from "@unthinkable/react-core-components";
import style from "./SignUpWelcomeScreen.style";
import CheckBox from "../../../components/CheckBox/CheckBox";
import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";

const SignUpWelcomeScreenUI = (props) => {
  const { intl, onClickGoToLogin, onClickNext } = props;
  const [options, setOptions] = useState([
    {
      title: intl.formatMessage({ id: "label.ca_jobs" }),
      isSelected: false,
      id: 1,
    },
    {
      title: intl.formatMessage({ id: "label.newly_qualified_ca" }),
      isSelected: false,
      id: 2,
    },
    {
      title: intl.formatMessage({ id: "label.overseas_placements" }),
      isSelected: false,
      id: 3,
    },
    {
      title: intl.formatMessage({ id: "label.career_ascents" }),
      isSelected: false,
      id: 4,
    },
    {
      title: intl.formatMessage({ id: "label.women_placements" }),
      isSelected: false,
      id: 5,
    },
  ]);

  const handleToggle = (id) => {
    const updatedItems = options.map((item) => {
      if (item.id === id) {
        return { ...item, isSelected: !item.isSelected };
      }
      return item;
    });
    setOptions(updatedItems);
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
      />
    </SignUpHeader>
  );
};

SignUpWelcomeScreenUI.propTypes = {
  intl: PropTypes.object.isRequired,
  onClickGoToLogin: PropTypes.func.isRequired,
  onClickNext: PropTypes.func.isRequired,
};

export default SignUpWelcomeScreenUI;
