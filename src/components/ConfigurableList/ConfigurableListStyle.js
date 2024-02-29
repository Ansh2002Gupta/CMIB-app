import { StyleSheet } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const {white, black, lightGray, darkGrey} = colors;

const styles = StyleSheet.create({
  outerContainer: {
    color: black,
    backgroundColor: white,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  componentContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 2,
    margin: 10,
    borderRadius: 7,
    borderColor: lightGray,
    borderWidth: 2,
    width: 300,
  },
  titleStyles: {
    fontWeight: 600,
    fontSize: 16,
    fontFamily: 'General Sans',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomColor: lightGray,
    borderBottomWidth: 2, 
    padding: 16,
    gap: 30,
  },
  buttonStyles: {
    borderWidth: 0,
    marginRight: 5,
    borderColor: white,
    backgroundColor: white,
    fontWeight: 100,
    fontSize: 28,
  },
  
  section: {
    display: 'flex',
    flexDirection: 'column',
  },

  itemsWrapper: {
    backgroundColor: white,
    maxHeight: 250,
    overflow: 'scroll',
  },

  outerSearchWrapper: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  searchInput: {
    width: '100%',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 56,
    paddingRight: 56,
    borderRadius: 0,
    outline: 'none',
  },

  iconSearch: {
    position: 'absolute',
    top: 15,
    left: 30,
  },

  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: white,
    padding: 8,
    gap: 15,
  },
  item: {
    paddingLeft: 12,
    paddingRight: 12,
    fontSize: 14,
    fontWeight: 500,
    fontColor: darkGrey,
  },
  trashIcon: {
    marginRight: 10, 
    width: 20, 
    height: 20,
  },
  addIcon: { 
    width: 20, 
    height: 20,
  },
  message: {
    textAlign: 'center',
    fontWeight: 500,
    color: darkGrey,
  }
});

export default styles;