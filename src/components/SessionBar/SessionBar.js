import React, { useContext, useState, useRef } from "react";
import { useIntl } from "react-intl";
import { MediaQueryContext } from "@unthinkable/react-theme";

import CommonText from "../CommonText";
import CustomImage from "../CustomImage";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import SessionDropdown from "../SessionDropdown";
import useOutsideClick from "../../hooks/useOutsideClick";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import images from "../../images";
import styles from "./SessionBar.style";

const SessionBar = () => {
  const intl = useIntl();
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const [sideBarState] = useContext(SideBarContext);
  const { selectedModule } = sideBarState;

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    selectedModule.session?.[0]?.label
  );

  const sessionRef = useRef(null);
  useOutsideClick(sessionRef, () => setShowDropdown(false));

  const handleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleSelect = (option) => {
    setSelectedValue(option);
    handleDropdown();
  };

  return (
    <CustomTouchableOpacity style={styles.container} onPress={handleDropdown}>
      <CommonText customTextStyle={styles.sessionBarText}>
        {intl.formatMessage({ id: "label.sessions" })}&nbsp;&#58;
      </CommonText>
      <CommonText
        customTextStyle={styles.sessionText(currentBreakpoint)}
        fontWeight="600"
      >
        {selectedValue}
      </CommonText>
      <CustomImage
        source={images.iconArrowDown}
        style={styles.iconDown}
        isSvg={true}
        alt={"Arrow Down"}
      />
      {showDropdown && (
        <SessionDropdown
          options={selectedModule.session}
          onSelect={handleSelect}
          sessionRef={sessionRef}
        />
      )}
    </CustomTouchableOpacity>
  );
};

export default SessionBar;
