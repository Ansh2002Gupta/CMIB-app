import React from "react";
import { useIntl } from "react-intl";
import { Platform, View } from "@unthinkable/react-core-components";

import { TwoColumn, TwoRow } from "../../core/layouts";

import CommonText from "../CommonText";
import JobCardMobile from "./JobCardMobile";
import JobCardWeb from "./JobCardWeb";
import useIsWebView from "../../hooks/useIsWebView";
import style from "./SavedJobComponent.style";
import { usePost } from "../../hooks/useApiRequest";
import ToastComponent from "../ToastComponent/ToastComponent";
import useSaveAndRemoveJob from "../../services/apiServices/hooks/useSaveAndRemoveJob";

const SavedJobComponent = ({
  details,
  onPress,
  containerStyle,
  isSaveVisible,
  isApplyVisible,
  handleOpenModal,
}) => {
  const intl = useIntl();

  const { isWebView } = useIsWebView();
  const { id } = details;

  const cardDetails = {
    companyName: details?.company_name || details?.company?.name,
    createdAt: details?.created_at,
    jobPostion: details?.designation,
    jobDescription: details?.detail,
    jobLocation: details?.location,
    vaccancies: details?.vacancy,
    minSalary: details?.min_salary,
    maxSalary: details?.max_salary,
    minExperience: details?.min_experience,
    maxExperience: details?.max_experience,
    requirement: details?.functional_areas,
    company_logo: details?.company_logo,
  };

  const handleClickOnCard = () => {
    onPress && onPress(id);
  };

  const {
    isSaveVisibleButton,
    handleSaveAndRemove,
    isLoading,
    error,
    resetError,
  } = useSaveAndRemoveJob({ id: details.id, isSaveVisible });

  const handleResetError = () => {
    resetError();
  };
  return (
    <>
      <TwoRow
        style={{
          ...style.mainContainer,
          ...containerStyle,
          ...(details?.is_urgent ? style.borderTop : style.paddingTop),
        }}
        topSection={
          details?.is_urgent ? (
            <TwoColumn
              style={style.topCurveSection}
              isLeftFillSpace
              leftSection={<View style={style.whiteCurveSection} />}
              rightSection={
                <CommonText
                  customContainerStyle={style.urgentText}
                  customTextStyle={style.urgentTextStyles}
                  fontWeight="600"
                >
                  {intl.formatMessage({ id: "label.urgent" })}
                </CommonText>
              }
              rightSectionStyle={style.backgroundWhite}
            />
          ) : (
            <View />
          )
        }
        bottomSection={
          isWebView ? (
            <JobCardWeb
              {...{
                cardDetails,
                handleApply: () => {
                  handleOpenModal(id);
                },
                isLoading,
                handleSaveAndRemove,
                isApplyVisible: isApplyVisible,
                isSaved: isSaveVisibleButton,
                onPress: handleClickOnCard,
              }}
            />
          ) : (
            <JobCardMobile
              {...{
                cardDetails,
                handleApply: () => {
                  handleOpenModal(id);
                },
                isLoading,
                handleSaveAndRemove,
                isApplyVisible: isApplyVisible,
                isSaved: isSaveVisibleButton,
                onPress: handleClickOnCard,
              }}
            />
          )
        }
      />
      {error ? (
        <ToastComponent toastMessage={error} onDismiss={handleResetError} />
      ) : null}
    </>
  );
};

export default SavedJobComponent;
