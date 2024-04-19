import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router";
import { useIntl } from "react-intl";
import {
  Platform,
  ScrollView,
  View,
  useWindowDimensions,
} from "@unthinkable/react-core-components";

import ActionPairButton from "../../../../components/ActionPairButton";
import CommonText from "../../../../components/CommonText";
import CustomButton from "../../../../components/CustomButton";
import CustomMultiRowTextInput from "../../../../components/CustomMultiRowTextinput";
import DetailCard from "../../../../components/DetailCard";
import MultiRow from "../../../../core/layouts/MultiRow";
import Spinner from "../../../../components/Spinner";
import ToastComponent from "../../../../components/ToastComponent/ToastComponent";
import { SideBarContext } from "../../../../globalContext/sidebar/sidebarProvider";
import useFetch from "../../../../hooks/useFetch";
import { usePut } from "../../../../hooks/useApiRequest";
import { formateErrors } from "../../../../utils/util";
import {
  APPLICATION,
  COUNTRY_CODE,
  PRE_INTERVIEW,
  ROUNDS,
} from "../../../../services/apiServices/apiEndPoint";
import { headStartRowConfig } from "./config";
import {
  COMPANY,
  HEAD_CONTACT,
  MOBILE_CODES,
} from "../../../../constants/constants";
import LoadingScreen from "../../../../components/LoadingScreen";
import commonStyles from "../../../../theme/styles/commonStyles";
import images from "../../../../images";
import styles from "./PreInterviewPreferences.style";

