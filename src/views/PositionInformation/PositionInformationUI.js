import React, { useState } from "react";
import { Row, View } from "@unthinkable/react-core-components";
import { useTheme } from "@unthinkable/react-theme";
import { useIntl } from "react-intl";

import { TwoRow } from "../../core/layouts";

import BadgeLabel from "../../components/BadgeLabel/BadgeLabel";
import CardComponent from "../../components/CardComponent";
import CommonText from "../../components/CommonText";
import CustomTable from "../../components/CustomTable";
import CustomTouchableOpacity from "../../components/CustomTouchableOpacity";
import CustomImage from "../../components/CustomImage";
import DetailCard from "../../components/DetailCard";
import useIsWebView from "../../hooks/useIsWebView";
import images from "../../images";
import getStyles from "./styles";

const renderCatgories = ({ category, value, styles }) => {
  return (
    <CommonText customTextStyle={styles.categoriesOptionsStyle}>
      {category}: {value}
    </CommonText>
  );
};

const RenderPlaceOfPosting = ({
  intl,
  place,
  totalPosition,
  categories,
  styles,
}) => {
  const [showCategories, setShowCategories] = useState(false);
  const handleShow = () => {
    setShowCategories((pre) => !pre);
  };
  return (
    <TwoRow
      style={styles.mainRowContainer}
      topSection={
        <CommonText customTextStyle={styles.placeHeadingStyle}>
          {place}
        </CommonText>
      }
      bottomSection={
        <>
          <Row>
            <CommonText customTextStyle={styles.totalPositionStyle}>
              {intl.formatMessage({ id: "label.totalPosition" })}
              {totalPosition}
            </CommonText>
            <CustomTouchableOpacity onPress={handleShow}>
              <CommonText
                customTextStyle={styles.categoriesStyle}
                fontWeight={"600"}
              >
                {intl.formatMessage({ id: "label.categories" })}
              </CommonText>
              <CustomImage
                source={
                  showCategories ? images.iconUpArrow : images.iconDownArrow
                }
                style={styles.iconArrow}
              />
            </CustomTouchableOpacity>
          </Row>
          {showCategories && (
            <View style={styles.row}>
              {renderCatgories({
                category: intl.formatMessage({ id: "label.general" }),
                value: categories?.gen,
                styles: styles,
              })}
              {renderCatgories({
                category: intl.formatMessage({ id: "label.obc" }),
                value: categories?.obc,
                styles: styles,
              })}
              {renderCatgories({
                category: intl.formatMessage({ id: "label.sc" }),
                value: categories?.sc,
                styles: styles,
              })}
              {renderCatgories({
                category: intl.formatMessage({ id: "label.st" }),
                value: categories?.st,
                styles: styles,
              })}
              {renderCatgories({
                category: intl.formatMessage({ id: "label.ph" }),
                value: categories?.ph,
                styles: styles,
              })}
              {renderCatgories({
                category: intl.formatMessage({ id: "label.others" }),
                value: categories?.others,
                styles: styles,
              })}
            </View>
          )}
        </>
      }
    />
  );
};

