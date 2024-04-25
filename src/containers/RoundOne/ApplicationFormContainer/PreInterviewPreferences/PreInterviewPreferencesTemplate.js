import React, { useContext, useEffect, useRef, useState } from "react";
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
import { rowConfigs } from "./config";
import {
  ADD_PREINTERVIEW_PREFERNCES_HEADING,
  API_VERSION_QUERY_PARAM,
  COMPANY,
  HEAD_CONTACT,
  NEWLY_QUALIFIED,
  SESSION_ID_QUERY_PARAM,
  UPDATED_API_VERSION,
} from "../../../../constants/constants";
import LoadingScreen from "../../../../components/LoadingScreen";
import commonStyles from "../../../../theme/styles/commonStyles";
import images from "../../../../images";
import styles from "./PreInterviewPreferences.style";
import useGetCurrentUser from "../../../../hooks/useGetCurrentUser";
import CardComponent from "../../../../components/CardComponent";
import useIsWebView from "../../../../hooks/useIsWebView";
import EditDeleteAction from "../../../../components/EditDeleteAction/EditDeleteAction";
import AddIconText from "../../../../components/AddIconText";
import ModalWithTitleButton from "../../../../components/ModalWithTitleButton";
import CustomTextInput from "../../../../components/CustomTextInput";

