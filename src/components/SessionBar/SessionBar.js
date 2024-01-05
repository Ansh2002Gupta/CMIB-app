import React, { useContext, useState, useRef, useEffect } from "react";
import { useIntl } from "react-intl";
import { MediaQueryContext } from "@unthinkable/react-theme";

import CommonText from "../CommonText";
import CustomImage from "../CustomImage";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import SessionDropdown from "../SessionDropdown";
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
    selectedModule.session[0].label
  );

  const sessionRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (sessionRef?.current && !sessionRef?.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  const handleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleSelect = (option) => {
    setSelectedValue(option);
    handleDropdown();
  };

  return (
    <CustomTouchableOpacity style={styles.container} onPress={handleDropdown}>
      <CommonText title={intl.formatMessage({ id: "label.sessions" })} />
      <CommonText
        title={selectedValue}
        customTextStyle={styles.sessionText(currentBreakpoint)}
      />
      <CustomImage source={images.iconArrowDown} style={styles.iconDown} isSvg={true} alt={"Arrow Down"} />
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
