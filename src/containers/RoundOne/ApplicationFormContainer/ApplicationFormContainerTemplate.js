import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import { TwoRow } from "../../../core/layouts";

import ApplicationFormStepper from "../ApplicationFormStepper";
import CompanyProfile from "./CompanyProfileForm/CompanyProfileForm";
import JobDetails from "./JobDetails";
import PreInterviewPreferences from "./PreInterviewPreferences";
import CustomScrollView from "../../../components/CustomScrollView";
import CentralDetailsForm from "./CentralDetailsForms/CentralDetailsForms";
import PaymentForm from "./PaymentForm";
import BillingInfo from "./BIllingInfo/BillingInfo";
import {
  ROUNDS,
  ROUND_ONE_BOARD,
  USER_TYPE_COMPANY,
} from "../../../services/apiServices/apiEndPoint";
import useGetCurrentUser from "../../../hooks/useGetCurrentUser";
import { SideBarContext } from "../../../globalContext/sidebar/sidebarProvider";
import { useParams } from "react-router";
import {
  API_VERSION_QUERY_PARAM,
  SESSION_ID_QUERY_PARAM,
  UPDATED_API_VERSION,
} from "../../../constants/constants";
import useFetch from "../../../hooks/useFetch";
import CustomTouchableOpacity from "../../../components/CustomTouchableOpacity";
import CardComponent from "../../../components/CardComponent";
import CustomImage from "../../../components/CustomImage";
import CommonText from "../../../components/CommonText";

const ApplicationFormContainerTemplate = ({ activeStep, onHandleTab }) => {
  const [sideBarState] = useContext(SideBarContext);
  const sessionId = sideBarState?.selectedSession?.value;
  const { currentModule } = useGetCurrentUser();
  const [applicationFormData, setApplicationFormData] = useState({
    isEditable: true,
    isFilled: false,
  });

  const intl = useIntl();
  const { id } = useParams();

  const { fetchData: fetchCardsDetails } = useFetch({
    url:
      USER_TYPE_COMPANY +
      `/${currentModule}` +
      ROUNDS +
      `/${id}` +
      `${ROUND_ONE_BOARD}?${SESSION_ID_QUERY_PARAM}=${sessionId}`,
    apiOptions: {
      headers: {
        [API_VERSION_QUERY_PARAM]: UPDATED_API_VERSION,
      },
    },
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      if (currentModule && sessionId) {
        const newData = await fetchCardsDetails();
        setApplicationFormData({
          isEditable: newData?.application_form?.is_editable,
          isFilled: newData?.application_form?.is_filled,
        });
      }
    };
    fetchData();
  }, [sessionId, currentModule]);

  const renderEditButton = ({ handleButtonClick, buttonTitle }) => {
    return (
      <CustomTouchableOpacity onPress={handleButtonClick}>
        <></>
      </CustomTouchableOpacity>
    );
  };

  let tabConfig = [
    {
      component: CompanyProfile,
    },
    {
      component: JobDetails,
    },
    {
      component: PreInterviewPreferences,
    },
    {
      component: CentralDetailsForm,
    },
    {
      component: BillingInfo,
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
              // webActionButton={() => renderEditButton()}
            />
          }
          bottomSection={
            <ActiveTabComponent
              tabHandler={onHandleTab}
              isEditable={applicationFormData?.isEditable}
            />
          }
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
