import { Dimensions } from "@unthinkable/react-core-components";

const deviceHeight = Dimensions.get("window").height;
const maxHeightPercentage = 0.8;
const minHeightThreshold = 500;
export const maxModalHeight = deviceHeight * maxHeightPercentage;

const getModalHeight = () => {
  let modalHeight = maxModalHeight;

  if (deviceHeight < minHeightThreshold) {
    modalHeight = minHeightThreshold;
  }
  return modalHeight;
};

export default getModalHeight;
