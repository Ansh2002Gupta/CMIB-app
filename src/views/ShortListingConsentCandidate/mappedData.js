import { getPassRejected } from "../../constants/constants";

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
  return tempCompanyLocation?.map((item, index) => {
    return {
      label: item.name,
      id: item.id,
      index: index,
    };
  });
};
export const getMobileValue = (selectedTabs, item) => {
  let dataMappingObject = {};
  if (selectedTabs == 3) {
    dataMappingObject.key = "Consent";
    dataMappingObject.value = item?.consent ?? "-";
  } else if (selectedTabs == 5) {
    dataMappingObject.key = "Test";
    dataMappingObject.value = getPassRejected[item?.test_result] ?? "-";
  } else if (selectedTabs == 6) {
    dataMappingObject.key = "Offered";
    dataMappingObject.value = item?.job_offered ?? "-";
  } else if (selectedTabs === 7) {
    dataMappingObject.key = "Offer";
    dataMappingObject.value = item?.offered_status ?? "-";
  }
  return dataMappingObject;
};

export const getQueryParams = (selectedTabs) => {
  const queryObject = {
    1: "r1",
    2: "r2",
    3: "r1_short",
    4: "r2_short",
    5: "final_consent",
    6: "interview",
    7: "job_offer",
    8: "job_accepted",
  };
  return queryObject[selectedTabs];
};
