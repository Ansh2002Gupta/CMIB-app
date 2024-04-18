import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import {
  Platform,
  ScrollView,
  View,
  useWindowDimensions,
} from "@unthinkable/react-core-components";

import DetailCard from "../../../../components/DetailCard";
import MultiRow from "../../../../core/layouts/MultiRow";
import styles from "./PreInterviewPreferences.style";
import CustomMultiRowTextInput from "../../../../components/CustomMultiRowTextinput";
import {
  AREA_CODES,
  COMPANY,
  HEAD_CONTACT,
} from "../../../../constants/constants";
import { ThreeRow } from "../../../../core/layouts";
import CommonText from "../../../../components/CommonText";
import useFetch from "../../../../hooks/useFetch";
import {
  APPLICATION,
  CORE,
  PRE_INTERVIEW,
  ROUNDS,
} from "../../../../services/apiServices/apiEndPoint";
import { SideBarContext } from "../../../../globalContext/sidebar/sidebarProvider";
import { useNavigate, useParams } from "react-router";
import { usePatch } from "../../../../hooks/useApiRequest";
import ActionPairButton from "../../../../components/ActionPairButton";
import commonStyles from "../../../../theme/styles/commonStyles";

const headStartRowConfig = [
  {
    cellID: 1,
    key: HEAD_CONTACT.DESIGNATION,
    label: "label.designation",
    placeholder: "label.enter_designation",
    value: "",
  },
  {
    cellID: 1,
    key: HEAD_CONTACT.NAME,
    label: "label.name",
    placeholder: "label.enter_name",
    value: "",
  },
  {
    cellID: 1,
    key: HEAD_CONTACT.EMAIL,
    label: "label.email",
    placeholder: "label.enter_email",
    value: "",
  },
  {
    cellID: 1,
    key: HEAD_CONTACT.MOBILE_NUMBER,
    label: "label.mobile_number",
    placeholder: "label.mobile_number",
    value: "",
    isNumeric: true,
  },
  {
    cellID: 1,
    key: HEAD_CONTACT.AREA_CODE,
    label: "label.area_code",
    placeholder: "label.select_area_code",
    value: "",
    isDropdown: true,
    labelField: "label",
    valueField: "value",
    options: AREA_CODES,
  },
  {
    cellID: 1,
    key: HEAD_CONTACT.TELEPHONE_NUMBER,
    label: "label.telephone_number",
    placeholder: "label.enter_telephone_number",
    value: "",
    isNumeric: true,
  },
  {
    cellID: 1,
    isButton: true,
    isAdd: true,
  },
];

