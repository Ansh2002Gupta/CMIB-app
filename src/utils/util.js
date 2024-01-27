export const getQueryParamsAsAnObject = (queryParamString) => {
  const queryParams = queryParamString.substring(1).split("&");
  return queryParams
    .map((param) => param.split("="))
    .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
};

export const getImageSource = (uploadedImage) => {
  if (uploadedImage && typeof uploadedImage === "string") {
    return uploadedImage;
  }
  if (uploadedImage) {
    return URL.createObjectURL(uploadedImage);
  }
  return "";
};

export const getRenderText = (items, keys) => {
  if (!keys.length) {
    return "";
  }
  return keys.map((key) => items[key]).join(" ");
};

export const removeFullStopsBetweenStrings = (errorMessages) => {
  const formattedMessages = errorMessages
    .map((message) => message.replace(/\.+$/, ""))
    .join(", ");
  return formattedMessages + ".";
};
