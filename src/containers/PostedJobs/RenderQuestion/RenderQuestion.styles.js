import { StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../../assets/colors";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 1,
    marginTop: 0,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 24,
    paddingTop: 6.5,
    marginBottom: 24,
    borderColor: colors.lightGrey,
    borderRadius: 8,
    justifyContent: "center",
  },
  questionViewStyle: {
    alignItems: "center",
  },
  questionIconStyle: {
    height: 16,
    width: 24,
  },
  innerContainerStyle: {
    flexDirection: "row",
    flex: 1,
    paddingBottom: 24,
  },
  questionNumberViewStyle: {
    backgroundColor: colors.secondaryGrey,
    height: 48,
    width: 44,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  questionNumberTextStyle: {
    fontSize: 14,
  },
  questionInputStyle: {
    flex: 2.45,
    marginLeft: 16,
  },
  questionTypeStyle: {
    flex: 0.8,
    marginLeft: 24,
  },
  paddingBottomStyle: {
    paddingBottom: 24,
  },
  optionViewStyle: {
    flex: 2.3,
    marginLeft: 16,
  },
  buttonViewStyle: {
    flex: 0.74,
    marginLeft: 24,
    flexDirection: "row",
  },
  copyIconStyle: {
    height: 24,
    width: 24,
  },
  redCrossStyle: {
    marginLeft: 28,
    height: 12,
    width: 12,
  },
  crossStyle: {
    marginLeft: 28,
    height: 16,
    width: 16,
  },
  addOptionButtonStyle: {
    width: 135,
  },
  thirdContainerStyle: {
    paddingTop: 24,
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: colors.lightGrey,
  },
  deleteQuestionStyle: {
    marginLeft: 24,
    height: 24,
    width: 24,
  },
  switchViewStyle: {
    flexDirection: "row",
    marginLeft: 24,
    borderLeftWidth: 1,
    paddingLeft: 24,
    borderColor: colors.lightGrey,
  },
  marginLeftStyle: {
    marginLeft: 8,
  },
});
export default styles;
