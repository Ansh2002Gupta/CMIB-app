import React, { useContext, useState } from "react";
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
import PaymentForm from "./PaymentForm";

const ApplicationFormContainerTemplate = ({ activeStep, onHandleTab }) => {
  const [sideBarState] = useContext(SideBarContext);
  const intl = useIntl();
  const { navigateScreen } = useNavigateScreen();
  const [isError, setIsError] = useState();
  const [isLoading, setIsLoading] = useState();

  const renderStepContent = (step) => {
    switch (step) {
      case 1:
        return <JobDetails />;
      case 2:
        return;
      default:
        return null;
    }
  };

  const updateParentState = ({
    isErrorChildState = false,
    isLoadingChildState = false,
  }) => {
    setIsError(isErrorChildState);
    setIsLoading(isLoadingChildState);
  };

  const handleCancelClick = () => {
    const moduleKey = sideBarState.selectedModule.key;
    navigateScreen(`/${moduleKey}/${navigations.ROUND_ONE}`);
  };

  let tabConfig = [
    // // {
    // //   component: CompanyProfile,
    // // },
    // // {
    // //   component: JobDetails,
    // },
    {
      component: PreInterviewPreferences,
    },
    {
      component: PaymentForm,
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
    </>
  );
};

ApplicationFormContainerTemplate.propTypes = {
  activeStep: PropTypes.number.isRequired,
  onHandleTab: PropTypes.func.isRequired,
};

export default ApplicationFormContainerTemplate;
