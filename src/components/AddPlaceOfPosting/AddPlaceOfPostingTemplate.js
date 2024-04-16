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
import { PLACE_OF_POSTING } from "../../constants/constants";
import styles from "./AddPlaceOfPosting.style";

const AddPlaceOfPostingTemplate = ({
  addPlaceModal,
  editPlaceModal,
  handlePostingPlaceChange,
  isFormValid,
  jobDetailData,
  onClickAddPlace,
  onClickAddPlaceCancelButton,
  onClickAddPlaceSaveButton,
  onClickDeletePlace,
  onCLickEditPlace,
  postingPlaceDetail,
  requiredPostingPlaceDetail,
}) => {
  const intl = useIntl();
  console.log("jobDetailData", jobDetailData);

  return (
    <View>
      <CardComponent customStyle={styles.bottomMargin}>
        <CustomToggleComponent
          label={intl.formatMessage({
            id: "label.company_require_any_other_perfoma",
          })}
          customToggleStyle={styles.companyRequireToggleStyle}
          customLabelViewStyle={styles.toggleLabelViewStyle}
        />
        <CommonText
          fontWeight="600"
          customTextStyle={styles.otherInformationTextStyle}
        >
          {intl.formatMessage({
            id: "label.any_other_information",
          })}
        </CommonText>
        <CommonText
          fontWeight="600"
          customTextStyle={styles.postingPlaceTextStyle}
        >
          {intl.formatMessage({
            id: "label.place_of_posting",
          })}
        </CommonText>
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
                requiredPostingPlaceDetail={requiredPostingPlaceDetail[index]}
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
                  console.log("detail", detail);

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