const PreInterviewPreferencesTemplate = ({
  tabHandler,
  handleInterviewPreferences,
  preInterviewDetails,
}) => {
  let options_object = [];
  const intl = useIntl();
  const params = useParams();
  const navigate = useNavigate();
  const windowWidth = useWindowDimensions()?.width;
  const round_id = params?.id;
  const isMob = Platform.OS.toLowerCase() !== "web";
  const webProps = !isMob ? { size: "xs" } : {};
  const isWebProps =
    Platform.OS.toLowerCase() === "web"
      ? {
          buttonOneStyle: styles.buttonStyle,
          buttonTwoStyle: styles.buttonStyle,
          buttonOneContainerStyle: styles.buttonStyle,
          buttonTwoContainerStyle: styles.buttonStyle,
        }
      : {};
  const [sideBarState] = useContext(SideBarContext);
  const { selectedModule } = sideBarState;
  const [toastMsg, setToastMsg] = useState();
  const [errorOnPage, setErrorOnPage] = useState(false);
  const [startRowTemplateConfig, setStartRowTemplateConfig] = useState([
    ...headStartRowConfig,
  ]);
  const [headContactDetails, setHeadContactDetails] = useState([
    ...headStartRowConfig,
  ]);

  const {
    data: fetchedHeadContactDetails,
    fetchData: fetchHeadContactData,
    isError: isErrorHeadContactData,
    isLoading: isLoadingHeadContactData,
  } = useFetch({
    url: `${COMPANY}/${selectedModule?.key}${ROUNDS}/${round_id}${APPLICATION}${PRE_INTERVIEW}`,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const {
    makeRequest: updateHeadContactData,
    isError: isErrorUpdateHeadContactData,
    setError: setErrorUpdateHeadContactData,
    isLoading: isLoadingUpdateContactData,
  } = usePut({
    url: `${COMPANY}/${selectedModule?.key}${ROUNDS}/${round_id}${APPLICATION}${PRE_INTERVIEW}`,
  });

  const {
    data: countryCodes,
    isLoading: isCountryCodeLoading,
    isError: isErrorGettingCountryCodes,
    error: errorGettingCountryCodes,
    fetchData: getCountryCodes,
  } = useFetch({
    url: COUNTRY_CODE,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const isEmptyCellPresent = (grid) => {
    return grid.some((cell) => {
      if (cell.isButton) return false;
      if (!cell.value) return true;
      return false;
    });
  };

  useEffect(() => {
    setErrorOnPage(false);
    if (isEmptyCellPresent(headContactDetails)) {
      setErrorOnPage(true);
    }
  }, [headContactDetails]);

  const setOptions = ({ data, options, key }) => {
    options_object = options.map((obj) => ({
      label: obj?.["dial_code"],
      value: obj?.["dial_code"],
    }));
    const newData = data.map((object) => {
      if (object?.key?.trim().toLowerCase() === key?.trim().toLowerCase())
        return { ...object, options: options_object };
      return { ...object };
    });
    setStartRowTemplateConfig(newData);
  };

  useEffect(() => {
    const fetchData = async () => {
      const apiData = await fetchHeadContactData();
      const mobile_code = await getCountryCodes();
      setOptions({
        data: startRowTemplateConfig,
        options: mobile_code,
        key: HEAD_CONTACT.MOBILE_COUNTRY_CODE,
      });
      handleInterviewPreferences(
        "label.short_listing_criteria",
        !!apiData?.["shortlisting_criteria"]
          ? apiData?.["shortlisting_criteria"]
          : ""
      );
      handleInterviewPreferences(
        "label.any_other_information",
        !!apiData?.["other_details"] ? apiData?.["other_details"] : ""
      );
      const length = !apiData?.pre_interview_preferenceshead_contacts
        ? 0
        : apiData?.pre_interview_preferenceshead_contacts.length;
      const pre_interview_preference_data =
        !apiData?.pre_interview_preferenceshead_contacts
          ? null
          : apiData?.pre_interview_preferenceshead_contacts
              ?.map((contact, index) => {
                return [
                  {
                    db_row_id: contact.id,
                    cellID: contact.id,
                    key: HEAD_CONTACT.DESIGNATION,
                    label: "label.designation",
                    placeholder: "label.enter_designation",
                    value: contact.designation,
                  },
                  {
                    db_row_id: contact.id,
                    cellID: contact.id,
                    key: HEAD_CONTACT.NAME,
                    label: "label.name",
                    placeholder: "label.enter_name",
                    value: contact.name,
                  },
                  {
                    db_row_id: contact.id,
                    cellID: contact.id,
                    key: HEAD_CONTACT.EMAIL,
                    label: "label.email",
                    placeholder: "label.enter_email",
                    value: contact.email,
                  },
                  {
                    db_row_id: contact.id,
                    cellID: contact.id,
                    key: HEAD_CONTACT.MOBILE_COUNTRY_CODE,
                    label: "label.mobile_country_code",
                    placeholder: "label.select_mobile_country_code",
                    value: contact.mobile_country_code,
                    isDropdown: true,
                    labelField: "label",
                    valueField: "value",
                    options: options_object,
                  },
                  {
                    db_row_id: contact.id,
                    cellID: contact.id,
                    key: HEAD_CONTACT.MOBILE_NUMBER,
                    label: "label.mobile_number",
                    placeholder: "label.mobile_number",
                    value: contact.mobile_number,
                    isNumeric: true,
                  },
                  {
                    db_row_id: contact.id,
                    cellID: contact.id,
                    key: HEAD_CONTACT.AREA_CODE,
                    label: "label.area_code",
                    placeholder: "label.select_area_code",
                    value: contact.std_country_code,
                    isNumeric: true,
                  },
                  {
                    db_row_id: contact.id,
                    cellID: contact.id,
                    key: HEAD_CONTACT.TELEPHONE_NUMBER,
                    label: "label.telephone_number",
                    placeholder: "label.enter_telephone_number",
                    value: contact.telephone_number,
                    isNumeric: true,
                  },
                  {
                    db_row_id: contact.id,
                    cellID: contact.id,
                    isButton: true,
                    isAdd: index === length - 1 ? true : false,
                  },
                ];
              })
              .flat();
      !!pre_interview_preference_data
        ? setHeadContactDetails([...pre_interview_preference_data])
        : setHeadContactDetails([...headStartRowConfig]);
    };
    if (!!selectedModule?.key) {
      fetchData();
    }
  }, [selectedModule?.key]);

  const getRowData = ({ data }) => {
    const groupedData = data?.reduce((acc, item) => {
      if (item?.isButton) return acc;
      if (!acc[item?.cellID]) {
        acc[item?.cellID] = {};
      }
      if (!!item?.db_row_id) {
        acc[item?.cellID]["id"] = item?.db_row_id;
      }
      if (item?.key === "name") {
        acc[item?.cellID]["name"] = item?.value;
      } else if (item?.key === "designation") {
        acc[item?.cellID]["designation"] = item?.value;
      } else if (item?.key === "email") {
        acc[item?.cellID]["email"] = item?.value;
      } else if (item?.key === "mobile_country_code") {
        acc[item?.cellID]["mobile_country_code"] = item?.value;
      } else if (item?.key === "mobile_number") {
        acc[item?.cellID]["mobile_number"] = item?.value;
      } else if (item?.key === "std_country_code") {
        acc[item?.cellID]["std_country_code"] = item?.value;
      } else if (item?.key === "telephone_number") {
        acc[item?.cellID]["telephone_number"] = item?.value;
      }
      return acc;
    }, {});
    const payload = Object.keys(groupedData).map((cellID) => {
      const contactInfo = groupedData[cellID];
      return {
        id: contactInfo?.id,
        name: contactInfo?.name,
        designation: contactInfo?.designation,
        email: contactInfo?.email,
        mobile_country_code: contactInfo?.mobile_country_code,
        mobile_number: contactInfo?.mobile_number,
        std_country_code: contactInfo?.std_country_code,
        telephone_number: contactInfo?.telephone_number,
      };
    });
    return payload;
  };

  const createPayload = ({ data }) => {
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
    updateHeadContactData({
      body: { data: payload },
      onErrorCallback: (error) => {
        const errorMsg = !!error?.errors
          ? formateErrors(error)
          : formateErrors(
              intl.formatMessage({ id: "label.some_error_occured" })
            );
        if (!!error?.errors) setToastMsg(errorMsg);
      },
      onSuccessCallback: () => {
        tabHandler("next");
        setToastMsg("Changes saved successfully!");
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
      const updatedDetail = prevDetail?.map((item) => {
        if (
          !value &&
          value?.length === 0 &&
          item?.cellID === cellID &&
          item?.label === propertyName
        ) {
          return {
            ...item,
            value: value,
            isError: true,
            error: intl.formatMessage({ id: "label.error.cannot_be_empty" }),
          };
        }
        if (item?.label === propertyName && item?.cellID === cellID) {
          return { ...item, value: value, isError: null, error: null };
        }
        return item;
      });
      return updatedDetail;
    });
  };

  const handleDismiss = () => {
    setToastMsg(null);
    setErrorUpdateHeadContactData(null);
  };

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
          startRowTemplate={startRowTemplateConfig}
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
          footerId={"label.at_least_one_mandatory_with_star"}
        />
      ),
    },
  ];

  return (
    <>
      <ScrollView style={styles.mainContainer}>
        {!!toastMsg && (
          <ToastComponent toastMessage={toastMsg} onDismiss={handleDismiss} />
        )}
        {isLoadingHeadContactData ? (
          <View style={styles.loaderContainer}>
            <LoadingScreen />
          </View>
        ) : (
          <MultiRow rows={JobDetailsConfig} />
        )}
        <View style={styles.actionBtnContainer}>
          <CustomButton
            style={styles.buttonStyle}
            iconLeft={{
              leftIconSource: images.iconArrowLeft,
            }}
            onPress={() => {
              tabHandler("prev");
            }}
          >
            <CommonText
              fontWeight={"600"}
              customTextStyle={styles.backButtonStyle}
            >
              {intl.formatMessage({ id: "label.back" })}
            </CommonText>
          </CustomButton>
          <ActionPairButton
            buttonOneText={intl.formatMessage({ id: "label.cancel" })}
            buttonTwoText={intl.formatMessage({ id: "label.save" })}
            onPressButtonOne={() => navigate(-1)}
            onPressButtonTwo={() => {
              handleSaveAndNext();
              tabHandler("next");
            }}
            customStyles={{
              ...isWebProps,
              customContainerStyle: commonStyles.customContainerStyle,
              buttonTwoStyle: styles.saveAndNextButton,
            }}
            displayLoader={isLoadingUpdateContactData}
            isDisabled={errorOnPage || isLoadingUpdateContactData}
            isLoading={isLoadingUpdateContactData}
            isButtonTwoGreen
          />
        </View>
      </ScrollView>
    </>
  );
};

PreInterviewPreferencesTemplate.defaultProps = {
  preInterviewDetails: {},
};

PreInterviewPreferencesTemplate.propTypes = {
  preInterviewDetails: PropTypes.object,
};

export default PreInterviewPreferencesTemplate;
