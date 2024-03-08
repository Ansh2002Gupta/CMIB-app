import React from "react";
import { View, useWindowDimensions } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import getBreadCrumbDetails from "../../constants/breadCrumbHelpers";
import { navigations } from "../../constants/routeNames";
import { useNavigate, useLocation } from "../../routes";
import styles from "./Breadcrumbs.style";

const Breadcrumbs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const windowDimensions = useWindowDimensions();
  const isMdOrGreater = windowDimensions.width >= 900;

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

  const breadcrumbs = getBreadCrumbDetails({ path: location.pathname });

  const isBreadcrumbLocation = (pathname) => {
    return (
      pathname === `${navigations.TICKETS}/${navigations.TICKETS_VIEW_EDIT}` ||
      (pathname === navigations.COMPANY_PROFILE && isMdOrGreater)
    );
  };

  return (
    <>
      {isBreadcrumbLocation(location.pathname) && (
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
