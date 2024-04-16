export const JobPreferences_keys = {
  INDUSTRY_PREFERENCE: "industry_preference",
  FUNCTIONAL_AREA_PREFERENCE: "functional_area_preference",
};

const createModuleOptions = (module, contact) => {
  return {
    id: module.id || 0,
    label: module.name,
    name: module.name,
    value: module.name,
    isSelected: contact?.includes(module.name),
    selectedIndex: null,
  };
};

export const updateDropDownOptions = (
  apiResponse,
  state,
  index,
  key,
  details
) => {
  const updatedState = state.map((group, index_) => {
    if (index_ === index) {
      return group.map((field) => {
        if (field.key === key) {
          return {
            ...field,
            options: apiResponse?.map((area) => {
              return createModuleOptions(area, details);
            }),
          };
        }
        return field;
      });
    }
    return group;
  });
  return updatedState;
};

export const formatJobPreferenceData = (data) => {
  return {
    posting_anywhere_in_india: data?.posting_anywhere_in_india ?? undefined,
    transferable_post_acceptable:
      data?.transferable_post_acceptable ?? undefined,
    posting_outside_india: data?.posting_outside_india ?? undefined,
    preferred_region: data?.preferred_region ?? null,
    expected_annual_salary: data?.expected_annual_salary ?? null,
    industry_preference: data?.industry_preference ?? [],
    functional_area_preference: data?.functional_area_preference ?? [],
    cv_path: data?.cv_path ?? "",
    job_photo_path: data?.job_photo_path ?? "",
    introduction_video_path: data?.introduction_video_path ?? "",
  };
};
