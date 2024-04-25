import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { View, ScrollView } from "@unthinkable/react-core-components";
import { useTheme } from "@unthinkable/react-theme";

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
import useIsWebView from "../../hooks/useIsWebView";
import CustomMultiRowTextInput from "../CustomMultiRowTextinput";
import RenderHeadingAndValue from "../RenderHeadingAndValue/RenderHeadingAndValue";
import commonStyles from "../../theme/styles/commonStyles";
import getStyles from "./AddPlaceOfPosting.style";
import MultiRow from "../../core/layouts/MultiRow";
import { TwoColumn } from "../../core/layouts";

const AddPlaceOfPostingTemplate = ({
  isEditable,
  addPostingDetailsField,
  isSpecificPerformaRequired,
  handleInputChange,
  addPlaceModal,
  nonEditableData,
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
  const theme = useTheme();
  const styles = getStyles(theme);

  const setObjectGridTemplate = (updatedDocs) => {
    setRenderJobDetails((prev) => ({
      ...prev,
      posting_details: [...updatedDocs],
    }));
  };

  const getColoumConfigs = (item, isHeading) => {
    const tableStyle = isHeading
      ? commonStyles.tableHeadingText
      : commonStyles.cellTextStyle();
    return [
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item?.place_of_posting || "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item?.general || "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("10%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item?.obc || "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("10%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item?.sc || "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("10%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item?.st || "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("10%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item?.ph || "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("10%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item?.others || "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("10%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item?.total || "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("10%"),
        isFillSpace: true,
      },
    ];
  };

  const dataArr = Object.values(
    requiredPostingPlaceDetail.reduce((acc, item) => {
      if (!acc[item.cellID]) acc[item.cellID] = {};
      const group = acc[item.cellID];

      if (item.key === "place_of_posting") {
        group.place_of_posting = item.value;
      } else if (item.key === "general") {
        group.general = item.value;
      } else if (item.key === "obc") {
        group.obc = item.value;
      } else if (item.key === "sc") {
        group.sc = item.value;
      } else if (item.key === "st") {
        group.st = item.value;
      } else if (item.key === "ph") {
        group.ph = item.value;
      } else if (item.key === "others") {
        group.others = item.value;
      } else if (item.key === "total") {
        group.total = item.value;
      } else {
        group.cellID = item.cellID;
      }

      return acc;
    }, {})
  );

  const categoriesRow = [
    {
      content: (
        <View>
          <CounterInput
            label={intl.formatMessage({
              id: "label.general",
            })}
            isMandatory
            onCountChange={(val) => handlePostingPlaceChange("general", val)}
          />
          <CounterInput
            label={intl.formatMessage({
              id: "label.obc",
            })}
            isMandatory
            onCountChange={(val) => handlePostingPlaceChange("obc", val)}
          />
        </View>
      ),
    },
    {
      content: (
        <View>
          <CounterInput
            label={intl.formatMessage({
              id: "label.sc",
            })}
            isMandatory
            onCountChange={(val) => handlePostingPlaceChange("sc", val)}
          />
          <CounterInput
            label={intl.formatMessage({
              id: "label.st",
            })}
            isMandatory
            onCountChange={(val) => handlePostingPlaceChange("st", val)}
          />
        </View>
      ),
    },
    {
      content: (
        <View>
          <CounterInput
            label={intl.formatMessage({
              id: "label.ph",
            })}
            isMandatory
            onCountChange={(val) => handlePostingPlaceChange("ph", val)}
          />
          <CounterInput
            label={intl.formatMessage({
              id: "label.others",
            })}
            isMandatory
            onCountChange={(val) => handlePostingPlaceChange("others", val)}
          />
        </View>
      ),
    },
  ];

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
                    topText={item?.place_of_posting}
                    bottomLeftText={`Total Postings: ${item?.total || "0"}`}
                    onDeleteDocument={() => {
                      onClickDeletePlace(item.cellID);
                    }}
                    onEditDocument={() => {
                      onCLickEditPlace(item.cellID);
                    }}
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
        )}
      </CardComponent>
      {(addPlaceModal || editPlaceModal) && (
        <ModalWithTitleButton
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
          <ScrollView style={styles.ctcTextInputStyle}>
            <CustomTextInput
              label={intl.formatMessage({
                id: "label.place_posting",
              })}
              placeholder={intl.formatMessage({
                id: "label.enter_place_posting",
              })}
              isMandatory
              value={postingPlaceDetail?.place_of_posting}
              onChangeText={(val) =>
                handlePostingPlaceChange(PLACE_OF_POSTING.POSTING_PLACE, val)
              }
            />
            <View style={styles.postingPlaceView}>
              <View style={styles.postingPlaceMapView}>
                <MultiRow rows={categoriesRow} />
              </View>
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
          </ScrollView>
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
  jobDetailData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
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
