import { StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const baseMessageContainer = {
  padding: 16,
  borderWidth: 1,
  borderBottomLeftRadius: 16,
  borderBottomRightRadius: 16,

  maxWidth: 680,
  marginTop: 4,
};

const styles = StyleSheet.create({
  senderMessageStyle: {
    backgroundColor: colors.backgroundSecondGrey,
    borderColor: colors.lightGrey,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 2,
    ...baseMessageContainer,
  },
  recieverMessageStyle: {
    backgroundColor: colors.white,
    borderColor: colors.lightGrey,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 16,
    ...baseMessageContainer,
  },
  senderContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    margin: 10,
  },
  recieverContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    margin: 10,
  },
  senderMessageArea: {
    alignItems: "flex-end",
    marginRight: 8,
  },
  reciverMessageArea: {
    alignItems: "flex-start",
    marginLeft: 8,
  },
  avatar: {
    marginTop: 20,
    height: 32,
    width: 32,
  },
  textSize: {
    fontSize: 14,
  },
});

export default styles;
