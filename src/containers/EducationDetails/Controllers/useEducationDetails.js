import { useState, useEffect } from "react";
import { Education_Status_Options, YEARS } from "../../../constants/constants";
import { useIntl } from "react-intl";

const educational_detail = () => [
  {
    key: "examination_name",
    label: "label.name_of_examination",
    placeholder: "label.name_of_examination_placeholder",
  },
  {
    key: "status",
    label: "label.status",
    placeholder: "label.status",
    isDropdown: true,
    options: Education_Status_Options,
  },
  {
    key: "board",
    label: "label.board_university",
    placeholder: "label.board_university",
  },
  {
    key: "year",
    isDropdown: true,
    label: "label.year",
    placeholder: "label.year",
    options: YEARS,
  },
  {
    key: "mark_in_percent",
    isNumeric: true,
    label: "label.mark_in_percent",
    placeholder: "label.mark_in_percent",
  },
  {
    key: "rank_medal",
    label: "label.rank_medal",
    placeholder: "label.rank_medal",
  },
];
const higher_secondary_detail = () => [
  {
    key: "higher_secondary",
    label: "label.higher_secondary",
    placeholder: "label.higher_secondary",
  },
  {
    key: "higher_secondary_status",
    label: "label.status",
    placeholder: "label.status",
    isDropdown: true,
    options: Education_Status_Options,
  },
  {
    key: "higher_board",
    label: "label.board_university",
    placeholder: "label.board_university",
  },
  {
    key: "higher_secondary_year",
    isDropdown: true,
    label: "label.year",
    placeholder: "label.year",
    options: YEARS,
  },
  {
    key: "higher_secondary_mark_in_percent",
    isNumeric: true,
    label: "label.mark_in_percent",
    placeholder: "label.mark_in_percent",
  },
  {
    key: "higher_secondary_rank_medal",
    label: "label.rank_medal",
    placeholder: "label.rank_medal",
  },
];

const graduation_detail = (graduation) => {
  const graduationFields = [
    {
      key: "graduation",
      label: "label.graduation",
      placeholder: "label.graduation",
      isToggle: true,
    },
  ];
  const commonFileds = [
    {
      key: "graduation_examination_name",
      label: "label.name_of_examination",
      placeholder: "label.name_of_examination_placeholder",
    },
    {
      key: "graduation_status",
      label: "label.status",
      placeholder: "label.status",
      isDropdown: true,
      options: Education_Status_Options,
    },
    {
      key: "graduation_board",
      label: "label.board_university",
      placeholder: "label.board_university",
    },
    {
      key: "graduation_year",
      isDropdown: true,
      label: "label.year",
      placeholder: "label.year",
      options: YEARS,
    },
    {
      key: "graduation_mark_in_percent",
      isNumeric: true,
      label: "label.mark_in_percent",
      placeholder: "label.mark_in_percent",
    },
    {
      key: "graduation_rank_medal",
      label: "label.rank_medal",
      placeholder: "label.rank_medal",
    },
  ];

  if (!graduation) {
    return [...graduationFields, ...commonFileds];
  }
  return graduationFields;
};

const post_graduation_detail = (post_graduation) => {
  const postGraduationFiels = [
    {
      key: "post_graduation",
      label: "label.post_graduation",
      placeholder: "label.post_graduation",
      isToggle: true,
    },
  ];
  const commonFileds = [
    {
      key: "post_graduation_examination_name",
      label: "label.name_of_examination",
      placeholder: "label.name_of_examination_placeholder",
    },
    {
      key: "post_graduation__status",
      label: "label.status",
      placeholder: "label.status",
      isDropdown: true,
      options: Education_Status_Options,
    },
    {
      key: "post_graduation_board",
      label: "label.board_university",
      placeholder: "label.board_university",
    },
    {
      key: "post_graduation_year",
      isDropdown: true,
      label: "label.year",
      placeholder: "label.year",
      options: YEARS,
    },
    {
      key: "post_graduation_mark_in_percent",
      isNumeric: true,
      label: "label.mark_in_percent",
      placeholder: "label.mark_in_percent",
    },
    {
      key: "post_graduation_rank_medal",
      label: "label.rank_medal",
      placeholder: "label.rank_medal",
    },
  ];

  if (!post_graduation) {
    return [...postGraduationFiels, ...commonFileds];
  }
  return postGraduationFiels;
};