const PreInterviewPreferencesTemplate = ({
  isEditable,
  tabHandler,
  handleInterviewPreferences,
  preInterviewDetails,
  setIsEditable,
}) => {
  let options_object = [];
  const intl = useIntl();
  const params = useParams();
  const navigate = useNavigate();
  const { currentModule } = useGetCurrentUser();
  const windowWidth = useWindowDimensions()?.width;
  const { isWebView } = useIsWebView();
  const round_id = params?.id;
  const isMob = Platform.OS.toLowerCase() !== "web";
  const webProps = !isMob ? { size: "xs" } : {};
  const headStartRowConfig = rowConfigs(isWebView);

  const [sideBarState] = useContext(SideBarContext);
  const { selectedModule } = sideBarState;
  const sessionId = sideBarState?.selectedSession?.value;
  const [toastMsg, setToastMsg] = useState();
  const [errorOnPage, setErrorOnPage] = useState(false);
  const startRowTemplateConfig = useRef([...headStartRowConfig]);
  const [headContactDetails, setHeadContactDetails] = useState([
    ...headStartRowConfig,
  ]);

  const [contactDetails, setContactDetails] = useState(null);
  const [addDetailsModal, setAddDetailsModal] = useState(false);

  const isWebProps =
    Platform.OS.toLowerCase() === "web"
      ? {
          buttonOneStyle: styles.buttonStyle,
          buttonTwoStyle: styles.buttonTwoStyle,
          buttonOneContainerStyle: styles.buttonStyle,
          buttonTwoContainerStyle: styles.buttonTwoStyle,
        }
      : {};

  const {
    data: fetchedHeadContactDetails,
    fetchData: fetchHeadContactData,
    isError: isErrorHeadContactData,
    isLoading: isLoadingHeadContactData,
  } = useFetch({
    url: `${COMPANY}/${selectedModule?.key}${ROUNDS}/${round_id}${APPLICATION}${PRE_INTERVIEW}?${SESSION_ID_QUERY_PARAM}=${sessionId}`,
    apiOptions: {
      headers: {
        [API_VERSION_QUERY_PARAM]: UPDATED_API_VERSION,
      },
    },
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
    url: `${COMPANY}/${selectedModule?.key}${ROUNDS}/${round_id}${APPLICATION}${PRE_INTERVIEW}?${SESSION_ID_QUERY_PARAM}=${sessionId}`,
    apiOptions: {
      headers: {
        [API_VERSION_QUERY_PARAM]: UPDATED_API_VERSION,
      },
    },
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
    startRowTemplateConfig.current = newData;
    setHeadContactDetails(newData);
  };
  useEffect(() => {
    const fetchData = async () => {
      const apiData = await fetchHeadContactData();
      const mobile_code = await getCountryCodes();
      setOptions({
        data: startRowTemplateConfig.current,
        options: mobile_code,
        key: HEAD_CONTACT.MOBILE_COUNTRY_CODE,
      });
      handleInterviewPreferences(
        "label.participating",
        !!apiData?.["participating_for_first_time"]
          ? apiData?.["participating_for_first_time"].toLowerCase() === "yes"
            ? isEditable
              ? 0
              : "Yes"
            : isEditable
            ? 1
            : "No"
          : false
      );
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
                    width: 5,
                    customWidthValue: 150,
                  },
                  {
                    db_row_id: contact.id,
                    cellID: contact.id,
                    key: HEAD_CONTACT.NAME,
                    label: "label.name",
                    placeholder: "label.enter_name",
                    value: contact.name,
                    width: 5,
                    customWidthValue: 150,
                  },
                  {
                    db_row_id: contact.id,
                    cellID: contact.id,
                    key: HEAD_CONTACT.EMAIL,
                    label: "label.email",
                    placeholder: "label.enter_email",
                    value: contact.email,
                    width: 5,
                    customWidthValue: 150,
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
                    width: 5,
                    customWidthValue: 150,
                  },
                  {
                    db_row_id: contact.id,
                    cellID: contact.id,
                    key: HEAD_CONTACT.MOBILE_NUMBER,
                    label: "label.mobile_number",
                    placeholder: "label.mobile_number",
                    value: contact.mobile_number,
                    isNumeric: true,
                    width: 5,
                    customWidthValue: 150,
                  },
                  {
                    db_row_id: contact.id,
                    cellID: contact.id,
                    key: HEAD_CONTACT.AREA_CODE,
                    label: "label.area_code",
                    placeholder: "label.select_area_code",
                    value: contact.std_country_code,
                    isNumeric: true,
                    width: 5,
                    customWidthValue: 150,
                  },
                  {
                    db_row_id: contact.id,
                    cellID: contact.id,
                    key: HEAD_CONTACT.TELEPHONE_NUMBER,
                    label: "label.telephone_number",
                    placeholder: "label.enter_telephone_number",
                    value: contact.telephone_number,
                    isNumeric: true,
                    width: 5,
                    customWidthValue: 150,
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
        : setHeadContactDetails([...startRowTemplateConfig.current]);
    };
    if (!!selectedModule?.key) {
      fetchData();
    }
  }, [selectedModule?.key, isEditable]);

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
    const shortlistingCriteria =
      data?.preInterviewDetails?.preInterviewPrefrences?.find(
        (pref) => pref.key === "short_listing_criteria"
      )?.value;
    const otherDetails =
      data?.preInterviewDetails?.preInterviewPrefrences?.find(
        (pref) => pref.key === "any_other_information"
      )?.value;
    const optionalPayload =
      currentModule !== NEWLY_QUALIFIED
        ? {
            participating_for_first_time:
              data?.preInterviewDetails?.preInterviewPrefrences?.find(
                (pref) => pref.key === "participating"
              )?.value
                ? "no"
                : "yes",
          }
        : {};
    const payload = {
      ps_round_id: round_id,
      ...optionalPayload,
      shortlisting_criteria: shortlistingCriteria,
      other_details: otherDetails,
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

  function mapDocuments(dataArray) {
    const groupedData = {};
    dataArray.forEach((item) => {
      if (!groupedData[item.cellID]) {
        groupedData[item.cellID] = {};
      }
      switch (item.key) {
        case "designation":
          groupedData[item.cellID].designation = item.value;
          break;
        case "name":
          groupedData[item.cellID].name = item.value;
          break;
        case "email":
          groupedData[item.cellID].email = item.value;
          break;
        case "mobile_country_code":
          groupedData[item.cellID].mobile_country_code = item.value;
          break;
        case "mobile_number":
          groupedData[item.cellID].mobile_number = item.value;
          break;
        case "std_country_code":
          groupedData[item.cellID].std_country_code = item.value;
          break;
        case "telephone_number":
          groupedData[item.cellID].telephone_number = item.value;
          break;
      }
    });
    const result = Object.keys(groupedData).map((key) => {
      return groupedData[key];
    });
    return result;
  }
  const nonEditableData = mapDocuments(headContactDetails);

  const getColoumConfigs = (item, isHeading) => {
    const tableStyle = isHeading
      ? commonStyles.tableHeadingText
      : commonStyles.cellTextStyle();
    return [
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item?.designation || "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item?.name || "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item?.email || "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("25%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item?.mobile_country_code || "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item?.std_country_code || "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item?.telephone_number || "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
    ];
  };

  const dataArr = Object.values(
    headContactDetails.reduce((acc, item) => {
      if (!acc[item.cellID]) acc[item.cellID] = {};
      const group = acc[item.cellID];

      if (item.key === "designation") {
        group.designation = item.value;
      } else if (item.key === "name") {
        group.name = item.value;
      } else if (item.key === "email") {
        group.email = item.value;
      } else if (item.key === "mobile_country_code") {
        group.mobile_country_code = item.value;
      } else if (item.key === "mobile_number") {
        group.mobile_number = item.value;
      } else if (item.key === "std_country_code") {
        group.std_country_code = item.value;
      } else if (item.key === "telephone_number") {
        group.telephone_number = item.value;
      } else {
        group.cellID = item.cellID;
      }

      return acc;
    }, {})
  );

  const onClickAddPlace = (cellID) => {
    setAddDetailsModal(true);
    setContactDetails((prev) => ({
      ...prev,
      cellID: cellID,
    }));
  };

  const onClickDeletePlace = (cellID) => {
    setHeadContactDetails((prevDetail) => {
      const filteredDocs = prevDetail?.filter((doc) => doc.cellID !== cellID);
      return [...filteredDocs];
    });
  };
  const onCLickEditPlace = (cellID) => {
    const documentToEdit = headContactDetails.find(
      (doc) => doc.cellID === cellID
    );

    if (documentToEdit) {
      setContactDetails({
        designation:
          headContactDetails.find(
            (item) => item.cellID === cellID && item.key === "designation"
          )?.value || "",
        name:
          headContactDetails.find(
            (item) => item.cellID === cellID && item.key === "name"
          )?.value || "",
        email:
          headContactDetails.find(
            (item) => item.cellID === cellID && item.key === "email"
          )?.value || "",
        mobile_country_code:
          headContactDetails.find(
            (item) =>
              item.cellID === cellID && item.key === "mobile_country_code"
          )?.value || "",
        mobile_number:
          headContactDetails.find(
            (item) => item.cellID === cellID && item.key === "mobile_number"
          )?.value || "",
        std_country_code:
          headContactDetails.find(
            (item) => item.cellID === cellID && item.key === "std_country_code"
          )?.value || "",
        telephone_number:
          headContactDetails.find(
            (item) => item.cellID === cellID && item.key === "telephone_number"
          )?.value || "",
        cellID: cellID,
      });
    }
  };
  const onClickAddPlaceCancelButton = () => {
    setAddDetailsModal(false);
    setContactDetails(null);
  };

  const onClickAddPlaceSaveButton = () => {
    const {
      designation,
      name,
      email,
      mobile_country_code,
      mobile_number,
      std_country_code,
      telephone_number,
      cellID,
    } = contactDetails;

    let newData = headStartRowConfig?.map((doc) => {
      let val;
      if (doc?.key === "designation") {
        val = designation;
      } else if (doc.key === "name") {
        val = name;
      } else if (doc.key === "email") {
        val = email;
      } else if (doc.key === "mobile_country_code") {
        val = mobile_country_code;
      } else if (doc.key === "mobile_number") {
        val = mobile_number;
      } else if (doc.key === "std_country_code") {
        val = std_country_code;
      } else {
        val = telephone_number;
      }
      return {
        ...doc,
        cellID,
        value: val,
      };
    });

    const updatedDocumentDetails = headContactDetails.map((item) => {
      if (item.cellID === cellID) {
        switch (item.key) {
          case "designation":
            return { ...item, value: designation };
          case "name":
            return { ...item, value: name };
          case "email":
            return { ...item, value: email };
          case "mobile_country_code":
            return { ...item, value: mobile_country_code };
          case "mobile_number":
            return { ...item, value: mobile_number };
          case "std_country_code":
            return { ...item, value: std_country_code };
          default:
            return item;
        }
      }
      return item;
    });

    setHeadContactDetails([...updatedDocumentDetails, ...newData]);
    setAddDetailsModal(false);
    setContactDetails(null);
  };

  const renderAddContactDetailsMob = () => {
    return (
      <>
        {dataArr.map((item, index) => {
          return (
            <View>
              <View
                style={
                  index !== 0
                    ? { ...styles.documentBorderStyle }
                    : { ...styles.bottomMargin }
                }
              ></View>
              <EditDeleteAction
                topText={item?.name}
                bottomLeftText={item?.designation}
                onDeleteDocument={() => {
                  onClickDeletePlace(item.cellID);
                }}
                onEditDocument={() => {
                  onCLickEditPlace(item.cellID);
                }}
                categoriesText={intl.formatMessage({
                  id: "label.contact_details",
                })}
                isCategory
                requiredPostingPlaceDetail={dataArr[index]}
              />
            </View>
          );
        })}
        <AddIconText
          customViewStyle={styles.customAddIconStyle}
          label={intl.formatMessage({
            id: "label.add_place",
          })}
          onPress={() => onClickAddPlace(dataArr?.length + 1)}
        />
        <CommonText customTextStyle={styles.mandatoryTextStyle}>
          {intl.formatMessage({
            id: "label.one_mandatory",
          })}
        </CommonText>
      </>
    );
  };

  const renderCustomMultiRowComponent = () => {
    return (
      <CustomMultiRowTextInput
        customCardStyle={{
          ...styles.multiRowTextStyle,
        }}
        customTableStyle={styles.tableStyle}
        customWebContainerStyle={
          isEditable
            ? styles.customWebContainerStyle
            : styles.customViewModeStyle
        }
        startRowTemplate={[...startRowTemplateConfig.current]}
        gridTemplate={headContactDetails}
        setGridTemplate={setHeadContactDetails}
        numColsInARow={9}
        isEditProfile={isEditable}
        handleValueChange={({ propertyName, value, id, cellID }) => {
          handleHeadContactDetails({
            propertyName,
            value,
            id,
            cellID,
          });
        }}
        getColoumConfigs={getColoumConfigs}
        tableData={nonEditableData}
        tableHeading={ADD_PREINTERVIEW_PREFERNCES_HEADING}
        isHeading
        headerId={"label.head_contacts"}
        footerId={"label.at_least_one_mandatory_with_star"}
      />
    );
  };

  const JobDetailsConfig = [
    {
      content: (
        <DetailCard
          headerId={"label.pre_interview_prefrences"}
          details={preInterviewDetails?.preInterviewPrefrences}
          handleChange={handleInterviewPreferences}
          isEditProfile={isEditable}
          customCardStyle={styles.cardStyle}
          customContainerStyle={styles.customContainerStyle(windowWidth)}
        />
      ),
    },
    {
      content: isEditable ? (
        isWebView ? (
          renderCustomMultiRowComponent()
        ) : (
          <CardComponent customStyle={styles.CardComponentStyle}>
            {renderAddContactDetailsMob()}
          </CardComponent>
        )
      ) : (
        <>
          <CardComponent customStyle={styles.CardComponentStyle}>
            <CommonText customTextStyle={commonStyles.headingStyle}>
              {intl.formatMessage({ id: "label.head_contacts" })}
            </CommonText>
            {isWebView
              ? renderCustomMultiRowComponent()
              : renderAddContactDetailsMob()}
          </CardComponent>
          {(addDetailsModal || contactDetails) && (
            <ModalWithTitleButton
              enableBottomButton
              heading={intl.formatMessage({
                id: "label.add_contact",
              })}
              leftLabelTxt={intl.formatMessage({
                id: "label.cancel",
              })}
              rightLabelTxt={intl.formatMessage({
                id: "label.add",
              })}
              customStyles={styles.customModalStyle}
              onClickLeftButton={onClickAddPlaceCancelButton}
              onClickRightButton={onClickAddPlaceSaveButton}
            >
              <ScrollView style={styles.ctcTextInputStyle}>
                <DetailCard
                  details={headContactDetails}
                  handleChange={(label, inputValue, index, id, changedCellID) =>
                    handleHeadContactDetails({
                      propertyName: label,
                      value: inputValue,
                      id,
                      cellID: changedCellID,
                    })
                  }
                  isEditProfile
                  customCardStyle={styles.modalCardStyle}
                  // customContainerStyle={styles.customContainerStyle(
                  //   windowWidth
                  // )}
                />
              </ScrollView>
            </ModalWithTitleButton>
          )}
        </>
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
          {isEditable ? (
            <ActionPairButton
              buttonOneText={intl.formatMessage({ id: "label.cancel" })}
              buttonTwoText={intl.formatMessage({
                id: "label.save_and_next",
              })}
              onPressButtonOne={() => {
                isEditable ? setIsEditable(false) : navigate(-1);
              }}
              onPressButtonTwo={() => {
                handleSaveAndNext();
              }}
              customStyles={{
                ...isWebProps,
                customContainerStyle: commonStyles.customContainerStyle,
              }}
              displayLoader={isLoadingUpdateContactData}
              isButtonTwoGreen
              isLoading={isLoadingUpdateContactData}
              isDisabled={errorOnPage || isLoadingUpdateContactData}
            />
          ) : (
            <CustomButton
              withGreenBackground
              style={styles.buttonStyle}
              onPress={() => {
                tabHandler("next");
              }}
            >
              <CommonText
                fontWeight={"600"}
                customTextStyle={commonStyles.nextButtonStyle}
              >
                {intl.formatMessage({ id: "label.next" })}
              </CommonText>
            </CustomButton>
          )}
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
