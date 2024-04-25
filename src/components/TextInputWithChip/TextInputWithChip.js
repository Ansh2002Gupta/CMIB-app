import { useTheme } from "@unthinkable/react-theme";
import {
  ScrollView,
  TextInput,
  View,
} from "@unthinkable/react-core-components";
import React, { useEffect, useState } from "react";
import CustomChipCard from "../CustomChipCard/CustomChipCard";
import colors from "../../assets/colors";
import getStyles from "./TextInputWithChip.style";

const TextInputWithChip = ({
  placeholderText,
  onValueChange,
  value,
  isEditable,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);
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
        {(value ?? chips).map(
          (chip, index) =>
            chip && (
              <CustomChipCard
                key={index}
                message={chip}
                onPress={() => handleRemoveChip(index)}
                isEditable={isEditable}
              />
            )
        )}
      </ScrollView>
    </View>
  );
};

export default TextInputWithChip;