const addValueOnField = ({ state, details, isEditable, intl }) => {
  return details.map((item) => {
    if (item.isToggle) {
      return {
        ...item,
        value: !isEditable
          ? state?.[item?.key] === null
            ? "--"
            : intl.formatMessage({
                id: `toggle.${Number(!state?.[item?.key])}`,
              })
          : Boolean(Number(!state?.[item?.key])),
      };
    }

    return {
      ...item,
      value: !isEditable && !state?.[item?.key] ? "--" : state?.[item?.key],
      codeValue: state.codeValue,
    };
  });
};

const validateOnBlur = ({ state, details, key, index, intl }) => {
  const value = state[key];
  const updatedData = details.map((item, i) => {
    if (key === item.key) {
      return {
        ...item,
        value,
        error: item.validate ? item.validate(value, intl) : "",
      };
    }
    return item;
  });
  return updatedData;
};

export const useEducationDetails = ({ state, isEditable }) => {
  const intl = useIntl();
  const [educationalDetailState, setEducationalDetailState] = useState(
    educational_detail()
  );
  const [higherSecondaryDetailState, setHigherSecondaryDetailState] = useState(
    higher_secondary_detail()
  );
  const [graduationDetailState, setGraduationDetailState] = useState(
    graduation_detail(state?.graduation)
  );
  const [postGraduationDetailState, setPostGraduationDetailState] = useState(
    post_graduation_detail(state?.post_graduation)
  );

  useEffect(() => {
    setEducationalDetailState(educational_detail());
    setHigherSecondaryDetailState(higher_secondary_detail());
    setGraduationDetailState(graduation_detail(state?.graduation));
    setPostGraduationDetailState(
      post_graduation_detail(state?.post_graduation)
    );
  }, [state?.graduation, state?.post_graduation]);

  const handleEducationDetailBlur = (key, index) => {
    const updatedData = validateOnBlur({
      state,
      details: educationalDetailState,
      key,
      index,
      intl,
    });
    setEducationalDetailState(updatedData);
  };

  const handleHigherSecondaryDetailBlur = (key, index) => {
    const updatedData = validateOnBlur({
      state,
      details: higherSecondaryDetailState,
      key,
      index,
      intl,
    });
    setHigherSecondaryDetailState(updatedData);
  };

  const handleGraduationDetailBlur = (key, index) => {
    const updatedData = validateOnBlur({
      state,
      details: graduationDetailState,
      key,
      index,
      intl,
    });
    setGraduationDetailState(updatedData);
  };

  const handlePostGraduationDetailBlur = (key, index) => {
    const updatedData = validateOnBlur({
      state,
      details: postGraduationDetailState,
      key,
      index,
      intl,
    });
    setPostGraduationDetailState(updatedData);
  };

  const checkMandatoryFields = () => {
    let error = false;
    [
      ...educationalDetailState,
      ...higherSecondaryDetailState,
      ...graduationDetailState,
      ...postGraduationDetailState,
    ].forEach((item) => {
      if (item.isMandatory && !state[item.key]) {
        error = true;
      }
    });
    return error;
  };

  return {
    education_detail: addValueOnField({
      state,
      details: educationalDetailState,
      isEditable,
      intl,
    }),
    higher_secondary_detail: addValueOnField({
      state,
      details: higherSecondaryDetailState,
      isEditable,
      intl,
    }),
    graduation_detail: addValueOnField({
      state,
      details: graduationDetailState,
      isEditable,
      intl,
    }),
    post_graduation_detail: addValueOnField({
      state,
      details: postGraduationDetailState,
      isEditable,
      intl,
    }),
    handleEducationDetailBlur,
    handleHigherSecondaryDetailBlur,
    handleGraduationDetailBlur,
    handlePostGraduationDetailBlur,
    isValidAllFields: checkMandatoryFields(),
  };
};
