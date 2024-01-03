import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";
import { MediaQueryContext } from "@unthinkable/react-theme";

import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import CommonText from "../CommonText";
import Dropdown from "../Dropdown";
import styles from "./SessionBar.style";

const SessionBar = () => {
  const [sideBarState] = useContext(SideBarContext);
  const { selectedModule } = sideBarState;
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const [selectedValue, setSelectedValue] = useState(selectedModule.session[0]);

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <View style={styles.container}>
      <CommonText title={"Sessions :"} />
      <Dropdown
        data={selectedModule.session}
        onChange={handleChange}
        value={selectedValue}
        dropdownStyle={styles.sessionText(currentBreakpoint)}
      />
    </View>
  );
};

SessionBar.propTypes = {
  items: PropTypes.array.isRequired,
};

export default SessionBar;
