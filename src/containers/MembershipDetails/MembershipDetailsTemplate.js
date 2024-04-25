import React from "react";
import { useIntl } from "react-intl";
import { useTheme } from "@unthinkable/react-theme";
import { Platform, View } from "@unthinkable/react-core-components";

import CustomScrollView from "../../components/CustomScrollView";
import DetailCard from "../../components/DetailCard";
import SaveCancelButton from "../../components/SaveCancelButton";
import ToastComponent from "../../components/ToastComponent/ToastComponent";
import Spinner from "../../components/Spinner";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import { STATUS_CODES } from "../../constants/constants";
import getStyles from "./MembershipDetails.style";

const MembershipDetailsTemplate = ({
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
  error,
  setError,
  isLoadingPage,
  isErrorLoadingPage,
}) => {
  const theme = useTheme();
  const style = getStyles(theme);
  const intl = useIntl();

  const scrollViewMobileProps =
    Platform.OS.toLowerCase() !== "web"
      ? { showsVerticalScrollIndicator: false }
      : {};

  if (isLoadingPage) {
    return (
      <View style={style.loaderStyle}>
        <Spinner />
      </View>
    );
  }

  if (
    isErrorLoadingPage &&
    isErrorLoadingPage?.code !== STATUS_CODES.UNAUTHORIZED_USER
  ) {
    return <ErrorComponent errorMsg={isErrorLoadingPage?.data?.message} />;
  }

  return (
    <>
      <CustomScrollView
        {...scrollViewMobileProps}
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
        <SaveCancelButton
          isEditable={isEditable}
          isLoading={isLoading}
          onClickSave={onClickSave}
          onClickCancel={onClickCancel}
          isValidAllFields={isValidAllFields}
        />
      </CustomScrollView>
      {!!error && (
        <ToastComponent toastMessage={error} onDismiss={() => setError("")} />
      )}
    </>
  );
};

export default MembershipDetailsTemplate;
