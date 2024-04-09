import { useRef, useState } from "react";

const useFilterModal = (
  filterState,
  initialFilterState,
  onApplyFilter,
  setFilterState,
  setShowFilterOptions,
  filterCategory,
  renderCalendar
) => {
  const { selectedStatus, selectedQueryType, activeCategories } = filterState;
  const [currentCategory, setCurrentCategory] = useState(filterCategory[0]);

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
    if (renderCalendar) {
      setFilterState((prevState) => {
        return { ...prevState, selectedQueryType: [queryType] };
      });
    } else {
      setFilterState((prevState) => {
        const newSelectedQueryType = prevState.selectedQueryType.includes(
          queryType.id
        )
          ? prevState.selectedQueryType.filter((q) => q !== queryType.id)
          : [...prevState.selectedQueryType, queryType.id];
        return { ...prevState, selectedQueryType: newSelectedQueryType };
      });
    }
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
