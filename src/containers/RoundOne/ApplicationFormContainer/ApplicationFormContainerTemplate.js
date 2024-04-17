import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { ScrollView, View } from "@unthinkable/react-core-components";

import { TwoRow } from "../../../core/layouts";

import ApplicationFormStepper from "../ApplicationFormStepper";
import CompanyProfile from "./CompanyProfileForm/CompanyProfileForm";
import JobDetails from "./JobDetails";
import PreInterviewPreferences from "./PreInterviewPreferences";
import useNavigateScreen from "../../../services/hooks/useNavigateScreen";
import { navigations } from "../../../constants/routeNames";
import { SideBarContext } from "../../../globalContext/sidebar/sidebarProvider";
import images from "../../../images";
import styles from "./ApplicationFormContainer.style";
import CustomButton from "../../../components/CustomButton";
import CustomScrollView from "../../../components/CustomScrollView";

const ApplicationFormContainerTemplate = ({ activeStep, onHandleTab }) => {
  const [sideBarState] = useContext(SideBarContext);
  const intl = useIntl();
  const { navigateScreen } = useNavigateScreen();

  const renderStepContent = (step) => {
    switch (step) {
      case 1:
        return <JobDetails />;
      case 2:
        return <PreInterviewPreferences />;
      default:
        return null;
    }
  };

  const handleCancelClick = () => {
    const moduleKey = sideBarState.selectedModule.key;
    navigateScreen(`/${moduleKey}/${navigations.ROUND_ONE}`);
  };

  let tabConfig = [
    // {
    //   component: CompanyProfile,
    // },
    {
      component: JobDetails,
    },
  ];

  const activeTabIndex = Math.min(activeStep, tabConfig.length - 1);
  const { component: ActiveTabComponent } = tabConfig[activeTabIndex];

  return (
    <>
      <CustomScrollView style={{ flex: 1 }}>
        <TwoRow
          topSection={
            <ApplicationFormStepper
              headingText={intl.formatMessage({
                id: "label.add_application_form",
              })}
              activeStep={activeStep}
            />
          }
          bottomSection={<ActiveTabComponent tabHandler={onHandleTab} />}
          isBottomFillSpace
        />
      </CustomScrollView>
      <View style={styles.mainViewStyle}>
        <ApplicationFormStepper activeStep={activeStep} />
        {renderStepContent(activeStep)}
        <View style={styles.buttonContainer}>
          <CustomButton
            onPress={() => onHandleTab("prev")}
            iconLeft={{
              leftIconAlt: "left-arrow",
              leftIconSource: images.iconArrowLeft,
            }}
          >
            {intl.formatMessage({ id: "label.back" })}
          </CustomButton>
          <View style={styles.actionBtnContainer}>
            <CustomButton onPress={handleCancelClick}>
              {intl.formatMessage({ id: "label.cancel" })}
            </CustomButton>
            <CustomButton
              onPress={() => {
                onHandleTab("next");
              }}
              withGreenBackground
              iconRight={{
                rightIconAlt: "right-arrow",
                rightIconSource: images.iconArrowRightWhite,
              }}
            >
              {intl.formatMessage({ id: "label.save_and_next" })}
            </CustomButton>
          </View>
        </View>
      </View>
    </>
  );
};

ApplicationFormContainerTemplate.propTypes = {
  activeStep: PropTypes.number.isRequired,
  onHandleTab: PropTypes.func.isRequired,
};

export default ApplicationFormContainerTemplate;
