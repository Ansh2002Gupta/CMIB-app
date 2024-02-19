import { useRef } from "react";

const useFilterModal = (
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
      let updatedState = {};

      if (activeCategories.includes(category)) {
        updatedState.activeCategories = activeCategories.filter(
          (c) => c !== category
        );
        if (category.toLowerCase() === "status") {
          updatedState.selectedStatus = initialFilterState.selectedStatus;
        } else if (category.toLowerCase() === "query type") {
          updatedState.selectedQueryType = initialFilterState.selectedQueryType;
        }
      } else {
        updatedState.activeCategories = [...activeCategories, category];
      }

      return {
        ...prevState,
        ...updatedState,
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
