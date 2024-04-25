import React from "react";
import { useTheme } from "@unthinkable/react-theme";
import { useLocation, useNavigate, useParams } from "../../routes";
import { View, useWindowDimensions } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import getBreadCrumbDetails from "../../constants/breadCrumbHelpers";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import { navigations } from "../../constants/routeNames";
import { urlService } from "../../services/urlService";
import { EDIT } from "../../constants/constants";
import getTheme from "./Breadcrumbs.style";
import useIsWebView from "../../hooks/useIsWebView";

const Breadcrumbs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const styles = getTheme(theme);
  const { isWebView } = useIsWebView();
  const { job_id, id, centerId, companyId, roundId } = useParams();
  const windowDimensions = useWindowDimensions();
  const isMdOrGreater = windowDimensions.width >= 900;
  const { currentModule } = useGetCurrentUser();

  const handleNavigation = (val) => {
    navigate(val);
  };

  let isLastElement;

  const getStyles = (index) => {
    isLastElement = breadcrumbs.length - 1 === index;
    if (isLastElement) {
      return styles.disabled;
    }
    return styles.enabled;
  };

  const breadcrumbs = getBreadCrumbDetails({
    path: location.pathname,
    isEditMode: urlService.getQueryStringValue("mode") === EDIT,
    params: { job_id, id, centerId, companyId, roundId },
    currentModule,
  });

  const isBreadcrumbLocation = (pathname) => {
    return (
      pathname === `${navigations.TICKETS}/${navigations.TICKETS_VIEW_EDIT}` ||
      pathname ===
        `/${currentModule}/${navigations.ROUND_ONE}/${navigations.CAMPUS_INTERVIEW_MANAGEMENT}` ||
      pathname ===
        `/${currentModule}/${navigations.ROUND_ONE}/${navigations.CONSENT_MARKING_MANAGEMENT}` ||
      (pathname === navigations.COMPANY_PROFILE && isMdOrGreater) ||
      pathname ===
        `/${currentModule}/${navigations.JOB_APPLICANTS}/${job_id}/applicant-details/${id}` ||
      pathname ===
        `/${currentModule}/${navigations.ROUND_ONE}/${navigations.CENTRE_WISE_COMPANY}/${navigations.COMPANY_DETAILS}/${roundId}/${centerId}/${companyId}` ||
      pathname ===
        `/${currentModule}/${navigations.ROUND_TWO}/${navigations.CENTRE_WISE_COMPANY}/${navigations.COMPANY_DETAILS}/${roundId}/${centerId}/${companyId}` ||
      pathname ===
        `/${currentModule}/${navigations.ROUND_ONE}/${navigations.CENTRE_WISE_COMPANY}/${roundId}` ||
      pathname ===
        `/${currentModule}/${navigations.ROUND_TWO}/${navigations.CENTRE_WISE_COMPANY}/${roundId}`
    );
  };

  return (
    <>
      {isWebView && isBreadcrumbLocation(location.pathname) && (
        <View style={styles.container}>
          {breadcrumbs.map((crumb, index) => {
            const buttonStyles = getStyles(index);
            return (
              <CustomTouchableOpacity
                key={crumb.label}
                disabled={isLastElement}
                style={styles.container}
                onPress={() => handleNavigation(crumb.path)}
              >
                <CommonText customTextStyle={buttonStyles}>
                  {crumb.label}
                </CommonText>
                {!isLastElement && (
                  <CommonText customTextStyle={styles.slashStyles}>
                    /
                  </CommonText>
                )}
              </CustomTouchableOpacity>
            );
          })}
        </View>
      )}
    </>
  );
};

export default Breadcrumbs;
