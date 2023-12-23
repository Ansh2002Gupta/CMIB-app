import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { View, TextInput ,Platform} from "@unthinkable/react-core-components";

import CustomTouchableOpacity from "../CustomTouchableOpacity/CustomTouchableOpacity";
import CommonText from "../CommonText";
import MultiRow from "../../core/layouts/MultiRow";
import MultiColumn from "../../core/layouts/MultiColumn/MultiColumn";
import TouchableImage from "../TouchableImage/TouchableImage";
import images from "../../images";
import styles from "./CounterInput.style";

const CounterInput = ({
  customErrorStyle,
  errorMessage,
  isError,
  minCount = 0,
  maxCount = Infinity,
  step = 1,
  initialCount = 0,
  onCountChange,
}) => {
  const [count, setCount] = useState(initialCount);
  const textInputRef = useRef(null);
  const ArrowUp = images.iconArrowUp;
  const ArrowDown = images.iconArrowDown;

  useEffect(() => {
    if (onCountChange) {
      onCountChange(count);
    }
  }, [count, onCountChange]);

  const incrementCount = () => {
    setCount((prev) => Math.min(prev + step, maxCount));
  };

  const decrementCount = () => {
    setCount((prev) => Math.max(prev - step, minCount));
  };

  const handleTextInputChange = (text) => {
    const newCount = parseInt(text, 10);
    if (!isNaN(newCount) && newCount >= minCount && newCount <= maxCount) {
      setCount(newCount);
    } else if (text.trim() === "") {
      setCount("");
    } else {
      setCount(count);
    }
  };

  const focusTextInput = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };

  const arrow = [
    {
      content: (
        <TouchableImage
          source={ArrowUp}
          parentStyle={styles.img}
          onPress={incrementCount}
        />
      ),
      style: styles.counterUp,
      isFillSpace: true,
    },
    {
      content: (
        <TouchableImage
          source={ArrowDown}
          parentStyle={styles.img}
          onPress={decrementCount}
        />
      ),
      style: styles.counterDown,
      isFillSpace: true,
    },
  ];

  const mobileProps = Platform.OS.toLowerCase() !== 'web' ? {keyboardType:"numeric", returnKeyType:"done"}:{}
  const counterView = [
    {
      content: (
        <CustomTouchableOpacity onPress={focusTextInput}>
          <TextInput
            ref={textInputRef}
            value={count.toString()}
            onChangeText={handleTextInputChange}
            style={styles.counterInputText}
            {...mobileProps}
            
          />
        </CustomTouchableOpacity>
      ),
      isFillSpace: true,
    },
    {
      content: <MultiRow rows={arrow} />,
      style: { marginLeft: 8 },
    },
  ];

  return (
    <View>
      <MultiColumn columns={counterView} style={styles.counterMainView} />
      {isError && (
        <CommonText
          customTextStyle={[styles.errorMsg, customErrorStyle]}
          title={errorMessage}
        />
      )}
    </View>
  );
};

CounterInput.propTypes = {
  minCount: PropTypes.number,
  maxCount: PropTypes.number,
  step: PropTypes.number,
  initialCount: PropTypes.number,
  onCountChange: PropTypes.func,
};

CounterInput.defaultProps = {
  minCount: 0,
  maxCount: Infinity,
  step: 1,
  initialCount: 0,
  onCountChange: null,
};

export default CounterInput;
