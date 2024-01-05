import React, { useEffect } from "react";
import { View, FlatList } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import MultiColumn from "../../core/layouts/MultiColumn";
import useTicketView from "./controller/useTicketView";
import CustomTouchableOpacity from "../../components/CustomTouchableOpacity";
import CustomImage from "../../components/CustomImage";
import images from "../../images";
import styles from "./TicketsView.style";

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

const Tickets = () => {
  const {
    visibleData,
    setVisibleData,
    rowsToShow,
    setRowsToShow,
    getStatusStyle,
    getColoumConfigs,
    isHeading,
  } = useTicketView();

  useEffect(() => {
    setVisibleData(gridData.slice(0, rowsToShow));
  }, [gridData, rowsToShow]);

  const renderButton = (label, value) => (
    <CustomTouchableOpacity
      style={[
        styles.selectedBtn,
        rowsToShow === value && styles.selectedButton,
      ]}
      onPress={() => setRowsToShow(value)}
      key={value}
    >
      <CommonText title={label} customTextStyle={styles.rowSelectedNumber} />
      <CustomImage source={images.iconArrowDown} style={styles.iconTicket} />
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

        <View style={styles.paginationFooter}>
          <View style={styles.rowsPerPage}>
            <CommonText
              title={"Rows Per Page:"}
              customTextStyle={styles.rowsPerPageText}
            />
            {renderButton("10", 10)}
          </View>

          {/* {renderButton("15", 15)} */}
          {renderButton("20", 20)}
        </View>
      </View>
    </View>
  );
};

export default Tickets;
