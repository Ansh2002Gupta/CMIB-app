import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import AddIconText from "../../components/AddIconText";
import CardComponent from "../../components/CardComponent/CardComponent";
import CommonText from "../../components/CommonText";
import CounterInput from "../../components/CounterInput";
import CustomToggleComponent from "../../components/CustomToggleComponent/CustomToggleComponent";
import CustomTextInput from "../../components/CustomTextInput";
import EditDeleteAction from "../../components/EditDeleteAction/EditDeleteAction";
import ModalWithTitleButton from "../../components/ModalWithTitleButton";
import { numericValidator } from "../../utils/validation";
import {
  ADD_PLACE_OF_POSTING_HEADING,
  OTHER_INFO_MAX_LENGTH,
  PLACE_OF_POSTING,
} from "../../constants/constants";
import styles from "./AddPlaceOfPosting.style";
import useIsWebView from "../../hooks/useIsWebView";
import CustomMultiRowTextInput from "../CustomMultiRowTextinput";
import RenderHeadingAndValue from "../RenderHeadingAndValue/RenderHeadingAndValue";
import commonStyles from "../../theme/styles/commonStyles";

const AddPlaceOfPostingTemplate = ({
  isEditable,
  addPostingDetailsField,
  isSpecificPerformaRequired,
  handleInputChange,
  addPlaceModal,
  editPlaceModal,
  handlePostingPlaceChange,
  handleMultiRowDocumentDetails,
  isFormValid,
  jobDetailData,
  onClickAddPlace,
  onClickAddPlaceCancelButton,
  onClickAddPlaceSaveButton,
  onClickDeletePlace,
  onCLickEditPlace,
  postingPlaceDetail,
  requiredPostingPlaceDetail,
  setRenderJobDetails,
  otherInfo,
}) => {
  const intl = useIntl();
  const { isWebView } = useIsWebView();

  const setObjectGridTemplate = (updatedDocs) => {
    setRenderJobDetails((prev) => ({
      ...prev,
      posting_details: [...updatedDocs],
    }));
  };

  function mapPosting(dataArray) {
    const groupedData = {};
    dataArray.forEach((item) => {
      if (!groupedData[item.cellID]) {
        groupedData[item.cellID] = {};
      }
      switch (item.key) {
        case "place_of_posting":
          groupedData[item.cellID].place_of_posting = item.value;
          break;
        case "general":
          groupedData[item.cellID].general = item.value;
          break;
        case "obc":
          groupedData[item.cellID].obc = item.value;
          break;
        case "sc":
          groupedData[item.cellID].sc = item.value;
          break;
        case "st":
          groupedData[item.cellID].st = item.value;
          break;
        case "ph":
          groupedData[item.cellID].ph = item.value;
          break;
        case "others":
          groupedData[item.cellID].others = item.value;
          break;
        case "total":
          groupedData[item.cellID].total = item.value;
          break;
      }
    });
    const result = Object.keys(groupedData).map((key) => {
      return groupedData[key];
    });
    return result;
  }
  const nonEditableData = mapPosting(requiredPostingPlaceDetail);

  const getColoumConfigs = (item, isHeading) => {
    const tableStyle = isHeading
      ? commonStyles.tableHeadingText
      : commonStyles.cellTextStyle();
    return [
      {
        content: (
          <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
            {item?.place_of_posting || "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
            {item?.general || "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("10%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
            {item?.obc || "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("10%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
            {item?.sc || "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("10%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
            {item?.st || "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("10%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
            {item?.ph || "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("10%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
            {item?.others || "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("10%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
            {item?.total || "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("10%"),
        isFillSpace: true,
      },
    ];
  };

  return (
    <View>
      <CardComponent customStyle={styles.bottomMargin}>
        {isEditable ? (
          <CustomToggleComponent
            label={intl.formatMessage({
              id: "label.company_require_any_other_perfoma",
            })}
            customToggleStyle={styles.companyRequireToggleStyle}
            customLabelViewStyle={styles.toggleLabelViewStyle}
            value={isSpecificPerformaRequired}
            onValueChange={(val) => {
              handleInputChange("specific_performa_required", val);
            }}
          />
        ) : (
          <RenderHeadingAndValue
            label={intl.formatMessage({
              id: "label.company_require_any_other_perfoma",
            })}
            value={isSpecificPerformaRequired === 0 ? "Yes" : "No"}
            isMandatory={true}
          />
        )}

        <CommonText
          fontWeight="600"
          customTextStyle={styles.otherInformationTextStyle}
        >
          {intl.formatMessage({
            id: "label.any_other_information",
          })}
        </CommonText>
        {isEditable ? (
          <CustomTextInput
            placeholder={intl.formatMessage({
              id: "label.enter_your_info",
            })}
            isMandatory
            isMultiline
            maxLength={OTHER_INFO_MAX_LENGTH}
            value={otherInfo}
            onChangeText={(val) => handleInputChange("otherInfo", val)}
            customHandleBlur={(val) => {}}
          />
        ) : (
          <RenderHeadingAndValue
            label={intl.formatMessage({
              id: "label.enter_your_info",
            })}
            value={otherInfo}
            isMandatory={true}
          />
        )}

        <CommonText
          fontWeight="600"
          customTextStyle={styles.postingPlaceTextStyle}
        >
          {intl.formatMessage({
            id: "label.place_of_posting",
          })}
        </CommonText>
        {isWebView ? (
          <CustomMultiRowTextInput
            customWebContainerStyle={styles.customWebContainerStyle}
            customCardStyle={styles.multiRowTextStyle}
            startRowTemplate={addPostingDetailsField}
            gridTemplate={requiredPostingPlaceDetail}
            isEditProfile={isEditable}
            setObjectGridTemplate={setObjectGridTemplate}
            handleValueChange={(type, inputValue, cellId) => {
              handleMultiRowDocumentDetails(type, inputValue, cellId);
            }}
            getColoumConfigs={getColoumConfigs}
            tableData={nonEditableData}
            tableHeading={ADD_PLACE_OF_POSTING_HEADING}
            isHeading
          />
        ) : (
          <>
            {requiredPostingPlaceDetail.map((item, index) => {
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
                    topText={item?.postingPlace}
                    bottomLeftText={`Total Postings: ${item?.total || "0"}`}
                    onDeleteDocument={() => {
                      onClickDeletePlace(index);
                    }}
                    onEditDocument={() => {
                      onCLickEditPlace(index);
                    }}
                    isCategory
                    requiredPostingPlaceDetail={
                      requiredPostingPlaceDetail[index]
                    }
                  />
                </View>
              );
            })}
            <AddIconText
              customViewStyle={styles.customAddIconStyle}
              label={intl.formatMessage({
                id: "label.add_place",
              })}
              onPress={onClickAddPlace}
            />
            <CommonText customTextStyle={styles.mandatoryTextStyle}>
              {intl.formatMessage({
                id: "label.one_mandatory",
              })}
            </CommonText>
          </>
        )}
      </CardComponent>
      {(addPlaceModal || editPlaceModal) && (
        <ModalWithTitleButton
          isRightDisabled={!isFormValid}
          enableBottomButton
          heading={intl.formatMessage({
            id: "label.add_place_of_posting",
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
          <View style={styles.ctcTextInputStyle}>
            <CustomTextInput
              label={intl.formatMessage({
                id: "label.place_posting",
              })}
              placeholder={intl.formatMessage({
                id: "label.enter_place_posting",
              })}
              isMandatory
              value={postingPlaceDetail?.postingPlace}
              onChangeText={(val) =>
                handlePostingPlaceChange(PLACE_OF_POSTING.POSTING_PLACE, val)
              }
            />
            <View style={styles.postingPlaceView}>
              {!!jobDetailData?.Posting_Place?.length &&
                jobDetailData?.Posting_Place.map((detail, index) => {
                  return (
                    <View key={index} style={styles.postingPlaceMapView}>
                      <CounterInput
                        label={intl.formatMessage({ id: detail.label })}
                        isMandatory
                        onCountChange={(val) =>
                          handlePostingPlaceChange(detail.key, val)
                        }
                      />
                    </View>
                  );
                })}
            </View>
            <CustomTextInput
              label={intl.formatMessage({
                id: "label.total",
              })}
              placeholder={intl.formatMessage({
                id: "label.total",
              })}
              isMandatory
              value={postingPlaceDetail?.total}
              onChangeText={(val) =>
                numericValidator(val) &&
                handlePostingPlaceChange(PLACE_OF_POSTING.TOTAL, val)
              }
            />
          </View>
        </ModalWithTitleButton>
      )}
    </View>
  );
};

AddPlaceOfPostingTemplate.defaultProps = {
  addPlaceModal: false,
  editPlaceModal: false,
  handlePostingPlaceChange: () => {},
  isFormValid: false,
  jobDetailData: {},
  onClickAddPlace: () => {},
  onClickAddPlaceCancelButton: () => {},
  onClickAddPlaceSaveButton: () => {},
  onClickDeletePlace: () => {},
  onCLickEditPlace: () => {},
  postingPlaceDetail: {
    postingPlace: "",
    total: 0,
  },
  requiredPostingPlaceDetail: [],
};

AddPlaceOfPostingTemplate.propTypes = {
  addPlaceModal: PropTypes.bool.isRequired,
  editPlaceModal: PropTypes.bool.isRequired,
  handlePostingPlaceChange: PropTypes.func.isRequired,
  isFormValid: PropTypes.bool,
  jobDetailData: PropTypes.object,
  onClickAddPlace: PropTypes.func.isRequired,
  onClickAddPlaceCancelButton: PropTypes.func.isRequired,
  onClickAddPlaceSaveButton: PropTypes.func.isRequired,
  onClickDeletePlace: PropTypes.func.isRequired,
  onCLickEditPlace: PropTypes.func.isRequired,
  postingPlaceDetail: PropTypes.shape({
    postingPlace: PropTypes.string,
    total: PropTypes.number,
  }).isRequired,
  requiredPostingPlaceDetail: PropTypes.arrayOf(
    PropTypes.shape({
      postingPlace: PropTypes.string,
      total: PropTypes.number,
    })
  ).isRequired,
};

export default AddPlaceOfPostingTemplate;
