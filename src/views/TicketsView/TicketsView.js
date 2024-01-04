import React, { useContext, useEffect, useMemo, useState } from "react";
import { View, FlatList, Platform, Picker } from "@unthinkable/react-core-components";
import { MediaQueryContext } from "@unthinkable/react-theme";

import styles from "./TicketsView.style";
import CustomTextInput from "../../components/CustomTextInput";
import TableView from "../../core/layouts/TableLayout/TableView";
import CommonText from "../../components/CommonText";
import colors from "../../assets/colors";
import MultiColumn from "../../core/layouts/MultiColumn";
import MultiRow from "../../core/layouts/MultiRow";
import { items } from "../../constants/sideBarHelpers";
import CustomImage from "../../components/CustomImage";
import images from "../../images";
import CustomTouchableOpacity from "../../components/CustomTouchableOpacity";

const tableHeading = {
  id: "Ticket ID",
  query_type: "Query Type",
  status: "Status",
  assigned_to: "Assigned To",
  created_at: "Created On",
};

const gridData = [
  {
    id: "T0123456",
    query_type: "General Inquiry",
    status: "Pending",
    assigned_to: "-",
    created_at: "10/10/2010",
  },
  {
    id: "T0123457",
    query_type: "Technical Support",
    status: "In Progress",
    assigned_to: "John Doe",
    created_at: "11/15/2011",
  },
  {
    id: "T0123458",
    query_type: "Account Issue",
    status: "In Progress",
    assigned_to: "Alice Smith",
    created_at: "05/20/2012",
  },
  {
    id: "T0123459",
    query_type: "Feedback",
    status: "Pending",
    assigned_to: "-",
    created_at: "03/07/2013",
  },
  {
    id: "T0123460",
    query_type: "Feature Request",
    status: "Close",
    assigned_to: "Bob Johnson",
    created_at: "08/22/2014",
  },
  {
    id: "T0123461",
    query_type: "Bug Report",
    status: "Close",
    assigned_to: "Eve Brown",
    created_at: "12/18/2015",
  },
  {
    id: "T0123462",
    query_type: "Urgent Matter",
    status: "Pending",
    assigned_to: "-",
    created_at: "09/05/2016",
  },
  {
    id: "T0123460",
    query_type: "Feature Request",
    status: "Close",
    assigned_to: "Bob Johnson",
    created_at: "08/22/2014",
  },
  {
    id: "T0123461",
    query_type: "Bug Report",
    status: "Close",
    assigned_to: "Eve Brown",
    created_at: "12/18/2015",
  },
  {
    id: "T0123462",
    query_type: "Urgent Matter",
    status: "Pending",
    assigned_to: "-",
    created_at: "09/05/2016",
  },
  {
    id: "T0123456",
    query_type: "General Inquiry",
    status: "Pending",
    assigned_to: "-",
    created_at: "10/10/2010",
  },
  {
    id: "T0123457",
    query_type: "Technical Support",
    status: "In Progress",
    assigned_to: "John Doe",
    created_at: "11/15/2011",
  },
  {
    id: "T0123458",
    query_type: "Account Issue",
    status: "In Progress",
    assigned_to: "Alice Smith",
    created_at: "05/20/2012",
  },
  {
    id: "T0123459",
    query_type: "Feedback",
    status: "Pending",
    assigned_to: "-",
    created_at: "03/07/2013",
  },
  {
    id: "T0123460",
    query_type: "Feature Request",
    status: "Close",
    assigned_to: "Bob Johnson",
    created_at: "08/22/2014",
  },
  {
    id: "T0123461",
    query_type: "Bug Report",
    status: "Close",
    assigned_to: "Eve Brown",
    created_at: "12/18/2015",
  },
  {
    id: "T0123462",
    query_type: "Urgent Matter",
    status: "Pending",
    assigned_to: "-",
    created_at: "09/05/2016",
  },
  {
    id: "T0123460",
    query_type: "Feature Request",
    status: "Close",
    assigned_to: "Bob Johnson",
    created_at: "08/22/2014",
  },
  {
    id: "T0123461",
    query_type: "Bug Report",
    status: "Close",
    assigned_to: "Eve Brown",
    created_at: "12/18/2015",
  },
];

const reshapedGridData = gridData.map((rowData) => Object.values(rowData));
reshapedGridData.unshift(tableHeading);

const Tickets = () => {
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const [visibleData, setVisibleData] = useState([]);
  const [rowsToShow, setRowsToShow] = useState(10);
  const isHeading = true;

  useEffect(() => {
    // Update visibleData whenever gridData or rowsToShow changes
    setVisibleData(gridData.slice(0, rowsToShow));
  }, [gridData, rowsToShow]);

  const handleLoadMore = () => {
    const currentLength = visibleData.length;
    const newData = gridData.slice(currentLength, currentLength + rowsToShow);
    setVisibleData([...visibleData, ...newData]);
  };


  function getStatusStyle(status, isHeading, styles) {
    status = status.toLowerCase();

    if (isHeading) {
      return styles.tableHeadingText;
    }
    switch (status) {
      case "pending":
        return [styles.pending, styles.cellTextStyle(12)];
      case "close":
        return [styles.close, styles.cellTextStyle(12)];
      case "in progress":
        return [styles.inProgress, styles.cellTextStyle(12)];
      default:
        return styles.cellTextStyle(12);
    }
  }
  const getColoumConfigs = (item, isHeading) => {
    return [
      {
        content: (
          <CommonText
            title={item.id}
            customTextStyle={
              isHeading
                ? styles.tableHeadingText
                : styles.cellTextStyle(14, 600)
            }
          />
        ),
        style: styles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText
            title={item.query_type}
            customTextStyle={
              isHeading ? styles.tableHeadingText : styles.cellTextStyle
            }
          />
        ),
        style: styles.columnStyle("20%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText
            title={item.status}
            customTextStyle={getStatusStyle(item.status, isHeading, styles)}
          />
        ),
        style: styles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText
            title={item.assigned_to}
            customTextStyle={
              isHeading ? styles.tableHeadingText : styles.cellTextStyle
            }
          />
        ),
        style: styles.columnStyle("20%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText
            title={item.created_at}
            customTextStyle={
              isHeading ? styles.tableHeadingText : styles.cellTextStyle
            }
          />
        ),
        style: styles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: !isHeading && <CustomImage source={images.iconTicket} style={styles.iconTicket} />,
        style: styles.columnStyle("10%"),
        isFillSpace: true,
      },
    ];
  };


  const renderButton = (label, value) => (
    <CustomTouchableOpacity
      style={[styles.button, rowsToShow === value && styles.selectedButton]}
      onPress={() => setRowsToShow(value)}
      key={value}
    >
      <CommonText title={label} />
    </CustomTouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <View style={styles.tableSection}>
        <MultiColumn columns={getColoumConfigs(tableHeading, isHeading)} />
        <FlatList
          data={visibleData}
          renderItem={({ item, index }) => {
            return (
              <MultiColumn
                columns={getColoumConfigs(item)}
                style={styles.columnStyleBorder}
              />
            );
          }}
        />
           {renderButton('10', 10)}
        {renderButton('15', 15)}
        {renderButton('20', 20)}
      </View>
    </View>
  );
};

export default Tickets;
