import { StyleSheet } from '@unthinkable/react-core-components';

const Styles = (currentBreakpoint) => StyleSheet.create({
  rightSectionStyle: {
    flex: currentBreakpoint === 'md' ? 7 : 8,
  },
  leftSectionStyle: {
    flex: currentBreakpoint === 'md' ? 3 : 2,
    overflow:'hidden'
  },
  topSectionStyle: {
    flex: 1,
  },
  bottomSectionStyle: {
    flex: 9,
  },
  modalStyle:{
    justifyContent: "flex-start",
    margin: 0,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  sideBarSection:{
     flex: 1,
  }
});

export default Styles;
