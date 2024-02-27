import { useRef, useState } from "react";

const useFilterModal = (
  filterState,
  initialFilterState,
  onApplyFilter,
  setFilterState,
  setShowFilterOptions
) => {
  const { selectedStatus, selectedQueryType, activeCategories } = filterState;
  const [currentCategory, setCurrentCategory] = useState("Status");

  const prevFilterState = useRef(filterState);

  const onCancel = () => {
    setShowFilterOptions(false);
    setFilterState(prevFilterState.current);
  };

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
  };

  const handleStatusChange = (status) => {
    setFilterState((prevState) => {
      const newSelectedStatus = prevState.selectedStatus.includes(status.id)
        ? prevState.selectedStatus.filter((s) => s !== status.id)
        : [...prevState.selectedStatus, status.id];
      return { ...prevState, selectedStatus: newSelectedStatus };
    });
  };

  const handleQueryTypeChange = (queryType) => {
    setFilterState((prevState) => {
      const newSelectedQueryType = prevState.selectedQueryType.includes(
        queryType.id
      )
        ? prevState.selectedQueryType.filter((q) => q !== queryType.id)
        : [...prevState.selectedQueryType, queryType.id];
      return { ...prevState, selectedQueryType: newSelectedQueryType };
    });
  };

  const filterData = () => {
    onApplyFilter({ selectedStatus, selectedQueryType });
  };

  const handleClearFilter = () => {
    setFilterState(initialFilterState);
    onApplyFilter({ initialFilterState });
  };

  return {
    activeCategories,
    currentCategory,
    handleCategoryChange,
    handleStatusChange,
    handleQueryTypeChange,
    handleClearFilter,
    filterData,
    onCancel,
    selectedStatus,
    selectedQueryType,
  };
};

export default useFilterModal;
