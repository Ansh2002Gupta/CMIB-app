import { ScrollView, View } from "@unthinkable/react-core-components";
import style from "./PersonalDetails.style";
import DetailCard from "../../components/DetailCard";
import { useIntl } from "react-intl";
import useIsWebView from "../../hooks/useIsWebView";
import ActionPairButton from "../../components/ActionPairButton";
const PersonalDetailsUI = ({
  isEditable = true,
  correspondence_address,
  permanent_address,
  personal_detail,
  onChangeValue,
  handlePersonalDetailBlur,
  handleCorrespondenceAddressBlur,
  handlePermanentAddressBlur,
  isLoading,
  onClickSave,
  onClickCancel,
  isValidAllFields,
}) => {
  const intl = useIntl();
  const { isWebView } = useIsWebView();

  const renderSaveCancelButton = () => {
    if (isEditable) {
      const isWebProps = isWebView
        ? {
            buttonOneStyle: style.customButtonStyle,
            buttonOneTextStyle: style.buttonTextStyle,
            buttonTwoStyle: style.customButtonStyle,
            buttonTwoTextStyle: style.buttonTextStyle,
            buttonOneContainerStyle: style.customButtonStyle,
            buttonTwoContainerStyle: style.customButtonStyle,
          }
        : {};
      return (
        <View
          style={{
            ...(isWebView ? style.webButtonContainer : {}),
            ...style.buttonContainer,
          }}
        >
          <ActionPairButton
            buttonOneText={intl.formatMessage({ id: "label.cancel" })}
            buttonTwoText={intl.formatMessage({ id: "label.save_changes" })}
            displayLoader={isLoading}
            isButtonTwoGreen
            isDisabled={isLoading || isValidAllFields}
            onPressButtonOne={onClickCancel}
            onPressButtonTwo={onClickSave}
            customStyles={{
              ...isWebProps,
            }}
          />
        </View>
      );
    }
    return null;
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={style.contentContainerStyle}
    >
      <View style={style.innerContainerStyle}>
        <DetailCard
          details={personal_detail}
          headerId={intl.formatMessage({
            id: "label.personal_details",
          })}
          isEditProfile={isEditable}
          handleChange={onChangeValue(personal_detail)}
          handleBlur={handlePersonalDetailBlur}
        />
        <DetailCard
          details={correspondence_address}
          headerId={intl.formatMessage({
            id: "label.correspondence_address",
          })}
          isEditProfile={isEditable}
          handleChange={onChangeValue(correspondence_address)}
          handleBlur={handleCorrespondenceAddressBlur}
        />
        <DetailCard
          isEditProfile={isEditable}
          headerId={intl.formatMessage({
            id: "label.permanent_address",
          })}
          details={permanent_address}
          handleChange={onChangeValue(permanent_address)}
          handleBlur={handlePermanentAddressBlur}
        />
      </View>
      {renderSaveCancelButton()}
    </ScrollView>
  );
};

export default PersonalDetailsUI;
