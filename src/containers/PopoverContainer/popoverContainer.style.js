import colors from '../../assets/colors';
const styles = {
  mainContainer: {
    margin: 24,
    backgroundColor: colors.white,
    borderRadius: 20,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    minWidth: 200,
  },
  profileImageStyle: {
    height: 50,
    width: 50,
  },
  imageContainerStyle: {
    backgroundColor: 'white',
    borderRadius: 200,
    borderWidth: 0,
    alignItems: 'flex-start',
  },
  topSectionStyle: {
    gap: 5,
    borderBottomWidth: 0.5,
    padding: 16,
    borderColor: colors.lightGrey,
  },
  middleSectionStyle: {
    padding: 16,
    borderColor: colors.lightGrey,
    borderBottomWidth: 0.5,
    gap: 16,
  },
  bottomSectionStyle: { padding: 16 },
  itemContainerStyle: { alignItems: 'center', gap: 8 },
  imageStyle: {
    height: 15,
    width: 15,
    cursor: 'pointer',
  },
};
export default styles;
