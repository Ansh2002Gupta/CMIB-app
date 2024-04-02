export const validateFields = (
  workExperiences,
  setWorkExperiences,
  formError = {},
  setFormError = () => {},
  fieldName = null
) => {
  let isValid = true;
  let workExpData = workExperiences.map((workExp, workExpIndex) => {
    let expWithError = workExp.map((item) => {
      if (fieldName === null || fieldName === item.key) {
        let error = item.validate(item.value);
        if (error) {
          isValid = false;
          formError = {
            ...formError,
            [`${workExpIndex}:${item.key}`]: error,
          };
          return { ...item, error };
        } else {
          delete item.error;
        }
      }
      return item;
    });
    return expWithError;
  });

  setFormError && setFormError({ ...formError });
  setWorkExperiences && setWorkExperiences([...workExpData]);
  return isValid;
};
