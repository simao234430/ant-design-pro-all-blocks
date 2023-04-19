import { Col, Drawer, Row } from "antd";
import Calendar from "./calendar";
import SidebarLeft from "./SidebarLeft";
import "./index.less";
import { useEffect, useState } from "react";
import AddEventSidebar from "./AddEventSidebar";
import { useModel } from "@/.umi/plugin-model/useModel";
import { IndexModelState, connect } from "umi";

interface PageProps extends ConnectProps {
  index: IndexModelState;
}

// ** CalendarColors
const calendarsColor = {
  Business: "primary",
  Holiday: "success",
  Personal: "error",
  Family: "warning",
  ETC: "info",
};
const CalendarComponent: FC<PageProps> = ({ index, dispatch }) => {
  // const { selectedEvent, dispatch } = useModel("calendar");
  const { events, selectedEvent, selectedCalendars } = index;

  // ** Blank Event Object
  const blankEvent = {
    title: "",
    start: "",
    end: "",
    allDay: false,
    url: "",
    extendedProps: {
      calendar: "",
      guests: [],
      location: "",
      description: "",
    },
  };
  // ** states
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [addSidebarOpen, setAddSidebarOpen] = useState(false);

  // ** AddEventSidebar Toggle Function
  const handleAddEventSidebar = () => setAddSidebarOpen(!addSidebarOpen);
  // ** LeftSidebar Toggle Function
  const toggleSidebar = (val: boolean | ((prevState: boolean) => boolean)) =>
    setLeftSidebarOpen(val);
  // ** Fetch Events On Mount
  useEffect(() => {
    console.log("11111");
    dispatch({
      type: "index/query",
      payload: index.selectedCalendars,
    });
    console.log("22222");
  }, []);
  return (
    <div className="app-calendar">
      <Row>
        <Col id="app-calendar-sidebar" span={4}>
          <SidebarLeft
            store={index}
            dispatch={dispatch}
            toggleSidebar={toggleSidebar}
            handleAddEventSidebar={handleAddEventSidebar}
          ></SidebarLeft>
        </Col>
        <Col span={20}>
          <Calendar
            handleAddEventSidebar={handleAddEventSidebar}
            calendarsColor={calendarsColor}
            blankEvent={blankEvent}
            store={index}
            dispatch={dispatch}
          ></Calendar>
        </Col>
      </Row>
      <AddEventSidebar
        onclose={handleAddEventSidebar}
        open={addSidebarOpen}
        store={index}
        dispatch={dispatch}
        // onOpened={handleSelectedEvent}
        // selectedEvent={selectedEvent}
        handleAddEventSidebar={handleAddEventSidebar}
      ></AddEventSidebar>
    </div>
  );
};
// export default CalendarComponent;
export default connect(({ index }: { index: IndexModelState }) => ({
  index,
}))(CalendarComponent);
