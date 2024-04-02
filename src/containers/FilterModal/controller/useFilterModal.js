import { useRef, useState } from "react";

const useFilterModal = (
  filterInfo,
  filterState,
  initialFilterState,
  onApplyFilter,
  setFilterState,
  setShowFilterOptions,
  defaultCategory
) => {
  const {
    selectedStatus,
    selectedWorkMode,
    selectedJobType,
    selectedExperience,
    selectedLocation,
    selectedSalary,
    selectedEducation,
    selectedDepartment,
    selectedCompany,
    selectedIndustry,
    selectedFreshness,
    selectedQueryType,
    activeCategories,
  } = filterState;
  const [currentCategory, setCurrentCategory] = useState(
    defaultCategory || "Status"
  );

  const prevFilterState = useRef(filterState);

  const onCancel = () => {
    setShowFilterOptions(false);
    setFilterState(prevFilterState.current);
  };

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
  };

  const filterData = () => {
    onApplyFilter(filterInfo);
  };

  const clearFilterState = (filterInfo) => {
    filterInfo = filterInfo?.map((filterObj) => {
      return { ...filterObj, selectedOptions: [] };
    });
    return filterInfo;
  };

  const handleClearFilter = () => {
    setFilterState(initialFilterState);
    onApplyFilter(clearFilterState(filterInfo));
  };

  return {
    activeCategories,
    currentCategory,
    handleCategoryChange,
    handleClearFilter,
    filterData,
    onCancel,
    selectedStatus,
    selectedWorkMode,
    selectedJobType,
    selectedExperience,
    selectedLocation,
    selectedSalary,
    selectedEducation,
    selectedDepartment,
    selectedCompany,
    selectedIndustry,
    selectedFreshness,
    selectedQueryType,
  };
};

export default useFilterModal;
