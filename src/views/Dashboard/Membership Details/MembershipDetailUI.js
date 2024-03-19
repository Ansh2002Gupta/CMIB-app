import { ScrollView, View } from "@unthinkable/react-core-components";
import style from './MembershipDetail.style';
import DetailCard from "../../../components/DetailCard";
import { useIntl } from "react-intl";
import useIsWebView from "../../../hooks/useIsWebView";
import ActionPairButton from "../../../components/ActionPairButton";
const MembershipDetailUI = ({
  isEditable = true,
  membership_detail,
  fellow_member_detail,
  practice_detail,
  onChangeValue,
  handleMembershipDetailBlur,
  handleFellowMemberDetailBlur,
  handlePracticeDetailBlur,
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
          details={membership_detail}
          headerId={intl.formatMessage({
            id: "label.membershipDetail",
          })}
          isEditProfile={isEditable}
          handleChange={onChangeValue(membership_detail)}
          handleBlur={handleMembershipDetailBlur}
        />
        <DetailCard
          details={fellow_member_detail}
          isEditProfile={isEditable}
          handleChange={onChangeValue(fellow_member_detail)}
          handleBlur={handleFellowMemberDetailBlur}
        />
         <DetailCard
          details={practice_detail}
          isEditProfile={isEditable}
          handleChange={onChangeValue(practice_detail)}
          handleBlur={handlePracticeDetailBlur}
        />
      </View>
      {renderSaveCancelButton()}
    </ScrollView>
  );
};

export default MembershipDetailUI;
