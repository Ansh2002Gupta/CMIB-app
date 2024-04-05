export const validateFields = (
  workExperiences,
  setWorkExperiences,
  formFieldsError = {},
  setFormError = () => {},
  fieldName = null,
  index
) => {
  let isValid = true;
  let workExpData = workExperiences?.map((workExp, workExpIndex) => {
    let expWithError = workExp?.map((item) => {
      if (
        fieldName === null ||
        (fieldName === item.key && workExpIndex === index)
      ) {
        let error = item?.validate(item.value);
        if (error) {
          isValid = false;
          formFieldsError[index] = {
            ...formFieldsError[index],
            [item.key]: error,
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

  setFormError && setFormError([...formFieldsError]);
  setWorkExperiences && setWorkExperiences([...workExpData]);
  return isValid;
};

export const validateCurrentStatus = (
  current_status,
  setCurrentStatus,
  formFieldsError = {},
  setFormError = () => {}
) => {
  let isValid = true;
  let currentStatusData = current_status?.map((row, index) => {
    return row?.map((item) => {
      if (item?.validate) {
        let error = item?.validate(item.value);
        if (error) {
          isValid = false;
          formFieldsError = {
            ...formFieldsError,
            [`${item.key}`]: error,
          };
          return { ...item, error };
        } else {
          delete item.error;
        }
      }
      return item;
    });
  });

  setFormError && setFormError({ ...formFieldsError });
  setCurrentStatus && setCurrentStatus([...currentStatusData]);
  return isValid;
};
