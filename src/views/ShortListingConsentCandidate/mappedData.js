export const tabsLabel = [
  {
    label: "Overview",
    id: 1,
  },
  {
    label: "Available For Round 1",
    id: 2,
  },
  {
    label: "Available For Round 2",
    id: 3,
  },
  {
    label: "Round 1 Shortlist",
    id: 4,
  },
  {
    label: "Round 2 Shortlist",
    id: 5,
  },
  {
    label: "Final Consent Marked List",
    id: 6,
  },
  {
    label: "Interview Shortlist",
    id: 7,
  },
  {
    label: "Offered Candidates",
    id: 8,
  },
  {
    label: "Offer Accepted By Candidates",
    id: 9,
  },
];
export const getCenterLabel = (tempCompanyLocation) => {
  return tempCompanyLocation?.map((item) => {
    return {
      label: item.name,
      id: item.id,
    };
  });
};

export const getQueryParams = (selectedTabs) => {
  const queryObject = {
    1: "r1",
    2: "r2",
    3: "r1_short",
    4: "r2_short",
    5: "final_concent",
    6: "interview",
    7: "job_offer",
    8: "job_accepted",
  };
  return queryObject[selectedTabs];
};
