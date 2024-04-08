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
    selectedExperience,
    selectedCurrentSalary,
    selectedFunctionalAreas,
    selectedCategory,
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
    selectedExperience,
    selectedCurrentSalary,
    selectedFunctionalAreas,
    selectedCategory,
  };
};

export default useFilterModal;
