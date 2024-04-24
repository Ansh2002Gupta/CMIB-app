import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { TouchableOpacity, View } from "@unthinkable/react-core-components";
import { MediaQueryContext } from "@unthinkable/react-theme";

import CardComponent from "../../../../components/CardComponent/CardComponent";
import CommonText from "../../../../components/CommonText";
import CustomImage from "../../../../components/CustomImage";
import CustomTextInput from "../../../../components/CustomTextInput";
import CustomTextEditor from "../../../../components/CustomTextEditor/CustomTextEditor";
import CustomToggleComponent from "../../../../components/CustomToggleComponent/CustomToggleComponent";
import DetailCard from "../../../../components/DetailCard";
import MultiRow from "../../../../core/layouts/MultiRow";
import useIsWebView from "../../../../hooks/useIsWebView";
import { gridStyles } from "../../../../theme/styles/commonStyles";
import { numericValidator } from "../../../../utils/validation";
import images from "../../../../images";
import styles from "./JobDetails.style";
import { JOB_TYPE, NEWLY_QUALIFIED } from "../../../../constants/constants";
import AddDocument from "../../../../components/AddDocument";
import AddPlaceOfPosting from "../../../../components/AddPlaceOfPosting";
import CustomScrollView from "../../../../components/CustomScrollView";
import ConfigurableList from "../../../../components/ConfigurableList";
import { getDocumentField, getPlaceOfPostingDetails } from "./MappedData";
import useGetCurrentUser from "../../../../hooks/useGetCurrentUser";
import RenderHeadingAndValue from "../../../../components/RenderHeadingAndValue/RenderHeadingAndValue";

