import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import {
  ScrollView,
  View,
} from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import useIsWebView from "../../hooks/useIsWebView";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import styles from "./TextFormatComponent.style";

const TextFormatComponent = ({ isMandatory, customLabelStyle, label }) => {
  const richText = useRef(null);
  const intl = useIntl();
  const { isWebView } = useIsWebView();

  return (
    <View style={styles.componentView}>
      <View style={styles.labelContainer}>
        <CommonText
          customTextStyle={[
            styles.label,
            isWebView && styles.webLabel,
            customLabelStyle,
          ]}
          title={label}
        />
        {isMandatory && (
          <CommonText
            customTextStyle={[styles.label, styles.starStyle]}
            title={"*"}
          />
        )}
      </View>
      <View style={styles.mainView}>
        {/* <TouchableOpacity style={styles.formatOptionStyle}>
          <Text style={styles.activeFormatOptionTextStyle}>Format Options</Text>
        </TouchableOpacity> */}
        <View>
          <RichToolbar
            editor={richText}
            actions={[
              actions.setBold,
              actions.setItalic,
              actions.setUnderline,
              actions.heading1,
              actions.insertBulletsList,
              actions.insertLink,
              actions.checkboxList,
              actions.undo,
              actions.redo,
            ]}
            style={styles.toolBarStyle}
          />
          <ScrollView>
            <RichEditor
              ref={richText}
              onChange={(descriptionText) => {
                console.log("descriptionText:", descriptionText);
              }}
              placeholder={intl.formatMessage({ id: "label.description" })}
            />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

TextFormatComponent.propTypes = {
  label: PropTypes.string,
  customLabelStyle: PropTypes.object,
  isMandatory: PropTypes.bool,
};
export default TextFormatComponent;
