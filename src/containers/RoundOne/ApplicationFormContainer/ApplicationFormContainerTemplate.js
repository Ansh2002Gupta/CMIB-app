import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import { TwoRow } from "../../../core/layouts";

import ApplicationFormStepper from "../ApplicationFormStepper";
import CompanyProfile from "./CompanyProfileForm/CompanyProfileForm";
import CustomButton from "../../../components/CustomButton";
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
import useNavigateScreen from "../../../services/hooks/useNavigateScreen";
import { urlService } from "../../../services/urlService";
import { SideBarContext } from "../../../globalContext/sidebar/sidebarProvider";
import { useParams } from "react-router";
import {
  API_VERSION_QUERY_PARAM,
  FORM_STATES,
  PAGINATION_PROPERTIES,
  SESSION_ID_QUERY_PARAM,
  UPDATED_API_VERSION,
} from "../../../constants/constants";
import useFetch from "../../../hooks/useFetch";
import images from "../../../images";
import { getValidMode } from "../../../utils/validation";
import { View } from "@unthinkable/react-core-components";

const ApplicationFormContainerTemplate = ({ activeStep, onHandleTab }) => {
  const [sideBarState] = useContext(SideBarContext);
  const sessionId = sideBarState?.selectedSession?.value;
  const { currentModule } = useGetCurrentUser();
  const [isEditable, setIsEditable] = useState();
  const { navigateScreen } = useNavigateScreen();
  const [applicationFormData, setApplicationFormData] = useState(null);

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
          isSubmitted: newData?.application_form?.is_submitted,
        });
      }
    };
    fetchData();
  }, [sessionId, currentModule]);

  useEffect(() => {
    if (applicationFormData) {
      if (!applicationFormData?.isSubmitted) {
        urlService.setQueryStringValue(
          PAGINATION_PROPERTIES?.MODE,
          FORM_STATES.EDITABLE
        );
        setIsEditable(true);
      } else {
        if (
          getValidMode(
            urlService.getQueryStringValue(PAGINATION_PROPERTIES?.MODE)
          )
        ) {
          if (
            urlService.getQueryStringValue(PAGINATION_PROPERTIES?.MODE) ===
            FORM_STATES.EDITABLE
          ) {
            urlService.setQueryStringValue(
              PAGINATION_PROPERTIES?.MODE,
              FORM_STATES.EDITABLE
            );
            setIsEditable(true);
          } else {
            urlService.setQueryStringValue(
              PAGINATION_PROPERTIES?.MODE,
              FORM_STATES.VIEW_ONLY
            );
            setIsEditable(false);
          }
        } else {
          urlService.setQueryStringValue(
            PAGINATION_PROPERTIES?.MODE,
            FORM_STATES.VIEW_ONLY
          );
          setIsEditable(false);
        }
      }
    }
  }, [applicationFormData?.isSubmitted]);

  const renderEditButton = ({ handleButtonClick }) => {
    return (
      <CustomButton
        iconLeft={{ leftIconSource: images.iconEdit }}
        onPress={handleButtonClick}
      >
        {intl.formatMessage({ id: "label.edit" })}
      </CustomButton>
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

  const handleEditClick = () => {
    urlService.setQueryStringValue(
      PAGINATION_PROPERTIES?.MODE,
      FORM_STATES.EDITABLE
    );
    setIsEditable(true);
  };

  const handleCancel = (val) => {
    if (applicationFormData?.isSubmitted) {
      urlService.setQueryStringValue(
        PAGINATION_PROPERTIES?.MODE,
        FORM_STATES.VIEW_ONLY
      );
      setIsEditable(val);
      return;
    }
    navigateScreen(-1);
  };

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
              webActionButton={
                !isEditable && (
                  <View>
                    {renderEditButton({ handleButtonClick: handleEditClick })}
                  </View>
                )
              }
            />
          }
          bottomSection={
            <ActiveTabComponent
              tabHandler={onHandleTab}
              isEditable={isEditable}
              setIsEditable={handleCancel}
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
