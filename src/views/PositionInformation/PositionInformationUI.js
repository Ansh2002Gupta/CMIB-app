import { View } from "@unthinkable/react-core-components";
import React from "react";
import DetailCard from "../../components/DetailCard";
import { useIntl } from "react-intl";
import CustomTable from "../../components/CustomTable";
import styles from "./styles";
import { TwoColumn } from "../../core/layouts";
import CardComponent from "../../components/CardComponent";
import CommonText from "../../components/CommonText";
import BadgeLabel from "../../components/BadgeLabel/BadgeLabel";

const CommonTable = ({ data = [], tableName, getColoumConfigs }) => {
  const intl = useIntl();

  return (
    <CardComponent>
      <CommonText customTextStyle={styles.tableTitleText}>
        {tableName}
      </CommonText>
      <CustomTable
        {...{
          data,
          tableHeading: undefined,
          getColoumConfigs,
          showSearchBar: false,
          isShowPagination: false,
          placeholder: intl.formatMessage({
            id: "tableName",
          }),
          isHeading: true,
          containerStyle: styles.tableContainerStyle,
          customTableStyle: styles.customTableStyle,
        }}
      />
    </CardComponent>
  );
};

const RequriedDocuments = ({
  data = [],
  tableName,
  getRequiredDocumentsColumnConfigs,
}) => {
  const intl = useIntl();

  return (
    <CardComponent customStyle={styles.requriedDocuments}>
      <CommonText customTextStyle={styles.tableTitleText}>
        {tableName}
      </CommonText>
      <CustomTable
        {...{
          data,
          tableHeading: {
            doc_name: intl.formatMessage({ id: "label.document_name" }),
            doc_type: intl.formatMessage({ id: "label.document_type" }),
            no_of_photocopies: intl.formatMessage({
              id: "label.numberOfCopies",
            }),
          },
          getColoumConfigs: getRequiredDocumentsColumnConfigs,
          showSearchBar: false,
          isShowPagination: false,
          placeholder: intl.formatMessage({
            id: "tableName",
          }),
          isHeading: true,
          containerStyle: styles.tableContainerStyle,
          customTableStyle: styles.customTableStyle,
        }}
      />
    </CardComponent>
  );
};

const PostingAndCategories = ({
  data = [],
  tableName,
  getPostingAndCategoriesColumnConfigs,
}) => {
  const intl = useIntl();

  return (
    <CardComponent customStyle={styles.requriedDocuments}>
      <CommonText customTextStyle={styles.tableTitleText}>
        {tableName}
      </CommonText>
      <CustomTable
        {...{
          data,
          tableHeading: {
            placeOfPosting: intl.formatMessage({ id: "label.place_posting" }),
            general: intl.formatMessage({ id: "label.general" }),
            obc: intl.formatMessage({ id: "label.obc" }),
            sc: intl.formatMessage({ id: "label.sc" }),
            st: intl.formatMessage({ id: "label.st" }),
            ph: intl.formatMessage({ id: "label.ph" }),
            others: intl.formatMessage({ id: "label.others" }),
            total: intl.formatMessage({ id: "label.total" }),
          },
          getColoumConfigs: getPostingAndCategoriesColumnConfigs,
          showSearchBar: false,
          isShowPagination: false,
          placeholder: intl.formatMessage({
            id: tableName,
          }),
          isHeading: true,
          containerStyle: styles.tableContainerStyle,
          customTableStyle: styles.customTableStyle,
        }}
      />
    </CardComponent>
  );
};

const SelectionProcess = ({ data }) => {
  const intl = useIntl();
  return (
    <CardComponent customStyle={styles.requriedDocuments}>
      <CommonText customTextStyle={styles.tableTitleText}>
        {intl.formatMessage({ id: "label.selection_process" })}
      </CommonText>
      <BadgeLabel
        badgeLabels={data}
        customTextContainerStyle={styles.badgeContainer}
      />
    </CardComponent>
  );
};

const PositionInformationUI = ({
  getColoumConfigs,
  getRequiredDocumentsColumnConfigs,
  getPostingAndCategoriesColumnConfigs,
  data,
}) => {
  const intl = useIntl();
  const {
    monthlyData,
    yearlyData,
    requiredDocuments,
    postingAndVaccancyData,
    selectionProcess,
    postionDetail,
    bondDetail,
  } = data ?? {};

  return (
    <View>
      <DetailCard
        details={postionDetail}
        headerId={intl.formatMessage({
          id: "Assistant Finance Manager",
        })}
        isColumnVariableWidth
      />
      <TwoColumn
        style={styles.twoColumn}
        leftSection={
          <CommonTable
            {...{
              data: monthlyData,
              isHeading: false,
              getColoumConfigs,
              tableName: intl.formatMessage({ id: "label.monthly" }),
            }}
          />
        }
        isLeftFillSpace={true}
        isRightFillSpace={true}
        rightSection={
          <CommonTable
            {...{
              data: yearlyData,
              isHeading: false,
              getColoumConfigs,
              tableName: intl.formatMessage({ id: "label.yearly" }),
            }}
          />
        }
      />
      <RequriedDocuments
        {...{
          data: requiredDocuments,
          getRequiredDocumentsColumnConfigs,
          tableName: intl.formatMessage({
            id: "label.detailsOfRequiredDocuments",
          }),
        }}
      />
      <DetailCard
        details={bondDetail}
        headerId={intl.formatMessage({
          id: "label.bond_if_any",
        })}
        isColumnVariableWidth
      />
      <SelectionProcess data={selectionProcess} />
      <PostingAndCategories
        {...{
          data: postingAndVaccancyData,
          getPostingAndCategoriesColumnConfigs,
          tableName: intl.formatMessage({
            id: "label.place_of_posting",
          }),
        }}
      />
    </View>
  );
};

export default PositionInformationUI;
