import { StyleSheet, Platform } from "@unthinkable/react-core-components";

const baseLayoutStyle = {
  ...Platform.select({
    web: {
      height: "100vh",
      overflowY: "auto",
    },
  }),
};

const Styles = (currentBreakpoint, isAuthenticated) =>
  StyleSheet.create({
    rightSectionStyle: {
      minWidth: currentBreakpoint === "md" ? "70%" : "80%",
      flex: currentBreakpoint === "md" ? 7 : 8,
      ...(isAuthenticated ? baseLayoutStyle : {}),
    },
    leftSectionStyle: {
      minWidth: currentBreakpoint === "md" ? "30%" : "20%",
      flex: currentBreakpoint === "md" ? 3 : 2,
      ...(isAuthenticated ? baseLayoutStyle : {}),
    },
    topSectionStyle: {
      flex: 1,
    },
    bottomSectionStyle: {
      flex: 9,
    },
    modalStyle: {
      justifyContent: "flex-start",
      margin: 0,
      zIndex: 2,
    },
    bottomBar: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
    },
    sideBarSection: {
      flex: 1,
    },
  });

export default Styles;
