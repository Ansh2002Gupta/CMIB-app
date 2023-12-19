import colors from '../../assets/colors';

const style = {
  initialsContainer: {
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 200,
    alignItems: 'center',
    // height: 104,
    // width: 104,
    borderWidth: 0.5,
    borderColor: colors.lightGrey,
    position: 'relative',
  },
  editProfileContainer: {
    alignSelf: 'center',
    height: 152,
    width: 152,
    marginTop: 32,
    marginBottom: 32,
  },
  profileImageStyle: {
    width: 104,
    height: 104,
    borderRadius: 52,
  },
  modalProfileImage: {
    width: 152,
    height: 152,
    borderRadius: 76,
  },
  initialsText: {
    fontSize: 14,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    cursor: 'pointer',
  },
};

export default style;
