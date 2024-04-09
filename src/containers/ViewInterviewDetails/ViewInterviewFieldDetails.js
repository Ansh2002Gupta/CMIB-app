export const INTERVIEW_DETAILS = {
  id: 1,
  applicant_name: "Amulya Kohli",
  applicant_id: "NRO01234",
  type: "remote",
  alternate_type: "remote",
  vanue_address:
    "tower b1  world tnsjk afsd kf asddsfj sadfhhs dfadsfadsf sdfas sdfafjhasd ech park",
  alternate_venue_address: "tower b1  world tech park",
  primary_schedule_date: "2023-12-28",
  primary_schedule_time: "11:30 AM",
  alternate_schedule_date: "2023-12-28",
  alternate_schedule_time: "12:00 AM",
  remote_meeting_link: "https://meet.google.com/vjk-bnof-fnp",
  alternate_remote_meeting_link: "https://meet.google.com/vjk-bnof-fnp",
};

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

export const FACE_TO_FACE = (address, schedule_date, schedule_time, type) => {
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
    {
      id: 4,
      headingIntl: "interview_type",
      label: "type",
      value: type,
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
