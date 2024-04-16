export const INTERVIEW_DETAILS_FIELDS = (applicant_name, applicant_id) => {
  return [
    {
      id: 1,
      headingIntl: "applicant_name",
      label: "applicant_name",
      value: applicant_name,
    },
    {
      id: 2,
      headingIntl: "applicant_id",
      label: "applicant_id",
      value: applicant_id,
    },
  ];
};

export const FACE_TO_FACE = (address, schedule_date, schedule_time) => {
  return [
    {
      id: 1,
      headingIntl: "placeholder.address",
      label: "address",
      value: address,
    },
    {
      id: 2,
      headingIntl: "date",
      label: "schedule_date",
      value: schedule_date,
    },
    {
      id: 3,
      headingIntl: "time",
      label: "schedule_time",
      value: schedule_time,
    },
  ];
};

export const TELEPHONIC = (schedule_date, schedule_time) => {
  return [
    {
      id: 1,
      headingIntl: "date",
      label: "schedule_date",
      value: schedule_date,
    },
    {
      id: 2,
      headingIntl: "time",
      label: "schedule_time",
      value: schedule_time,
    },
  ];
};

export const REMOTE = (schedule_date, schedule_time, link) => {
  return [
    {
      id: 1,
      headingIntl: "date",
      label: "schedule_date",
      value: schedule_date,
    },
    {
      id: 2,
      headingIntl: "time",
      label: "schedule_time",
      value: schedule_time,
    },
    {
      id: 3,
      headingIntl: "placeholder.link",
      label: "link",
      value: link,
    },
  ];
};
