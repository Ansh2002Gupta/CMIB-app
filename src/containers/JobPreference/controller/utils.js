export const JobPreferences_keys = {
    INDUSTRY_PREFERENCE: 'industry_preference',
    FUNCTIONAL_AREA_PREFERENCE: 'functional_area_preference',
};

const createModuleOptions = (module, contact) => {
  console.log("module",module, "contact", contact)
  console.log({
    label: module.name,
    name: module.name,
    value: module.name,
    isSelected: contact?.includes(module.name) ?? false,
    selectedIndex: null,
  })
  return {
    label: module.name,
    name: module.name,
    value: module.name,
    isSelected: contact?.includes(module.name),
    selectedIndex: null,
  };
};

export const updateDropDownOptions = (apiResponse, state, index, key, details) => {

    const updatedState = state.map((group, index_) => {
      if (index_ === index) {
        return group.map((field) => {
          if (field.key === key) {
            return {
              ...field,
              options: apiResponse?.map((area) => {
                return createModuleOptions(
                  area,
                  details
                );
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
