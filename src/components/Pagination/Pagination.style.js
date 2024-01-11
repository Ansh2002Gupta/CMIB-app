import { StyleSheet , Dimensions} from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const {width:WIDTH} = Dimensions.get('window');

const styles = StyleSheet.create({
  pagination: {
    borderRadius: 2,
    alignItems: "center",
    flexDirection: "row",
    justifyContent:"space-between"
  },
  paginationRange: {
    flexDirection: "row",
    marginLeft: 16,
    marginRight: 16,
    alignItems: "center",
  },
  previousText: {
    fontSize: 14,
    marginRight: 8,
  },
  activeText: {
    fontSize: 14,
    color: colors.darkBlue,
  },
  inActiveText: {
    fontSize: 14,
    color: colors.darkGrey,
  },
  activeButton: {
    paddingLeft: 12,
    paddingRight: 12,
    width:36,
    paddingTop: 8,
    paddingBottom: 8,
    borderColor: colors.darkBlue,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: colors.secondaryGrey,
  },
  inActiveButton: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  dotsStyles:{
    marginHorizontal:5
  }
});

export default styles;
