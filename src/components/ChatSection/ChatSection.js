import React, { useContext, useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { FlatList, Platform, View } from "@unthinkable/react-core-components";

import { TwoRow } from "../../core/layouts";

import CommonText from "../CommonText";
import CustomTextInput from "../CustomTextInput";
import FormWrapper from "../FormWrapper";
import MessageComponent from "../MessageComponent/MessageComponent";
import MessageInfoComponent from "../MessageInfoComponent/MessageInfoComponent";
import Spinner from "../Spinner";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import useHandleInfiniteScroll from "../../hooks/useHandleInfiniteScroll";
import {
  formatDate,
  getDateFlagMobile,
  getDateStatus,
  getTime,
} from "../../utils/util";
import { MESSAGE_MAX_LENGTH } from "../../constants/constants";
import styles from "./ChatSection.style";

const isMob = Platform.OS.toLowerCase() !== "web";

const ChatSection = ({
  allDataLoaded,
  data,
  details,
  fileUploadError,
  handleFileUpload,
  handleSendButton,
  handleLoadMore,
  isFirstPageReceived,
  initiateFileUpload,
  setFileUploadResult,
  loadingMore,
  isSending,
  isErrorWhileSending,
  errorWhileSendingMessage,
  setErrorWhileSendingMessages,
}) => {
  const intl = useIntl();
  const [userProfileDetails] = useContext(UserProfileContext);
  const [messageValue, setMessageValue] = useState("");
  const [file, setFile] = useState(null);
  const flatListRef = useRef(null);
  const scrollToLatestMessageRef = useRef(null);
  const inputAttachmentRef = useRef();

  const { setErrorWhileSendingMessage, setErrorWhileUpload } =
    setErrorWhileSendingMessages;

  const isMobileProps = isMob
    ? {
        inverted: true,
        onEndReached: handleLoadMore,
        onEndReachedThreshold: 0.1,
      }
    : {};

  useHandleInfiniteScroll(handleLoadMore, flatListRef);

  const handleScrollToLastMessage = (scrollRef) => {
    if (!isMob && scrollRef.current) {
      const element = scrollRef.current;
      element.scrollIntoView({ behaviour: "smooth" });
    }
  };

  useEffect(() => {
    handleScrollToLastMessage(scrollToLatestMessageRef);
  }, []);

  const handleInputChange = (val) => {
    setMessageValue(val);
  };

  const handleSend = async () => {
    const trimmedValue = messageValue.trim();
    if (!trimmedValue && !file) {
      return;
    }
    if (!!file) {
      const formData = new FormData();
      formData.append("file", file);
      await handleFileUpload({
        file: formData,
        successCallback: async (fileUploadData) => {
          await handleSendButton({
            messageValue: messageValue,
            file_name: fileUploadData?.data?.file_name || "",
          });
          handleScrollToLastMessage(scrollToLatestMessageRef);
        },
      });
    } else {
      await handleSendButton({
        messageValue: messageValue,
        file_name: "",
      });
      handleScrollToLastMessage(scrollToLatestMessageRef);
    }
    setFileUploadResult("");
    setMessageValue("");
    setFile("");
  };

  const uploadImageToServer = ({ uploadedFile }) => {
    setFile(uploadedFile);
    handleScrollToLastMessage(inputAttachmentRef);
  };

  const shouldShowAvatar = (currentIndex) => {
    const comparisonIndex = isMob ? currentIndex + 1 : currentIndex - 1;
    if (isMob ? currentIndex === data.length - 1 : currentIndex === 0) {
      return true;
    }
    if (comparisonIndex < 0 || comparisonIndex >= data.length) {
      return false;
    }
    const currentMessage = data[currentIndex];
    const comparisonMessage = data[comparisonIndex];
    if (currentMessage?.author?.type !== comparisonMessage?.author?.type) {
      return true;
    }
    const currentTime = getTime(currentMessage?.created_at);
    const comparisonTime = getTime(comparisonMessage?.created_at);
    return currentTime !== comparisonTime;
  };

  const webProps = !isMob ? { size: "xs" } : {};

  const renderHorizontalLine = () => {
    return <View style={styles.horizontalLine} />;
  };

  const renderError = () => {
    return (
      <CommonText
        customTextStyle={styles.errorTextStyle}
        customContainerStyle={styles.errorContainerStyle}
        fontWeight="600"
      >
        {fileUploadError}
      </CommonText>
    );
  };

  const preprocessMessages = (messages) => {
    const dateFlags = {};
    messages.forEach((msg) => {
      const dateKey = formatDate(new Date(msg?.created_at));
      dateFlags[dateKey] = (dateFlags[dateKey] || 0) + 1;
    });

    messages.forEach((msg, index) => {
      const dateKey = formatDate(new Date(msg?.created_at));
      dateFlags[dateKey]--;
      if (!dateFlags[dateKey] && messages[index]) {
        messages[index].dateFlag = getDateFlagMobile(msg?.created_at);
      }
    });
    return messages;
  };

  const processedMessages = isMob ? preprocessMessages(data) : [];

  const renderMessagesSection = ({ item, index }) => {
    let messageFlag;
    if (!isMob) {
      messageFlag = getDateStatus(item?.created_at);
    }

    return (
      <>
        <>
          {!!messageFlag && !isMob && (
            <View style={styles.flagContainer}>
              {renderHorizontalLine()}
              <CommonText customTextStyle={styles.messageFlag}>
                {messageFlag}
              </CommonText>
              {renderHorizontalLine()}
            </View>
          )}
          {item?.author?.type.toLowerCase() === "system" && (
            <MessageInfoComponent message={item?.message} />
          )}
          <MessageComponent
            data={item}
            userDetails={userProfileDetails?.userDetails}
            index={index}
            shouldShowAvatar={shouldShowAvatar}
          />
          {!!item?.dateFlag && isMob && (
            <View style={styles.flagContainer}>
              {renderHorizontalLine()}
              <CommonText customTextStyle={styles.messageFlag}>
                {item?.dateFlag}
              </CommonText>
              {renderHorizontalLine()}
            </View>
          )}
        </>
        <View ref={scrollToLatestMessageRef} />
      </>
    );
  };

  return (
    <TwoRow
      topSection={
        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => {
            if (loadingMore && !isFirstPageReceived) {
              return (
                <View style={styles.loadingStyle}>
                  <Spinner thickness={2} {...webProps} />
                </View>
              );
            }
            if (allDataLoaded) {
              return null;
            }
            return null;
          }}
          ref={flatListRef}
          {...isMobileProps}
          data={isMob ? processedMessages : data}
          style={styles.chatSection}
          renderItem={renderMessagesSection}
        />
      }
      isTopFillSpace
      topSectionStyle={styles.messageSection}
      bottomSectionStyle={styles.inputSection}
      bottomSection={
        <>
          {renderError()}
          {details?.status.toLowerCase() === "in-progress" && (
            <FormWrapper onSubmit={handleSend}>
              <CustomTextInput
                customStyle={styles.cutomTextInput}
                customTextInputOuterContainer={
                  styles.customTextInputOuterContainer
                }
                file={file}
                isSendButton
                isLoading={isSending}
                initiateFileUpload={initiateFileUpload}
                maxLength={MESSAGE_MAX_LENGTH}
                onChangeText={(val) => handleInputChange(val)}
                onClickAttachement={uploadImageToServer}
                onClickSend={handleSend}
                placeholder={intl.formatMessage({ id: "label.type_message" })}
                value={messageValue}
                setFile={setFile}
                onIconClose={() => setFile("")}
                customHandleBlur={() => {
                  setErrorWhileSendingMessage("");
                  setErrorWhileUpload("");
                }}
                isError={isErrorWhileSending}
                errorMessage={errorWhileSendingMessage}
                attachementRef={inputAttachmentRef}
              />
            </FormWrapper>
          )}
        </>
      }
    />
  );
};

ChatSection.defaultProps = {
  allDataLoaded: false,
  data: [],
  details: {},
  fileUploadError: "",
  handleFileUpload: () => {},
  handleSendButton: () => {},
  handleLoadMore: () => {},
  isFirstPageReceived: true,
  initiateFileUpload: () => {},
  loadingMore: false,
};

ChatSection.propTypes = {
  allDataLoaded: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  details: PropTypes.object,
  fileUploadError: PropTypes.string,
  handleFileUpload: PropTypes.func.isRequired,
  handleSendButton: PropTypes.func.isRequired,
  handleLoadMore: PropTypes.func.isRequired,
  isFirstPageReceived: PropTypes.bool.isRequired,
  initiateFileUpload: PropTypes.func.isRequired,
  loadingMore: PropTypes.bool.isRequired,
};

export default ChatSection;
