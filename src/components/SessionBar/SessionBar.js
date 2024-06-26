import React, { useContext, useState, useRef } from "react";
import { useIntl } from "react-intl";
import Storage from "../../services/cookie-and-storage-service";
import { MediaQueryContext, useTheme } from "@unthinkable/react-theme";

import CommonText from "../CommonText";
import CustomImage from "../CustomImage";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import SessionDropdown from "../SessionDropdown";
import useOutsideClick from "../../hooks/useOutsideClick";
import { setSelectedSession } from "../../globalContext/sidebar/sidebarActions";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import {
  CA_JOBS,
  NEWLY_QUALIFIED,
  SESSION_KEY,
} from "../../constants/constants";
import images from "../../images";
import getStyles from "./SessionBar.style";

const SessionBar = () => {
  const intl = useIntl();
  const theme = useTheme();
  const styles = getStyles(theme);
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const [sideBarState, sideBarDispatch] = useContext(SideBarContext);
  const { globalSessionList, selectedSession, selectedModule } = sideBarState;
  const [showDropdown, setShowDropdown] = useState(false);
  const sessionRef = useRef(null);
  useOutsideClick(sessionRef, () => setShowDropdown(false));

  const handleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleSelect = async (option) => {
    sideBarDispatch(setSelectedSession(option));
    await Storage.set({ key: SESSION_KEY, value: option?.value.toString() });
    handleDropdown();
  };

  return (
    <>
      {selectedModule.key !== CA_JOBS ? (
        <CustomTouchableOpacity
          style={styles.container}
          onPress={handleDropdown}
        >
          <CommonText customTextStyle={styles.sessionBarText}>
            {intl.formatMessage({ id: "label.sessions" })}&nbsp;&#58;&nbsp;
          </CommonText>
          <CommonText
            customTextStyle={styles.sessionText(currentBreakpoint)}
            fontWeight="600"
          >
            {selectedSession?.label ||
              intl.formatMessage({ id: "label.select_session" })}
          </CommonText>
          {selectedModule.key !== NEWLY_QUALIFIED && (
            <CustomImage
              source={images.iconArrowDown}
              style={styles.iconDown}
              isSvg={true}
              alt={"Arrow Down"}
            />
          )}
          {showDropdown && selectedModule.key !== NEWLY_QUALIFIED && (
            <SessionDropdown
              options={globalSessionList}
              onSelect={handleSelect}
              sessionRef={sessionRef}
              selectedItem={selectedSession?.label}
              valueField={"id"}
              labelField={"name"}
              includeAllKeys
            />
          )}
        </CustomTouchableOpacity>
      ) : null}
    </>
  );
};

export default SessionBar;
