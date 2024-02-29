import { StyleSheet } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const styles = StyleSheet.create({
  outerContainer: {
    color: 'black',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  componentContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: lightGrey,
    padding: '2px',
    margin: 10,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 7,
  },
  titleStyles: {
    fontWeight: 600,
    fontSize: '16px',
    fontFamily: 'General Sans',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    borderBottom: '1px solid black',
    padding: '16px',
    gap: '210px',
  },
  buttonStyles: {
    borderWidth: '0px',
    marginRight: '5px',
    borderColor: 'white',
    backgroundColor: white,
    fontWeight: 100,
    fontSize: '28px',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
  },
  searchContainer: {
    position: 'relative',
    backgroundColor: 'blue',
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    padding: '0px 20px',
    backgroundColor: backgroundGrey,
  },
  searchInput: {
    backgroundColor: 'black',
    width: '100%',
    padding: '12px 16px',
    backgroundColor: backgroundGrey,
    outline: 'none',
    border: 'none',
  },
  searchIcon: {
    position: 'absolute',
    top: '9px',
    left: '14px',
    width: '20px',
    height: '20px',
    color: darkGrey,
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '0px 5px',
  },
  item: {
    padding: '16px 12px',
    fontSize: '14px',
    fontWeight: 500,
    fontColor: darkGrey,
  },
  trashIcon: {
    marginRight: '20px', 
    width: '20px', 
    height: '20px'
  },
  addIcon: { 
    width: '20px', 
    height: '20px'
  },
});

export default styles;