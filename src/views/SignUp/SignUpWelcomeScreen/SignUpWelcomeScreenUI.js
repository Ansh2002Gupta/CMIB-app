import React from "react";
import PropTypes from "prop-types";
import { FlatList, Text, View } from "@unthinkable/react-core-components";
import style from "./SignUpWelcomeScreen.style";
import CheckBox from "../../../components/CheckBox/CheckBox";
import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";

const SignUpWelcomeScreenUI = (props) => {
  const {
    intl,
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
    <View style={style.innerContainer}>
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
    </View>
  );
};

SignUpWelcomeScreenUI.propTypes = {
  intl: PropTypes.object.isRequired,
  onClickNext: PropTypes.func.isRequired,
  setContactDetails: PropTypes.func.isRequired,
  contactDetails: PropTypes.array.isRequired,
  options: PropTypes.array.isRequired,
  setOptions: PropTypes.func.isRequired,
};

export default SignUpWelcomeScreenUI;
