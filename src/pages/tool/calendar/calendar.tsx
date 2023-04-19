// ** React Import
import { useEffect, useRef, memo, Fragment } from "react";

// ** Full Calendar & it's Plugins

import FullCalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import allLocales from "@fullcalendar/core/locales-all";
// import { EventClickArg } from "@fullcalendar/core";
import "./calendar.less";

const Calendar = (props: {
  calendarsColor: any;
  handleAddEventSidebar: any;
  blankEvent: any;
  store: any;
  dispatch: any;
}) => {
  // const { selectedEvent, dispatch } = useModel("calendar");
  // ** Refs
  const calendarRef = useRef(null);
  // ** Props
  const { calendarsColor, handleAddEventSidebar, blankEvent, store, dispatch } =
    props;
  // ** Props
  // const {} = props
  // ** calendarOptions(Props)
  const calendarOptions = {
    events: store.events,
    locales: allLocales,
    locale: "zh-cn",
    plugins: [interactionPlugin, listPlugin, dayGridPlugin, timeGridPlugin],
    initialView: "dayGridMonth",
    headerToolbar: {
      start: "sidebarToggle, prev,next, title",
      end: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
    },
    /*
      Enable dragging and resizing event
      ? Docs: https://fullcalendar.io/docs/editable
    */
    editable: true,

    /*
      Enable resizing event from start
      ? Docs: https://fullcalendar.io/docs/eventResizableFromStart
    */
    eventResizableFromStart: true,

    /*
      Automatically scroll the scroll-containers during event drag-and-drop and date selecting
      ? Docs: https://fullcalendar.io/docs/dragScroll
    */
    dragScroll: true,

    /*
      Max number of events within a given day
      ? Docs: https://fullcalendar.io/docs/dayMaxEvents
    */
    dayMaxEvents: 2,

    /*
      Determines if day names and week names are clickable
      ? Docs: https://fullcalendar.io/docs/navLinks
    */
    navLinks: true,

    ref: calendarRef,
    eventClick(event: clickedEvent) {
      console.log(event);
      dispatch({
        type: "index/save",
        payload: {
          selectedEvent: {
            ...event.event._def,
            ...event.event._instance.range,
          },
        },
      });
      // dispatch({
      //   type: "CHANGESTATE",
      //   payload: {
      //     selectedEvent: {
      //       ...event.event._def,
      //       ...event.event._instance.range,
      //     },
      //   },
      // });
      handleAddEventSidebar();

      // * Only grab required field otherwise it goes in infinity loop
      // ! Always grab all fields rendered by form (even if it get `undefined`) otherwise due to Vue3/Composition API you might get: "object is not extensible"
      // event.value = grabEventDataFromEventApi(clickedEvent)

      // eslint-disable-next-line no-use-before-define
      // isAddNewEventSidebarActive.value = true
    },

    dateClick(info: { date: any }) {
      const ev = blankEvent;
      console.log("ev");
      console.log(ev);
      // ev.start = event.date;
      // ev.end = event.date;
      ev.start = info?.date;
      ev.end = info?.date;
      dispatch({
        type: "index/save",
        payload: {
          selectedEvent: {
            ...ev,
            title: "",
          },
        },
      });
      // dispatch({
      //   type: "CHANGESTATE",
      //   payload: {
      //     selectedEvent: {
      //       ...ev,
      //       title: "",
      //     },
      //   },
      // });
      handleAddEventSidebar();
    },
    eventClassNames({ event: calendarEvent }) {
      const colorName =
        calendarsColor[calendarEvent._def.extendedProps.calendar];

      return [
        // Background Color
        `${colorName}-color`,
      ];
    },
  };
  return (
    <div className="demo_app">
      <div className="demo_app_main">
        <FullCalendar {...calendarOptions}></FullCalendar>
      </div>
    </div>
  );
};

export default memo(Calendar);
