import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { ScrollView, View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import useIsWebView from "../../hooks/useIsWebView";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import styles from './TextFormatComponent.style'

const TextFormatComponent = ({ customLabelStyle, isMandatory, label }) => {
  const richText = useRef(null);
  const intl = useIntl();
  const { isWebView } = useIsWebView();

  const handleHead = () => (
    <CommonText
      title={intl.formatMessage({ id: "label.heading" })}
      customTextStyle={styles.headingStyle}
    />
  );

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
            iconMap={{ [actions.heading1]: handleHead }}
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

TextFormatComponent.defaultProps = {
  customLabelStyle: {},
  isMandatory: false,
  label: "",
};

TextFormatComponent.propTypes = {
  customLabelStyle: PropTypes.object,
  isMandatory: PropTypes.bool,
  label: PropTypes.string,
};

export default TextFormatComponent;
