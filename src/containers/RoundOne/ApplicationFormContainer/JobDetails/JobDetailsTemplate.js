import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Platform,
} from "@unthinkable/react-core-components";
import { MediaQueryContext } from "@unthinkable/react-theme";

import CardComponent from "../../../../components/CardComponent/CardComponent";
import CheckBox from "../../../../components/CheckBox";
import CommonText from "../../../../components/CommonText";
import CustomImage from "../../../../components/CustomImage";
import CustomTextInput from "../../../../components/CustomTextInput";
import CustomTextEditor from "../../../../components/CustomTextEditor/CustomTextEditor";
import CustomToggleComponent from "../../../../components/CustomToggleComponent/CustomToggleComponent";
import DetailCard from "../../../../components/DetailCard";
import MultiRow from "../../../../core/layouts/MultiRow";
import TwoColumn from "../../../../core/layouts/TwoColumn/TwoColumn";
import useIsWebView from "../../../../hooks/useIsWebView";
import commonStyles, {
  gridStyles,
} from "../../../../theme/styles/commonStyles";
import { numericValidator } from "../../../../utils/validation";
import images from "../../../../images";
import styles from "./JobDetails.style";
import {
  DOCUMENT_TYPE,
  SCHEDULE_INTERVIEW_ADDRESS_MAX_LENGTH,
} from "../../../../constants/constants";
import AddDocument from "../../../../components/AddDocument";
import AddPlaceOfPosting from "../../../../components/AddPlaceOfPosting";
import CustomScrollView from "../../../../components/CustomScrollView";
import ConfigurableList from "../../../../components/ConfigurableList";
import { getDocumentField, getPlaceOfPostingDetails } from "./MappedData";
import useGetCurrentUser from "../../../../hooks/useGetCurrentUser";

const JobDetailsTemplate = ({
  renderJobDetails,
  handleInputChange,
  configurableListQuery,
  setConfigurableListQuery,
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

  console.log("currentModule", currentModule);

  const columnCount = isWebView && gridStyles[currentBreakpoint];
  const containerStyle = isWebView
    ? styles.containerGridStyle(columnCount)
    : styles.containerStyle;

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
          <CustomTextInput
            label={intl.formatMessage({ id: "label.designationName" })}
            placeholder={intl.formatMessage({
              id: "label.enter_designationName",
            })}
            isMandatory
            value={renderJobDetails?.designation}
            onChangeText={(val) => handleInputChange("designation", val)}
            customHandleBlur={(val) => handleBlur("designation", val)}
          />
          <View style={containerStyle}>
            <CustomTextInput
              customStyle={isWebView && { ...styles.bondCustomInputStyle }}
              label={intl.formatMessage({ id: "label.compensation" })}
              placeholder={intl.formatMessage({
                id: "label.enter_compensation",
              })}
              isMandatory
              isRupee
              value={renderJobDetails?.compensation}
              onChangeText={(val) => handleInputChange("compensation", val)}
            />
            <CustomTextInput
              label={intl.formatMessage({
                id: "label.starting_salary_including_perks",
              })}
              placeholder={intl.formatMessage({
                id: "label.enter_starting_salary_including_perks",
              })}
              isMandatory
              isRupee
              value={renderJobDetails?.starting_salary}
              onChangeText={(val) => handleInputChange("starting_salary", val)}
            />
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
          />
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
          />{" "}
          <View style={styles.overseasContainerStyles}>
            {currentModule === "overseas-chapters" && (
              <>
                <CustomTextInput
                  customStyle={styles.ctcTextInputStyle}
                  label={intl.formatMessage({
                    id: "label.work_experience_range",
                  })}
                  placeholder={intl.formatMessage({
                    id: "label.select_work_experience_range",
                  })}
                  isDropdown
                  options={DOCUMENT_TYPE}
                  value={renderJobDetails?.work_exp_range_id}
                  onChangeValue={(val) =>
                    handleInputChange("work_exp_range_id", val)
                  }
                />
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
                <CustomTextInput
                  customStyle={styles.ctcTextInputStyle}
                  label={intl.formatMessage({
                    id: "label.job_type",
                  })}
                  isDropdown
                  options={DOCUMENT_TYPE}
                  placeholder={intl.formatMessage({
                    id: "label.select_job_type",
                  })}
                  value={renderJobDetails?.job_type}
                  onChangeValue={(val) => handleInputChange("job_type", val)}
                />
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
            headerId={intl.formatMessage({ id: "label.monthly" })}
            details={renderJobDetails?.monthly}
            handleChange={handleMonthlyData}
            isEditProfile
            customCardStyle={styles.monthlyCustomCardStyle}
          />
          <DetailCard
            headerId={intl.formatMessage({ id: "label.yearly" })}
            details={renderJobDetails?.yearly}
            handleChange={handleYearlyData}
            isEditProfile
            customCardStyle={styles.yearlyCustomCardStyle}
          />
        </View>
      ),
    },
    {
      content: (
        <AddDocument
          {...{
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
            <CustomTextInput
              customStyle={isWebView && { ...styles.bondCustomInputStyle }}
              label={intl.formatMessage({
                id: "label.months_bond_period",
              })}
              placeholder={intl.formatMessage({
                id: "label.enter_months_bond_period",
              })}
              isMandatory={
                renderJobDetails?.bond_details?.is_bond_included === 0
              }
              value={renderJobDetails?.bond_details?.bond_period_in_mm}
              onChangeText={(val) =>
                numericValidator(val) &&
                handleInputChange("bond_details", val, "bond_period_in_mm")
              }
            />
            <CustomTextInput
              customStyle={isWebView && { ...styles.bondCustomInputStyle }}
              label={intl.formatMessage({
                id: "label.exit_amount",
              })}
              placeholder={intl.formatMessage({
                id: "label.enter_exit_amount",
              })}
              isMandatory={
                renderJobDetails?.bond_details?.is_bond_included === 0
              }
              value={renderJobDetails?.bond_details?.exit_amount}
              onChangeText={(val) =>
                numericValidator(val) &&
                handleInputChange("bond_details", val, "exit_amount")
              }
              isRupee
            />
          </View>
        </CardComponent>
      ),
    },
    {
      content: (
        <AddPlaceOfPosting
          {...{
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
        <TwoColumn
          leftSection={
            <ConfigurableList
              customOuterContianer={styles.customOuterContianer}
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
            />
          }
          isLeftFillSpace={false}
          isRightFillSpace
          leftSectionStyle={{
            width: "25%",
          }}
          rightSectionStyle={{
            width: "75%",
          }}
          rightSection={<MultiRow rows={filteredWebJobDetailsConfig} />}
        />
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
