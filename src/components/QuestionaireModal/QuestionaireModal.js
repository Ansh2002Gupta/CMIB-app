import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Platform, ScrollView, View } from "@unthinkable/react-core-components";

import { TwoColumn, TwoRow } from "../../core/layouts";

import ActionPairButton from "../ActionPairButton";
import CommonText from "../CommonText";
import CustomTextInput from "../CustomTextInput";
import CustomModal from "../CustomModal";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import LoadingScreen from "../LoadingScreen";
import ToastComponent from "../ToastComponent/ToastComponent";
import useFetch from "../../hooks/useFetch";
import { usePost } from "../../hooks/useApiRequest";
import useIsWebView from "../../hooks/useIsWebView";
import { convertJSONStringArrayToIntArray } from "../../utils/util";
import { POST_JOB, QUESTIONAIRE } from "../../services/apiServices/apiEndPoint";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../constants/errorMessages";
import { isValueEmpty } from "../../utils/util";
import { APPLY_JOB } from "../../services/apiServices/apiEndPoint";
import styles from "./QuestionaireModal.style";

const QuestionaireModal = ({ handleCloseModal, handleSuccessApply, jobId }) => {
  const intl = useIntl();
  const [questions, setQuestions] = useState();
  const { isWebView } = useIsWebView();
  const isWebProps =
    Platform.OS.toLowerCase() === "web"
      ? {
          buttonOneStyle: styles.buttonStyle,
          buttonTwoStyle: styles.buttonStyle,
          buttonOneContainerStyle: styles.buttonStyle,
          buttonTwoContainerStyle: styles.buttonStyle,
        }
      : {};
  const {
    fetchData: getQuestionaire,
    data: questionaireData,
    isLoading: isGettingQuestions,
    error: errorWhileGettingQuestions,
  } = useFetch({
    url: POST_JOB + `/${jobId}` + QUESTIONAIRE,
  });

  const {
    makeRequest: handleApplyJob,
    isLoading: isjobAppling,
    error: errorWhileApplyingJobs,
    setError: setErrorWhileApplyingJob,
  } = usePost({
    url: APPLY_JOB,
  });

  const handleSaveButton = (data) => {
    let payload;
    payload = {
      job_id: jobId,
      answers: data.map((item) => {
        return {
          question_id: item?.id,
          answer: Array.isArray(item?.value) ? item?.value : [item?.value],
        };
      }),
    };

    handleApplyJob({
      body: payload,
      onSuccessCallback: () => {
        handleSuccessApply(jobId);
        handleCloseModal();
      },
      onErrorCallback: (errrMessage) => {},
    });
  };

  const handleCancelButton = () => {
    handleCloseModal();
  };

  const isDisabled = (data) => {
    let count = 0;
    data?.map((item) => {
      if (item?.mandatory) {
        if (isValueEmpty(item?.value) || !item?.value.length) {
          count++;
        }
      }
    });

    return !!count;
  };

  const addValueOnField = ({ data }) => {
    return data.map((item) => {
      return {
        ...item,
        value: data?.value
          ? data?.value
          : item?.type === "multi-select"
          ? []
          : "",
        question_options: convertJSONStringArrayToIntArray(
          item?.question_options,
          item?.type === "multi-select"
        ),
      };
    });
  };

  const handleValueChange = (id, newValue) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id ? { ...question, value: newValue } : question
      )
    );
  };

  const handleMultiSelectChange = (questionId, optionValue) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        if (question.id === questionId) {
          const updatedOptions = question.question_options.map((option) => {
            if (option.value === optionValue) {
              return {
                ...option,
                isSelected: !option.isSelected,
              };
            }
            return option;
          });
          return {
            ...question,
            value: updatedOptions
              .filter((item) => item.isSelected)
              .map((item) => item.value),
            question_options: updatedOptions,
          };
        }
        return question;
      })
    );
  };

  const handleResetError = () => {
    setErrorWhileApplyingJob("");
  };

  useEffect(() => {
    if (questionaireData) {
      setQuestions(addValueOnField({ data: questionaireData }));
    }
    if (questionaireData && !questionaireData?.length) {
      let payload = {
        job_id: jobId,
      };
      handleApplyJob({
        body: payload,
        onSuccessCallback: () => {
          handleSuccessApply(jobId);
          handleCloseModal();
        },
      });
    }
  }, [questionaireData]);

  return (
    <>
      {errorWhileApplyingJobs && (
        <ToastComponent
          toastMessage={errorWhileApplyingJobs}
          onDismiss={handleResetError}
        />
      )}
      <View>
        {!!questionaireData?.length && (
          <CustomModal
            headerText={intl.formatMessage({ id: "label.questionnaire" })}
            isIconCross
            onPressIconCross={handleCancelButton}
          >
            {isGettingQuestions ? (
              <LoadingScreen />
            ) : errorWhileGettingQuestions ? (
              <ErrorComponent
                errorMsg={
                  errorWhileGettingQuestions?.data?.message ||
                  GENERIC_GET_API_FAILED_ERROR_MESSAGE
                }
              />
            ) : (
              !!questionaireData &&
              !isGettingQuestions &&
              !errorWhileGettingQuestions && (
                <TwoRow
                  style={styles.mainSectionStyle}
                  topSection={
                    <ScrollView
                      style={styles.modalContainerStyle}
                      showsVerticalScrollIndicator={false}
                    >
                      {questions?.map((item, index) => {
                        return (
                          <TwoRow
                            key={index}
                            style={styles.questionAnswer}
                            topSection={
                              <TwoColumn
                                style={styles.questionView}
                                leftSection={
                                  <CommonText
                                    customContainerStyle={
                                      isWebView && styles.questionTextView
                                    }
                                    customTextStyle={styles.questionText}
                                  >
                                    {`Q${item?.question_order}${
                                      !isWebView ? "." : ""
                                    }`}
                                  </CommonText>
                                }
                                rightSection={
                                  <View style={styles.mandotaryView}>
                                    <CommonText
                                      customTextStyle={styles.questionText}
                                    >
                                      {item?.question}
                                    </CommonText>

                                    {!!item?.mandatory && (
                                      <CommonText
                                        customTextStyle={styles.starStyle}
                                      >
                                        {"*"}
                                      </CommonText>
                                    )}
                                  </View>
                                }
                              />
                            }
                            bottomSection={
                              <CustomTextInput
                                value={item?.value}
                                isDropdown={
                                  item?.type === "single-select" ||
                                  item?.type === "multi-select"
                                }
                                placeholder={intl.formatMessage({
                                  id:
                                    item?.type === "text"
                                      ? "label.giveAnswer"
                                      : "label.selectOption",
                                })}
                                isMultiSelect={item?.type === "multi-select"}
                                options={item?.question_options}
                                labelField={"label"}
                                valueField={"value"}
                                isSelected={"isSelected"}
                                isSingleMutliSelect={
                                  item?.type === "multi-select"
                                }
                                onChangeValue={(val) => {
                                  item?.type === "multi-select"
                                    ? handleMultiSelectChange(item?.id, val)
                                    : handleValueChange(item?.id, val);
                                }}
                                onChangeText={(val) => {
                                  handleValueChange(item?.id, val);
                                }}
                              />
                            }
                          />
                        );
                      })}
                    </ScrollView>
                  }
                  bottomSection={
                    <View style={isWebView ? styles.buttonWebStyle : {}}>
                      <View style={isWebView ? styles.subContainerStyle : {}}>
                        <ActionPairButton
                          buttonOneText={intl.formatMessage({
                            id: "label.cancel",
                          })}
                          buttonTwoText={intl.formatMessage({
                            id: "label.save",
                          })}
                          customStyles={{
                            ...isWebProps,
                            customContainerStyle: styles.customContainerStyle,
                          }}
                          displayLoader={isjobAppling}
                          isDisabled={isDisabled(questions) || isjobAppling}
                          isButtonTwoGreen
                          onPressButtonOne={handleCancelButton}
                          onPressButtonTwo={() => handleSaveButton(questions)}
                        />
                      </View>
                    </View>
                  }
                  bottomSectionStyle={styles.bottomSectionStyle}
                />
              )
            )}
          </CustomModal>
        )}
      </View>
    </>
  );
};

export default QuestionaireModal;
