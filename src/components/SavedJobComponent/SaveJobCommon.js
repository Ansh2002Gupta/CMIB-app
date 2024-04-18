export const LocationConfig = (data) => {
  return data.map((location) => location?.name || location?.city).join("/");
};