const JobDetailsTemplate = ({
  validateError,
  isEditable,
  renderJobDetails,
  handleInputChange,
  configurableListQuery,
  setConfigurableListQuery,
  workExperienceOptions,
  menuOptions,
  setMenuOptions,
  handlePress,
  handleAdd,
  handleDelete,
  handleBlur,
  selectedOptions,
  desginationItems,
  setRenderJobDetails,
  addDesignation,
  handleMonthlyData,
  handleYearlyData,
  onClickAddDesignation,
}) => {
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const { isWebView } = useIsWebView();
  const intl = useIntl();
  const { currentModule } = useGetCurrentUser();

  const columnCount = isWebView && gridStyles[currentBreakpoint];
  const containerStyle = isWebView
    ? styles.containerGridStyle(columnCount)
    : styles.containerStyle;

  const EXPERIENCE_RANGE = workExperienceOptions.map((item) => {
    return {
      label: `${item.work_experience_min || ""} - ${
        item.work_experience_max || "above"
      }`,
      value: item.id,
    };
  });

  const JobDetailsConfig = [
    {
      content: (
        <TouchableOpacity
          onPress={onClickAddDesignation}
          style={styles.addDesignationView}
        >
          <CardComponent customStyle={styles.customCardComponentStyle}>
            <CustomImage Icon={images.iconAdd} isSvg source={images.iconAdd} />
            <CommonText
              customTextStyle={styles.addDesignationTextStyle}
              fontWeight="600"
            >
              {intl.formatMessage({ id: "label.add_designation" })}
            </CommonText>
          </CardComponent>
        </TouchableOpacity>
      ),
    },
    {
      content: (
        <CardComponent customStyle={styles.bottomMargin}>
          {isEditable ? (
            <CustomTextInput
              label={intl.formatMessage({ id: "label.designation_name" })}
              placeholder={intl.formatMessage({
                id: "label.enter_designation_name",
              })}
              isMandatory
              value={renderJobDetails?.designation}
              onChangeText={(val) => handleInputChange("designation", val)}
              customHandleBlur={() => handleBlur("designation")}
              isError={!!validateError?.designation}
              errorMessage={validateError?.designation}
            />
          ) : (
            <RenderHeadingAndValue
              label={intl.formatMessage({ id: "label.designation" })}
              value={renderJobDetails?.designation}
              isMandatory={true}
            />
          )}

          <View style={containerStyle}>
            {isEditable ? (
              <CustomTextInput
                customStyle={isWebView && { ...styles.bondCustomInputStyle }}
                label={intl.formatMessage({ id: "label.compensation" })}
                placeholder={intl.formatMessage({
                  id: "label.enter_compensation",
                })}
                isMandatory
                isRupee
                isNumeric
                value={renderJobDetails?.compensation}
                onChangeText={(val) => handleInputChange("compensation", val)}
                customHandleBlur={() => handleBlur("compensation")}
                isError={!!validateError?.compensation}
                errorMessage={validateError?.compensation}
              />
            ) : (
              <RenderHeadingAndValue
                label={intl.formatMessage({ id: "label.compensation" })}
                value={renderJobDetails?.compensation}
                isMandatory={true}
              />
            )}
            {isEditable ? (
              <CustomTextInput
                label={intl.formatMessage({
                  id: "label.starting_salary_including_perks",
                })}
                placeholder={intl.formatMessage({
                  id: "label.enter_starting_salary_including_perks",
                })}
                isMandatory
                isRupee
                isNumeric
                value={renderJobDetails?.starting_salary}
                onChangeText={(val) =>
                  handleInputChange("starting_salary", val)
                }
                customHandleBlur={() => handleBlur("starting_salary")}
                isError={!!validateError?.starting_salary}
                errorMessage={validateError?.starting_salary}
              />
            ) : (
              <RenderHeadingAndValue
                label={intl.formatMessage({
                  id: "label.starting_salary_including_perks",
                })}
                value={renderJobDetails?.starting_salary}
                isMandatory={true}
              />
            )}
          </View>
          <CustomTextEditor
            label={intl.formatMessage({
              id: "label.roles_and_responsibility",
            })}
            value={renderJobDetails?.role_responsibility}
            isMandatory
            onChangeText={(val) =>
              handleInputChange("role_responsibility", val)
            }
            disabled={!isEditable}
            customHandleBlur={() => handleBlur("role_responsibility")}
            errorMessage={validateError?.role_responsibility}
          />
          {isEditable ? (
            <CustomTextInput
              customStyle={styles.ctcTextInputStyle}
              label={intl.formatMessage({
                id: "label.details_of_ctc",
              })}
              placeholder={intl.formatMessage({
                id: "label.enter_details_of_ctc",
              })}
              isMandatory
              value={renderJobDetails?.ctc_details}
              onChangeText={(val) => handleInputChange("ctc_details", val)}
              customHandleBlur={() => handleBlur("ctc_details")}
              isError={!!validateError?.ctc_details}
              errorMessage={validateError?.ctc_details}
            />
          ) : (
            <RenderHeadingAndValue
              label={intl.formatMessage({
                id: "label.details_of_ctc",
              })}
              value={renderJobDetails?.ctc_details}
              isMandatory={true}
            />
          )}

          <View style={styles.overseasContainerStyles}>
            {currentModule !== NEWLY_QUALIFIED && (
              <>
                {isEditable ? (
                  <CustomTextInput
                    customStyle={styles.dropdownInputStyle}
                    label={intl.formatMessage({
                      id: "label.work_experience_range",
                    })}
                    placeholder={intl.formatMessage({
                      id: "label.select_work_experience_range",
                    })}
                    isDropdown
                    options={EXPERIENCE_RANGE}
                    value={renderJobDetails?.work_exp_range_id}
                    onChangeValue={(val) =>
                      handleInputChange("work_exp_range_id", val)
                    }
                  />
                ) : (
                  <RenderHeadingAndValue
                    label={intl.formatMessage({
                      id: "label.work_experience_range",
                    })}
                    value={renderJobDetails?.work_exp_range_id}
                    isMandatory={true}
                  />
                )}
                {isEditable ? (
                  <CustomToggleComponent
                    label={intl.formatMessage({
                      id: "label.fexi_hours",
                    })}
                    value={renderJobDetails?.flexi_hours}
                    onValueChange={(val) => {
                      handleInputChange("flexi_hours", val);
                    }}
                    isMandatory
                    customToggleStyle={styles.customToggleStyle}
                    customLabelStyle={styles.customLabelStyle}
                  />
                ) : (
                  <RenderHeadingAndValue
                    label={intl.formatMessage({
                      id: "label.fexi_hours",
                    })}
                    value={renderJobDetails?.flexi_hours}
                    isMandatory={true}
                  />
                )}
                {isEditable ? (
                  <CustomTextInput
                    customStyle={styles.dropdownInputStyle}
                    label={intl.formatMessage({
                      id: "label.job_type",
                    })}
                    isDropdown
                    options={JOB_TYPE}
                    placeholder={intl.formatMessage({
                      id: "label.select_job_type",
                    })}
                    value={renderJobDetails?.job_type}
                    onChangeValue={(val) => handleInputChange("job_type", val)}
                  />
                ) : (
                  <RenderHeadingAndValue
                    label={intl.formatMessage({
                      id: "label.job_type",
                    })}
                    value={renderJobDetails?.job_type}
                    isMandatory={true}
                  />
                )}
              </>
            )}
          </View>
        </CardComponent>
      ),
    },
    {
      content: (
        <View style={styles.bottomMargin}>
          <DetailCard
            headerId={"label.monthly"}
            details={renderJobDetails?.monthly}
            handleChange={handleMonthlyData}
            isEditProfile={isEditable}
            customCardStyle={styles.monthlyCustomCardStyle}
          />
          <DetailCard
            headerId={"label.yearly"}
            details={renderJobDetails?.yearly}
            handleChange={handleYearlyData}
            isEditProfile={isEditable}
            customCardStyle={styles.yearlyCustomCardStyle}
          />
        </View>
      ),
    },
    {
      content: (
        <AddDocument
          {...{
            isEditable,
            requiredDocumentDetails: renderJobDetails?.required_docs,
            setRenderJobDetails,
            addDocumentField: getDocumentField(),
          }}
        />
      ),
    },
    {
      content: (
        <CardComponent customStyle={styles.bottomMargin}>
          <View style={styles.bondIfAnyView}>
            <CommonText customTextStyle={styles.bondIfAnyText} fontWeight="600">
              {intl.formatMessage({
                id: "label.bond_if_any",
              })}
            </CommonText>
          </View>
          <View style={containerStyle}>
            {isEditable ? (
              <CustomToggleComponent
                label={intl.formatMessage({
                  id: "label.bond_required",
                })}
                value={renderJobDetails?.bond_details?.is_bond_included}
                onValueChange={(val) => {
                  handleInputChange("bond_details", val, "is_bond_included");
                }}
                isMandatory
                customToggleStyle={styles.customToggleStyle}
                customLabelStyle={styles.customLabelStyle}
              />
            ) : (
              <RenderHeadingAndValue
                label={intl.formatMessage({
                  id: "label.bond_required",
                })}
                value={
                  renderJobDetails?.bond_details?.is_bond_included === 0
                    ? "Yes"
                    : "No"
                }
                isMandatory={true}
              />
            )}

            {renderJobDetails?.bond_details?.is_bond_included === 0 && (
              <>
                {isEditable ? (
                  <CustomTextInput
                    customStyle={
                      isWebView && { ...styles.bondCustomInputStyle }
                    }
                    label={intl.formatMessage({
                      id: "label.months_bond_period",
                    })}
                    placeholder={intl.formatMessage({
                      id: "label.enter_months_bond_period",
                    })}
                    isMandatory
                    value={renderJobDetails?.bond_details?.bond_period_in_mm}
                    onChangeText={(val) =>
                      numericValidator(val) &&
                      handleInputChange(
                        "bond_details",
                        val,
                        "bond_period_in_mm"
                      )
                    }
                  />
                ) : (
                  <RenderHeadingAndValue
                    label={intl.formatMessage({
                      id: "label.months_bond_period",
                    })}
                    value={renderJobDetails?.bond_details?.bond_period_in_mm}
                    isMandatory={true}
                  />
                )}
                {isEditable ? (
                  <CustomTextInput
                    customStyle={
                      isWebView && { ...styles.bondCustomInputStyle }
                    }
                    label={intl.formatMessage({
                      id: "label.exit_amount",
                    })}
                    placeholder={intl.formatMessage({
                      id: "label.enter_exit_amount",
                    })}
                    isMandatory
                    value={renderJobDetails?.bond_details?.exit_amount}
                    onChangeText={(val) =>
                      numericValidator(val) &&
                      handleInputChange("bond_details", val, "exit_amount")
                    }
                    isRupee
                  />
                ) : (
                  <RenderHeadingAndValue
                    label={intl.formatMessage({
                      id: "label.exit_amount",
                    })}
                    value={renderJobDetails?.bond_details?.exit_amount}
                    isMandatory={true}
                  />
                )}
              </>
            )}
          </View>
        </CardComponent>
      ),
    },
    {
      content: (
        <AddPlaceOfPosting
          {...{
            isEditable,
            handleInputChange,
            jobDetailData: renderJobDetails?.posting_details,
            requiredPostingPlaceDetail: renderJobDetails?.posting_details,
            setRenderJobDetails,
            addPostingDetailsField: getPlaceOfPostingDetails(),
            isSpecificPerformaRequired:
              renderJobDetails?.specific_performa_required,
            otherInfo: renderJobDetails?.otherInfo,
          }}
        />
      ),
    },
  ];

  let filteredJobDetailsConfig = [];
  let filteredWebJobDetailsConfig = [];
  if (currentBreakpoint === "xs") {
    if (!addDesignation) {
      filteredJobDetailsConfig = JobDetailsConfig.slice(0, 1);
    } else {
      filteredJobDetailsConfig = JobDetailsConfig.filter(
        (_, index) => index !== 0
      );
    }
  } else {
    filteredWebJobDetailsConfig = JobDetailsConfig.filter(
      (_, index) => index !== 0
    );
  }

  return (
    <CustomScrollView style={styles.scrollViewStyle}>
      {currentBreakpoint === "xs" ? (
        <MultiRow rows={filteredJobDetailsConfig} />
      ) : (
        <View style={styles.mainContainer}>
          <View style={styles.leftSectionStyle}>
            <ConfigurableList
              customOuterContianer={styles.configurableStyle}
              componentContainer={styles.componentContainer}
              title={intl.formatMessage({ id: "label.desgination" })}
              searchQuery={configurableListQuery}
              setSearchQuery={setConfigurableListQuery}
              selectedOptions={selectedOptions}
              onDelete={handleDelete}
              onPress={handlePress}
              onAdd={handleAdd}
              options={desginationItems}
              menuOptions={menuOptions}
              setMenuOptions={setMenuOptions}
              nameField={"designation"}
              isEditable={isEditable}
            />
          </View>
          <View style={styles.innerContainerStyle}>
            {!!selectedOptions.length ? (
              <MultiRow rows={filteredWebJobDetailsConfig} />
            ) : (
              <CardComponent customStyle={styles.emptyCard}>
                <CommonText
                  fontWeight={"600"}
                  customTextStyle={styles.selectionProcessStyle}
                >
                  {intl.formatMessage({ id: "label.click_on_add_button" })}
                </CommonText>
              </CardComponent>
            )}
          </View>
        </View>
      )}
    </CustomScrollView>
  );
};