const PreInterviewPreferencesTemplate = ({
  tabhandler,
  handleInterviewPreferences,
  preInterviewDetails,
}) => {
  const intl = useIntl();
  const params = useParams();
  const navigate = useNavigate();
  const windowWidth = useWindowDimensions()?.width;
  const [sideBarState] = useContext(SideBarContext);
  const { selectedModule } = sideBarState;
  const round_id = params?.id;
  const isWebProps =
    Platform.OS.toLowerCase() === "web"
      ? {
          buttonOneStyle: styles.buttonStyle,
          buttonTwoStyle: styles.buttonStyle,
          buttonOneContainerStyle: styles.buttonStyle,
          buttonTwoContainerStyle: styles.buttonStyle,
        }
      : {};

  const [headContactDetails, setHeadContactDetails] = useState([
    ...headStartRowConfig,
  ]);

  useEffect(() => {
    const isErrorInDetails = () => {
      return headContactDetails.some(
        (contact) => !contact?.isButton && !!contact?.isError
      );
    };
    if (isErrorInDetails()) {
      // callBack({
      //   isErrorChildState: true,
      //   isLoadingChildState: false,
      // });
    } else {
      // callBack({
      //   isErrorChildState: false,
      //   isLoadingChildState: false,
      // });
    }
  }, [headContactDetails]);

  const {
    data: headContactData,
    fetchData: fetchHeadContactData,
    isError: isErrorHeadContactData,
    isLoadind: isLoadingHeadContactData,
  } = useFetch({
    url: `${COMPANY}/${selectedModule?.key}${ROUNDS}/${round_id}${APPLICATION}${PRE_INTERVIEW}`,
  });

  console.log("headContactData:", headContactData);

  const {
    makeRequest: updateHeadContactData,
    error: isErrorUpdateHeadContactData,
    isLoading: isLoadingUpdateContactData,
  } = usePatch({
    url: `${COMPANY}/${selectedModule?.key}${ROUNDS}/${round_id}${APPLICATION}${PRE_INTERVIEW}`,
  });

  const getRowData = ({ data }) => {
    const groupedData = data.reduce((acc, item) => {
      console.log("item:", item);
      if (item.isButton) return acc;

      if (!acc[item.cellID]) {
        acc[item.cellID] = {};
      }

      if (item.key === "name") {
        acc[item.cellID]["name"] = item.value;
      } else if (item.key === "designation") {
        acc[item.cellID]["designation"] = item.value;
      } else if (item.key === "email") {
        acc[item.cellID]["email"] = item.value;
      } else if (item.key === "mobile_number") {
        acc[item.cellID]["mobile_number"] = item.value;
      } else if (item.key === "std_country_code") {
        acc[item.cellID]["std_country_code"] = item.value;
      } else if (item.key === "telephone_number") {
        acc[item.cellID]["telephone_number"] = item.value;
      }
      return acc;
    }, {});

    console.log("groupedData:", groupedData);

    const payload = Object.keys(groupedData).map((cellID) => {
      const contactInfo = groupedData[cellID];
      return {
        id: parseInt(cellID),
        pre_interview_preference_id: 1,
        name: contactInfo.name,
        designation: contactInfo.designation,
        email: contactInfo.email,
        mobile_number: contactInfo.mobile_number,
        std_country_code: contactInfo.std_country_code,
        telephone_number: contactInfo.telephone_number,
        created_at: null,
        updated_at: null,
      };
    });

    return payload;
  };

  const createPayload = ({ data }) => {
    console.log("createPayload| data:", data);
    const payload = {
      ps_round_id: round_id,
      shortlisting_criteria:
        data?.preInterviewDetails?.preInterviewPrefrences?.[0]?.value,
      other_details:
        data?.preInterviewDetails?.preInterviewPrefrences?.[1]?.value,
      contact_details: getRowData({ data: data?.headContactDetails }),
    };
    return payload;
  };

  const handleSaveAndNext = () => {
    const payload = createPayload({
      data: { ...{ headContactDetails, preInterviewDetails } },
    });
    console.log("finalPayload:", payload);
    updateHeadContactData({
      body: { data: payload },
      onSuccessCallback: () => {
        tabhandler("next");
      },
    });
  };

  const errorInRow = ({ id = 1 }) => {
    return headContactDetails.some(
      (contact) =>
        !contact?.isButton && contact?.cellID === id && !!contact?.isError
    );
  };

  const handleHeadContactDetails = ({ propertyName, value, id, cellID }) => {
    setHeadContactDetails((prevDetail) => {
      const updatedDetail = prevDetail.map((item) => {
        if (
          !value &&
          value?.length === 0 &&
          item.cellID === ChannelSplitterNode &&
          item.label === propertyName
        ) {
          // callBack((prev) => ({ ...prev, isErrorChildState: true }));
          return {
            ...item,
            value: value,
            isError: true,
            error: intl.formatMessage({ id: "label.error.cannot_be_empty" }),
          };
        }
        if (item.label === propertyName && item.cellID === cellID) {
          return { ...item, value: value, isError: null, error: null };
        }
        return item;
      });
      // setRequiredDocumentDetails([...updatedDetail]);
      // handleInputChange("required_docs", updatedDetail);
      return updatedDetail;
    });
    // if (!errorInRow({ id: 1 })) {
    //   callBack((prev) => ({
    //     ...prev,
    //     isErrorChildState: false,
    //     isLoadingChildState: false,
    //   }));
    // }
  };

  console.log("preInterviewDetails:", preInterviewDetails);

  const JobDetailsConfig = [
    {
      content: (
        <DetailCard
          headerId={intl.formatMessage({
            id: "label.pre_interview_prefrences",
          })}
          details={preInterviewDetails?.preInterviewPrefrences}
          handleChange={handleInterviewPreferences}
          isEditProfile
          customCardStyle={styles.cardStyle}
          customContainerStyle={styles.customContainerStyle(windowWidth)}
        />
      ),
    },
    {
      content: (
        <CustomMultiRowTextInput
          customCardStyle={{
            ...styles.multiRowTextStyle,
          }}
          customWebContainerStyle={styles.customWebContainerStyle}
          startRowTemplate={headStartRowConfig}
          gridTemplate={headContactDetails}
          setGridTemplate={setHeadContactDetails}
          numColsInARow={9}
          handleValueChange={({ propertyName, value, id, cellID }) => {
            handleHeadContactDetails({
              propertyName,
              value,
              id,
              cellID,
            });
          }}
          headerId={"label.head_contacts"}
        />
        //<DetailCard
        //   headerId={intl.formatMessage({
        //     id: "label.head_contacts",
        //   })}
        //   details={preInterviewDetails?.preInterviewPrefrences}
        //   handleChange={handleInterviewPreferences}
        //   isEditProfile
        //   customCardStyle={styles.cardStyle}
        //   customContainerStyle={styles.customContainerStyle(windowWidth)}
      ),
    },
  ];

  return (
    <ScrollView style={styles.mainContainer}>
      <MultiRow rows={JobDetailsConfig} />
      <View style={styles.actionBtnContainer}>
        <ActionPairButton
          buttonOneText={intl.formatMessage({ id: "label.cancel" })}
          buttonTwoText={intl.formatMessage({ id: "label.save" })}
          onPressButtonOne={() => navigate(-1)}
          onPressButtonTwo={() => {
            handleSaveAndNext();
          }}
          customStyles={{
            ...isWebProps,
            customContainerStyle: commonStyles.customContainerStyle,
          }}
          isButtonTwoGreen
        />
      </View>
    </ScrollView>
  );
};

PreInterviewPreferencesTemplate.defaultProps = {
  preInterviewDetails: {},
};

PreInterviewPreferencesTemplate.propTypes = {
  preInterviewDetails: PropTypes.object,
};

export default PreInterviewPreferencesTemplate;
