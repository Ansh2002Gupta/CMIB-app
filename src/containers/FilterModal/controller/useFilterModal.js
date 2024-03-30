import { useRef, useState } from "react";

const useFilterModal = (
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

  const handleStatusChange = (status) => {
    setFilterState((prevState) => {
      const newSelectedStatus = prevState.selectedStatus
        ? prevState.selectedStatus?.includes(status.id)
          ? prevState.selectedStatus.filter((s) => s !== status.id)
          : [...prevState.selectedStatus, status.id]
        : [];
      return { ...prevState, selectedStatus: newSelectedStatus };
    });
  };

  const handleQueryTypeChange = (queryType) => {
    setFilterState((prevState) => {
      const newSelectedQueryType = prevState.selectedQueryType
        ? prevState.selectedQueryType?.includes(queryType.id)
          ? prevState.selectedQueryType.filter((q) => q !== queryType.id)
          : [...prevState.selectedQueryType, queryType.id]
        : [];
      return { ...prevState, selectedQueryType: newSelectedQueryType };
    });
  };

  const handleWorkModeChange = (workMode) => {
    setFilterState((prevState) => {
      const newSelectedWorkMode = prevState.selectedWorkMode
        ? prevState.selectedWorkMode?.includes(workMode.id)
          ? prevState.selectedStatus.filter((s) => s !== workMode.id)
          : [...prevState.selectedWorkMode, workMode.id]
        : [];
      return {
        ...prevState,
        selectedWorkMode: newSelectedWorkMode,
      };
    });
  };

  const handleJobTypeChange = (jobType) => {
    setFilterState((prevState) => {
      const newSelectedJobType = prevState.selectedJobType
        ? prevState.selectedJobType?.includes(jobType.id)
          ? prevState.selectedJobType.filter((s) => s !== jobType.id)
          : [...prevState.selectedJobType, jobType.id]
        : [];
      return {
        ...prevState,
        selectedJobType: newSelectedJobType,
      };
    });
  };

  const handleExperienceChange = (experience) => {
    setFilterState((prevState) => {
      return {
        ...prevState,
        selectedExperience: experience,
      };
    });
  };

  const handleLocationChange = (location) => {
    setFilterState((prevState) => {
      const newSelectedLocation = prevState.selectedLocation
        ? prevState.selectedLocation?.includes(location.id)
          ? prevState.selectedLocation.filter((s) => s !== location.id)
          : [...prevState.selectedLocation, location.id]
        : [];
      return {
        ...prevState,
        selectedLocation: newSelectedLocation,
      };
    });
  };

  const handleSalaryChange = (salary) => {
    setFilterState((prevState) => {
      return {
        ...prevState,
        selectedSalary: salary,
      };
    });
  };

  const handleEducationChange = (education) => {
    setFilterState((prevState) => {
      const newSelectedEducation = prevState.selectedEducation
        ? prevState.selectedEducation?.includes(education.id)
          ? prevState.selectedEducation.filter((s) => s !== education.id)
          : [...prevState.selectedEducation, education.id]
        : [];
      return {
        ...prevState,
        selectedEducation: newSelectedEducation,
      };
    });
  };

  const handleDepartmentChange = (department) => {
    setFilterState((prevState) => {
      const newSelectedDepartment = prevState.selectedDepartment
        ? prevState.selectedDepartment?.includes(department.id)
          ? prevState.selectedDepartment.filter((s) => s !== department.id)
          : [...prevState.selectedDepartment, department.id]
        : [];
      return {
        ...prevState,
        selectedDepartment: newSelectedDepartment,
      };
    });
  };

  const handleCompanyChange = (company) => {
    setFilterState((prevState) => {
      const newSelectedCompany = prevState.selectedCompany
        ? prevState.selectedCompany?.includes(company.id)
          ? prevState.selectedCompany.filter((s) => s !== company.id)
          : [...prevState.selectedCompany, company.id]
        : [];
      return {
        ...prevState,
        newSelectedCompany: newSelectedCompany,
      };
    });
  };

  const handleIndustryChange = (industry) => {
    setFilterState((prevState) => {
      const newSelectedIndustry = prevState.selectedIndustry
        ? prevState.selectedIndustry?.includes(industry.id)
          ? prevState.selectedIndustry.filter((s) => s !== industry.id)
          : [...prevState.selectedIndustry, industry.id]
        : [];
      return {
        ...prevState,
        newSelectedCompany: newSelectedIndustry,
      };
    });
  };

  const handleFreshnessChange = (freshness) => {
    setFilterState((prevState) => {
      return {
        ...prevState,
        selectedFreshness: freshness,
      };
    });
  };

  const filterData = () => {
    onApplyFilter({
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
    });
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
    handleWorkModeChange,
    handleJobTypeChange,
    handleLocationChange,
    handleClearFilter,
    handleSalaryChange,
    handleExperienceChange,
    handleEducationChange,
    handleDepartmentChange,
    handleCompanyChange,
    handleIndustryChange,
    handleFreshnessChange,
    handleQueryTypeChange,
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
