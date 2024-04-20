import { StyleSheet } from "@unthinkable/react-core-components";

import colors from "../../../assets/colors";

const styles = StyleSheet.create({
  main:{
    paddingTop: 24,
    paddingLeft: 24,
    paddingRight: 24,
    flex: 1,
  },
  cardContainer: {
    backgroundColor: colors.white,
    marginBottom: 16,
  },
  customToggleStyle: {
    marginTop: 20,
    marginBottom: 24,
    marginRight: 24,
  },
  gap: {
    marginTop: 24,
  },
  gridView: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    marginTop: 24,
  },
  extraStyle: {
    borderTopWidth: 1,
    borderColor: colors.lightGray,
    paddingTop: 24,
  },
  groupGridView: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    marginTop: 24,
  },
  groupTitleText: {
    fontSize: 14,
    color: colors.black,
  },
  mainContainer: {
    marginTop: 12,
  },
  textInputContainer: (isRightMargin) => ({
    marginRight: isRightMargin ? 16 : 0,
    marginBottom: 24,
  }),
  titleText: {
    fontSize: 16,
    color: colors.black,
  },
  //ArticleTraining Styling
  articleContainer: {
    paddingBottom: 24
  },
  articleTrainingTitleText: {
    fontSize: 14,
    color: colors.black,
    marginBottom: 16,
    marginTop: 16,
  },
  buttonStyle: {
    maxWidth: 206,
    maxHeight: 44,
  },
  deleteButton: {
    maxWidth: 20,
    maxHeight: 30,
    borderWidth: 0,
    alignSelf: 'flex-end'
  },
  //Industrial Training
  industrialContainer: {
    paddingBottom: 24,
    borderTopWidth: 1,
    borderColor: colors.lightGray
  },
});

export default styles;
