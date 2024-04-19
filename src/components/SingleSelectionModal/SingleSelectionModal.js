import {
  View,
  TouchableOpacity,
  ScrollView,
} from "@unthinkable/react-core-components";
import React from "react";
import CustomModal from "../CustomModal";
import styles from "./styles";
import CommonText from "../CommonText";
import SaveCancelButton from "../SaveCancelButton";
import Spinner from "../Spinner";
import { useIntl } from "react-intl";

const SingleSelectionModal = ({
  title,
  data = [],
  itemKey,
  titleKey,
  selectedData,
  handleOnSelect,
  onClickSave,
  onClickCancel,
  isLoading,
  isDataLoading,
  centerListError,
}) => {
  const intl = useIntl();

  const renderList = () => {
    if (isDataLoading) {
      return (
        <View style={styles.flexCenterContainer}>
          <Spinner />
        </View>
      );
    }

    if (centerListError) {
      return (
        <View style={styles.flexContainer}>
          <CommonText customTextStyle={styles.messageText}>
            {centerListError?.data?.message}
          </CommonText>
        </View>
      );
    }
    
    if (!data?.length) {
      return (
        <View style={styles.flexCenterContainer}>
          <CommonText customTextStyle={styles.messageText}>
            {intl.formatMessage({ id: "label.noResultFound" })}
          </CommonText>
        </View>
      );
    }

    return data?.map((data) => {
      return (
        <TouchableOpacity
          onPress={() => {
            handleOnSelect(data);
          }}
          key={data?.[itemKey]}
          style={styles.centersDataItem}
        >
          <CommonText customTextStyle={styles.textStyle}>
            {data?.[titleKey] ?? ""}
          </CommonText>

          <View
            style={{
              ...styles.yesButtonStyle,
              ...(selectedData?.[itemKey] === data?.[itemKey]
                ? styles.activeButtonStyle
                : null),
            }}
          >
            <View
              style={{
                ...styles.buttonViewStyle,
                ...(selectedData?.[itemKey] === data?.[itemKey]
                  ? styles.activeButtonViewStyle
                  : null),
              }}
            />
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <CustomModal
      headerText={title}
      headerTextStyle={styles.headerText}
      onBackdropPress={onClickCancel}
    >
      <ScrollView style={styles.modalInnerContainer}>{renderList()}</ScrollView>
      <SaveCancelButton
        isEditable={true}
        isLoading={isLoading}
        isValidAllFields={!selectedData}
        onClickSave={onClickSave}
        onClickCancel={onClickCancel}
      />
    </CustomModal>
  );
};

export default SingleSelectionModal;
