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
  fileUploadResult,
  fileUploadError,
  handleFileUpload,
  handleSendButton,
  handleLoadMore,
  isFirstPageReceived,
  initiateFileUpload,
  loadingMore,
  userDetails,
}) => {
  const intl = useIntl();
  const [userProfileDetails] = useContext(UserProfileContext);
  const [messageValue, setMessageValue] = useState("");
  const [file, setFile] = useState(null);
  const flatListRef = useRef(null);
  const scrollToLatestMessageRef = useRef(null);

  const isMobileProps = isMob
    ? {
        inverted: true,
        onEndReached: handleLoadMore,
        onEndReachedThreshold: 0.1,
      }
    : {};

  useHandleInfiniteScroll(handleLoadMore, flatListRef);

  useEffect(() => {
    if (!isMob && scrollToLatestMessageRef.current) {
      const element = scrollToLatestMessageRef.current;
      element.scrollIntoView({ behaviour: "smooth" });
    }
  }, [data]);

  const handleInputChange = (val) => {
    setMessageValue(val);
  };

  const handleSend = async () => {
    await handleSendButton({
      messageValue: messageValue,
      file_name: fileUploadResult?.data?.file_name || "",
    });
    setMessageValue("");
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

  const getMessageInfo = (chatData, userDetails) => {
    if (chatData?.type.toLowerCase() === "system") {
      return null;
    }
    if (
      chatData?.id === userDetails?.id &&
      chatData?.type.toLowerCase() === userDetails?.user_type.toLowerCase()
    ) {
      return true;
    }
    return false;
  };

  const renderHorizontalLine = () => {
    return <View style={styles.horizontalLine} />;
  };

  const uploadImageToServer = ({ uploadedFile }) => {
    const formData = new FormData();
    formData.append("file", uploadedFile);
    handleFileUpload({
      file: formData,
    });
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

  const handleUpload = (uploadedFile) => {
    handleFileUpload({
      file: uploadedFile,
    });
  };

  const preprocessMessages = (messages) => {
    const dateFlags = {};
    messages.forEach((msg) => {
      const dateKey = formatDate(new Date(msg.created_at));
      dateFlags[dateKey] = (dateFlags[dateKey] || 0) + 1;
    });

    messages.forEach((msg, index) => {
      const dateKey = formatDate(new Date(msg.created_at));
      dateFlags[dateKey]--;
      if (dateFlags[dateKey] === 0) {
        messages[index].dateFlag = getDateFlagMobile(msg.created_at);
      }
    });
    return messages;
  };

  const processedMessages = preprocessMessages(data);

  const renderMessagesSection = ({ item, index }) => {
    const issender = getMessageInfo(item?.author, userDetails);
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
            <MessageInfoComponent
              assigneName={item?.author?.name}
              message={item?.message}
            />
          )}
          <MessageComponent
            isSender={issender}
            data={item}
            userDetails={userProfileDetails?.userDetails}
            details={details}
            index={index}
            shouldShowAvatar={shouldShowAvatar}
          />
          {!!item.dateFlag && isMob && (
            <View style={styles.flagContainer}>
              {renderHorizontalLine()}
              <CommonText customTextStyle={styles.messageFlag}>
                {item.dateFlag}
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
        <TwoRow
          topSection={
            !isMob && (
              <>
                {!!details?.query && (
                  <MessageComponent
                    isQueryMessage={true}
                    userDetails={userProfileDetails?.userDetails}
                    details={details}
                  />
                )}
              </>
            )
          }
          isBottomFillSpace
          bottomSection={
            <FlatList
              showsVerticalScrollIndicator={false}
              ListFooterComponent={
                isMob && (
                  <>
                    {!!details?.query && (
                      <MessageComponent
                        isQueryMessage={true}
                        userDetails={userProfileDetails?.userDetails}
                        details={details}
                      />
                    )}
                  </>
                )
              }
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
        />
      }
      isTopFillSpace
      topSectionStyle={styles.messageSection}
      bottomSectionStyle={styles.inputSection}
      bottomSection={
        <>
          {renderError()}
          {!!details?.assigned_to && (
            <FormWrapper onSubmit={handleSend}>
              <CustomTextInput
                customStyle={styles.cutomTextInput}
                customTextInputOuterContainer={
                  styles.customTextInputOuterContainer
                }
                isSendButton
                initiateFileUpload={initiateFileUpload}
                imageUrl={fileUploadResult?.data?.url}
                maxLength={MESSAGE_MAX_LENGTH}
                onChangeText={(val) => handleInputChange(val)}
                onClickAttachement={isMob ? handleUpload : uploadImageToServer}
                onClickSend={handleSend}
                placeholder={intl.formatMessage({ id: "label.type_message" })}
                value={messageValue}
                setFile={setFile}
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
  fileUploadResult: {},
  fileUploadError: "",
  handleFileUpload: () => {},
  handleSendButton: () => {},
  handleLoadMore: () => {},
  isFirstPageReceived: true,
  initiateFileUpload: () => {},
  loadingMore: false,
  userDetails: {},
};

ChatSection.propTypes = {
  allDataLoaded: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  details: PropTypes.object,
  fileUploadResult: PropTypes.object,
  fileUploadError: PropTypes.string,
  handleFileUpload: PropTypes.func.isRequired,
  handleSendButton: PropTypes.func.isRequired,
  handleLoadMore: PropTypes.func.isRequired,
  isFirstPageReceived: PropTypes.bool.isRequired,
  initiateFileUpload: PropTypes.func.isRequired,
  loadingMore: PropTypes.bool.isRequired,
  userDetails: PropTypes.object,
};

export default ChatSection;
