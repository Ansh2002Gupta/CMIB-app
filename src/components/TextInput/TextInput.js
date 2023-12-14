import React, { useCallback, memo, forwardRef } from "react";
import { StyleSheet } from "@unthinkable/react-core-components";

const defaultStyle = {
  outline: "none",
  padding: 0,
  borderWidth: 0,
  backgroundColor: "transparent",
};

const TextInput = (
  {
    value,
    editable,
    onSubmitEditing,
    style,
    onChange,
    onChangeText,
    caretHidden,
    showSoftInputOnFocus,
    onChangeValue,
    onKeyUp,
    secureTextEntry,
    ...props
  },
  ref
) => {
  const onChangeCallback = useCallback(
    (e) => {
      if (onChange) {
        onChange(e);
      }
      if (onChangeText || onChangeValue) {
        let text = e && e.target && e.target.value;
        onChangeText && onChangeText(text);
        onChangeValue && onChangeValue(text, e);
      }
    },
    [onChangeText, onChangeValue, onChange]
  );

  const onKeyUpCallback = useCallback(
    (e) => {
      const keyCode = e.keyCode;
      if (keyCode === 13) {
        onSubmitEditing && onSubmitEditing(e);
      }
      onKeyUp && onKeyUp(e);
    },
    [onKeyUp, onSubmitEditing]
  );

  if (style && Array.isArray(style)) {
    style = StyleSheet.flatten(style);
  }
  if (style && style.lineHeight && typeof style.lineHeight === "number") {
    style = { ...style, lineHeight: style.lineHeight + "px" };
  }
  let extraStyle = {};
  if (caretHidden) {
    extraStyle.caretColor = "transparent";
  }

  let extraProps = {};
  if (showSoftInputOnFocus === false) {
    extraProps["readOnly"] = true;
  }
  if (editable === false) {
    extraProps["disabled"] = true;
  }
  if (onSubmitEditing) {
    extraProps["onKeyUp"] = onKeyUpCallback;
  }

  if (value === undefined || value === null) {
    value = "";
  } else if (value && typeof value !== "string") {
    value = JSON.stringify(value);
  }

  const inputType = secureTextEntry ? "password" : "text";

  return (
    <input
      {...props}
      {...extraProps}
      ref={ref}
      type={inputType}
      style={{ ...defaultStyle, ...style, ...extraStyle }}
      value={value}
      onChange={onChangeCallback}
    />
  );
};

export default memo(forwardRef(TextInput));