const CommonTable = ({
  data = [],
  tableName,
  getColoumConfigs,
  style = {},
}) => {
  const intl = useIntl();
  const theme = useTheme();
  const styles = getStyles(theme);
  const { isWebView } = useIsWebView();
  if (!isWebView) {
    return (
      <CardComponent
        customStyle={{ ...styles.mobileCommonTableCard, ...style }}
      >
        <CommonText
          fontWeight="600"
          customContainerStyle={styles.mobileCommonTable}
          customTextStyle={styles.tableTitleText}
        >
          {tableName}
        </CommonText>
        {data?.map((item) => {
          return (
            <View style={styles.tableRow}>
              <CommonText
                customContainerStyle={styles.commonTableCell}
                customTextStyle={styles.labelText}
              >
                {item?.label}
              </CommonText>
              <CommonText
                customContainerStyle={styles.commonTableCell}
                customTextStyle={styles.labelText}
              >
                {item?.amount}
              </CommonText>
            </View>
          );
        })}
      </CardComponent>
    );
  }

  return (
    <CardComponent customStyle={styles.commonTable}>
      <CommonText fontWeight="600" customTextStyle={styles.tableTitleText}>
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
  style = {},
}) => {
  const intl = useIntl();
  const theme = useTheme();
  const styles = getStyles(theme);

  const { isWebView } = useIsWebView();
  if (!isWebView) {
    return (
      <CardComponent
        customStyle={{
          ...styles.requriedDocuments,
          ...styles.mobileCommonTableCard,
          ...style,
        }}
      >
        <CommonText
          fontWeight="600"
          customContainerStyle={styles.mobileCommonTable}
          customTextStyle={styles.tableTitleText}
        >
          {tableName}
        </CommonText>
        {data?.map((item, index) => (
          <View
            style={{
              ...styles.docItem,
              ...(index < data.length - 1 && (styles.docItemBorder ?? {})),
            }}
          >
            <CommonText customTextStyle={styles.docName}>
              {item?.doc_name}
            </CommonText>
            <View style={styles.documentRow}>
              <CommonText customTextStyle={styles.docText}>
                {item?.doc_type}
              </CommonText>
              <View style={styles.dot} />
              <CommonText customTextStyle={styles.docText}>
                {item?.no_of_photocopies}
              </CommonText>
            </View>
          </View>
        ))}
      </CardComponent>
    );
  }
  return (
    <CardComponent customStyle={styles.requriedDocuments}>
      <CommonText fontWeight="600" customTextStyle={styles.tableTitleText}>
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
  style,
}) => {
  const intl = useIntl();
  const theme = useTheme();
  const styles = getStyles(theme);
  const { isWebView } = useIsWebView();
  if (!isWebView) {
    return (
      <CardComponent
        customStyle={{
          ...styles.requriedDocuments,
          ...styles.mobileCommonTableCard,
          ...style,
        }}
      >
        <CommonText
          fontWeight="600"
          customContainerStyle={styles.mobileCommonTable}
          customTextStyle={styles.tableTitleText}
        >
          {tableName}
        </CommonText>
        {data?.map((item) => {
          return (
            <RenderPlaceOfPosting
              intl={intl}
              place={item?.placeOfPosting}
              totalPosition={item?.total}
              categories={{
                gen: item?.general,
                obc: item?.obc,
                sc: item?.sc,
                st: item?.st,
                ph: item?.ph,
                others: item?.others,
              }}
              styles={styles}
            />
          );
        })}
      </CardComponent>
    );
  }

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
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <CardComponent customStyle={styles.requriedDocuments}>
      <CommonText fontWeight="600" customTextStyle={styles.tableTitleText}>
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
  const theme = useTheme();
  const styles = getStyles(theme);

  const { isWebView } = useIsWebView();
  const {
    monthlyData,
    yearlyData,
    requiredDocuments,
    postingAndVaccancyData,
    selectionProcess,
    positionDetail,
    bondDetail,
    interviewDetail,
  } = data ?? {};

  return (
    <View style={styles.container}>
      <DetailCard
        details={positionDetail}
        headerId={intl.formatMessage({
          id: data?.designation ?? "",
        })}
        isColumnVariableWidth
      />
      <View
        style={{ ...styles.twoColumn, ...(isWebView && styles.twoColumnWeb) }}
      >
        <CommonTable
          {...{
            data: monthlyData,
            isHeading: false,
            getColoumConfigs,
            tableName: intl.formatMessage({ id: "label.monthly" }),
          }}
        />
        <CommonTable
          {...{
            data: yearlyData,
            isHeading: false,
            getColoumConfigs,
            tableName: intl.formatMessage({ id: "label.yearly" }),
            style: !isWebView && styles.yearlyData,
          }}
        />
      </View>
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
      <DetailCard
        details={interviewDetail}
        headerId={intl.formatMessage({
          id: "label.interview_details",
        })}
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
