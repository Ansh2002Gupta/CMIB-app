import React from "react";
import { ScrollView, Text, View } from "@unthinkable/react-core-components";
import ChipSection from "./components/chipSection";
import Description from "./components/description";
import About from "./components/About";
import useIsWebView from "../../hooks/useIsWebView";
import JobDetailHeader from "./components/JobDetailHeader/JobDetailHeader";
import styles from "./styles";
import CustomButton from "../../components/CustomButton";
import { useIntl } from "react-intl";
import images from "../../images";

const PostedJobsTemplate = ({ details, handleOpenModal, handleSaveRemove }) => {
  const intl = useIntl();
  const { isWebView } = useIsWebView();
  const {
    jobDescription: { summary = "", data = [] },
    functionalAreas,
    companyDetail,
    headerData,
  } = details;

  const is_applied = true;
  const is_saved = true;

  const otherDetails = functionalAreas?.length ? (
    <View style={styles.otherDetailsStyle}>
      <ChipSection
        headerText={intl.formatMessage({ id: "label.functionalAreas" })}
        data={functionalAreas}
        style={{
          ...(!isWebView
            ? styles.otherDetailItemWeb
            : styles.otherDetailItemMobile),
        }}
      />
    </View>
  ) : null;

  const aboutSection = (
    <About details={companyDetail} style={!isWebView && styles.aboutMobile} />
  );

  const actionButtons = (
    <View style={styles.actionButtons}>
      <CustomButton
        iconLeft={{
          leftIconSource: !is_saved
            ? images.iconArchiveSave
            : images.iconSingleSave,
        }}
        onPress={handleSaveRemove}
        style={{
          ...(isWebView ? styles.buttonStyleWeb : styles.buttonStyleMobile),
          ...styles.saveButtonStyle,
        }}
      >
        <Text>
          {intl.formatMessage({
            id: !is_saved ? "label.save" : "label.remove",
          })}
        </Text>
      </CustomButton>
      <CustomButton
        disabled={is_applied}
        disabledStyle={styles.disabledStyle}
        onPress={handleOpenModal}
        style={{
          ...(isWebView ? styles.buttonStyleWeb : styles.buttonStyleMobile),
        }}
        withGreenBackground={!is_applied}
      >
        <Text>
          {intl.formatMessage({
            id: !is_applied ? "label.apply" : "label.applied",
          })}
        </Text>
      </CustomButton>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <JobDetailHeader
          actionButtons={isWebView && actionButtons}
          data={headerData}
        />
        <View style={styles.detailSection}>
          <View style={styles.jobDescriptionContainer}>
            <View style={styles.descriptionContainer}>
              <Description
                style={styles.description}
                title={intl.formatMessage({ id: "label.jobDescription" })}
                description={summary}
                data={data}
              />
            </View>
            {isWebView && otherDetails}
          </View>
          {!isWebView && (
            <View style={styles.otherDetailMobile}>{otherDetails}</View>
          )}
          {isWebView && <View style={styles.aboutSection}>{aboutSection}</View>}
        </View>
        {!isWebView && aboutSection}
      </ScrollView>
      {!isWebView ? actionButtons : null}
    </View>
  );
};

export default PostedJobsTemplate;
