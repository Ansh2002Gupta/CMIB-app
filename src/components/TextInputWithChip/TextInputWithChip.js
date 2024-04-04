import {
  ScrollView,
  TextInput,
  View,
} from "@unthinkable/react-core-components";
import React, { useEffect, useState } from "react";
import styles from "./TextInputWithChip.style";
import CustomChipCard from "../CustomChipCard/CustomChipCard";
import colors from "../../assets/colors";

const TextInputWithChip = ({ placeholderText, onValueChange, value = [] }) => {
  const [inputValue, setInputValue] = useState("");
  const [chips, setChips] = useState(Array.isArray(value) ? [...value] : []);

  useEffect(() => {
    onValueChange(chips);
    return;
  }, [chips]);

  const handleAddChip = () => {
    if (inputValue.trim()) {
      setChips([...chips, inputValue.trim()]);
      setInputValue(""); // Clear input field
    }
  };

  const handleRemoveChip = (index) => {
    const newChips = [...chips];
    newChips.splice(index, 1);
    setChips(newChips);
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={inputValue}
        onChangeText={setInputValue}
        placeholder={placeholderText}
        placeholderTextColor={colors.darkGrey}
        onSubmitEditing={handleAddChip}
        returnKeyType="done"
        style={styles.input}
      />
      <ScrollView style={styles.chipContainer} horizontal>
        {chips.map((chip, index) => (
          <CustomChipCard
            key={index}
            message={chip}
            onPress={() => handleRemoveChip(index)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default TextInputWithChip;
