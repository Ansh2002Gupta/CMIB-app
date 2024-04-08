import React from "react";
import useAllJobs from "./controller/useAllJobs";
import { Base } from "../../core/layouts";
import AllJobsTemplate from "./AllJobsTemplate";

const AllJobs = () => {
  const {
    handleLoadMore,
    data: savedJobsList,
    currentPage,
    totalPages,
    handleSearch,
    handleClickOnJobCard,
    isJobListLoading,
    handlePageChange,
    allJobsError,
    handleRowPerPageChange,
    rowsPerPage,
    isFirstPageReceived,
  } = useAllJobs();

  return (
    <Base>
      <AllJobsTemplate
        data={savedJobsList}
        error={allJobsError?.data}
        handleRowPerPageChange={handleRowPerPageChange}
        {...{
          handleClickOnJobCard,
          handlePageChange,
          currentPage,
          totalPages,
          isJobListLoading,
          handleSearch,
          rowsPerPage,
          handleLoadMore,
          isFirstPageReceived,
        }}
      />
    </Base>
  );
};

export default AllJobs;
