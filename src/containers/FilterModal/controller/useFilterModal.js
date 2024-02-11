import { useRef } from "react";

const useFilterModal = (
  data,
  filterState,
  initialFilterState,
  onApplyFilter,
  setFilterState,
  setShowFilterOptions
) => {
  const { selectedStatus, selectedQueryType, activeCategories } = filterState;

  const prevFilterState = useRef(filterState);

  const onCancel = () => {
    setShowFilterOptions(false);
    setFilterState(prevFilterState.current);
  };

  const handleCategoryChange = (category) => {
    setFilterState((prevState) => {
      const { activeCategories } = prevState;
      if (activeCategories.includes(category)) {
        return {
          ...prevState,
          activeCategories: activeCategories.filter((c) => c !== category),
        };
      }
      return {
        ...prevState,
        activeCategories: [...activeCategories, category],
      };
    });
  };

  const handleStatusChange = (status) => {
    setFilterState((prevState) => {
      const newSelectedStatus = prevState.selectedStatus.includes(status.id)
        ? prevState.selectedStatus.filter((s) => s !== status.id)
        : [...prevState.selectedStatus, status.id];
      return { ...prevState, selectedStatus: newSelectedStatus };
    });
    console.log("handleStatusChange", status.id);
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
  };

  return {
    activeCategories,
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
