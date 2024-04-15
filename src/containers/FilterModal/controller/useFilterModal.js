import { useRef, useState } from "react";

const useFilterModal = ({
  defaultCategory,
  filterInfo,
  filterState,
  initialFilterState,
  onApplyFilter,
  setFilterState,
  setShowFilterOptions,
}) => {
  const [currentCategory, setCurrentCategory] = useState(
    defaultCategory || "Status"
  );
  const prevFilterState = useRef(filterState);

  const onCancel = () => {
    setShowFilterOptions(false);
    setFilterState(prevFilterState.current);
  };

  const handleCategoryChange = (category) => {
    setCurrentCategory(String(category));
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
    currentCategory,
    filterData,
    handleCategoryChange,
    handleClearFilter,
    onCancel,
  };
};

export default useFilterModal;