JobDetailsTemplate.defaultProps = {
  addDesignation: false,
  bondPeriod: "",
  compensation: "",
  CTCDetail: "",
  designationName: "",
  exitAmount: "",
  handleBondPeriod: () => {},
  handleCompensation: () => {},
  handleCTCDetail: () => {},
  handleDesignationName: () => {},
  handleExitAmount: () => {},
  handleMonthlyData: () => {},
  handleStartingSalary: () => {},
  handleYearlyData: () => {},
  handleToggle: () => {},
  jobDetailData: { monthly: "", yearly: "" },
  onClickAddDesignation: () => {},
  selectionProcess: [],
  startingSalary: "",
};

JobDetailsTemplate.propTypes = {
  addDesignation: PropTypes.bool,
  bondPeriod: PropTypes.string,
  compensation: PropTypes.string,
  CTCDetail: PropTypes.string,
  designationName: PropTypes.string,
  exitAmount: PropTypes.string,
  handleBondPeriod: PropTypes.func,
  handleCompensation: PropTypes.func,
  handleCTCDetail: PropTypes.func,
  handleDesignationName: PropTypes.func,
  handleExitAmount: PropTypes.func,
  handleMonthlyData: PropTypes.func,
  handleStartingSalary: PropTypes.func,
  handleYearlyData: PropTypes.func,
  handleToggle: PropTypes.func,
  jobDetailData: PropTypes.shape({
    monthly: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    yearly: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  }),
  onClickAddDesignation: PropTypes.func,
  selectionProcess: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
      isSelected: PropTypes.bool,
    })
  ),
  startingSalary: PropTypes.string,
};

export default JobDetailsTemplate;
