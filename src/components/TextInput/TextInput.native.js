import React, {memo, useCallback, forwardRef} from 'react';
import {TextInput as RNTextInput} from 'react-native';

const TextInput = (
  {value, disabled, onChange, onChangeText, onChangeValue, ...props},
  ref,
) => {
  const onChangeCallback = useCallback(
    e => {
      if (onChange) {
        onChange({target: {value: e.nativeEvent.text}});
      }
      if (onChangeText || onChangeValue) {
        let text = e && e.nativeEvent && e.nativeEvent.text;
        onChangeText && onChangeText(text);
        onChangeValue && onChangeValue(text, e);
      }
    },
    [onChangeText, onChangeValue, onChange],
  );

  const extraProps = {};
  if (disabled) {
    extraProps.editable = false;
  }

  if (value === undefined || value === null) {
    value = '';
  } else if (value && typeof value !== 'string') {
    value = JSON.stringify(value);
  }

  return (
    <RNTextInput
      {...props}
      {...extraProps}
      ref={ref}
      value={value}
      onChange={onChangeCallback}
    />
  );
};

export default memo(forwardRef(TextInput));
