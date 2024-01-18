const useFilterModal = (
  data,
  filterState,
  initialFilterState,
  onApplyFilter,
  setFilterState
) => {
  const { selectedStatus, selectedQueryType, activeCategories } = filterState;

  const handleCategoryChange = (category) => {
    setFilterState((prevState) => {
      const { activeCategories } = prevState;
      if (activeCategories.includes(category)) {
        return {
          ...prevState,
          activeCategories: activeCategories.filter((c) => c !== category),
        };
      } else {
        return {
          ...prevState,
          activeCategories: [...activeCategories, category],
        };
      }
    });
  };

  const handleStatusChange = (status) => {
    setFilterState((prevState) => {
      const newSelectedStatus = prevState.selectedStatus.includes(status)
        ? prevState.selectedStatus.filter((s) => s !== status)
        : [...prevState.selectedStatus, status];
      return { ...prevState, selectedStatus: newSelectedStatus };
    });
  };

  const handleQueryTypeChange = (queryType) => {
    setFilterState((prevState) => {
      const newSelectedQueryType = prevState.selectedQueryType.includes(
        queryType
      )
        ? prevState.selectedQueryType.filter((q) => q !== queryType)
        : [...prevState.selectedQueryType, queryType];
      return { ...prevState, selectedQueryType: newSelectedQueryType };
    });
  };

  const filterData = () => {
    const filteredData = data.filter((item) => {
      return (
        (!selectedStatus.length || selectedStatus.includes(item.status)) &&
        (!selectedQueryType.length ||
          selectedQueryType.includes(item.query_type))
      );
    });
    onApplyFilter(filteredData);
  };

  const handleClearFilter = () => {
    setFilterState(initialFilterState);
  };

  return {
    selectedStatus,
    selectedQueryType,
    activeCategories,
    handleCategoryChange,
    handleStatusChange,
    handleQueryTypeChange,
    filterData,
    handleClearFilter,
  };
};

export default useFilterModal;
