import { request } from "umi";

const date = new Date();
const nextDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

// prettier-ignore
const nextMonth = date.getMonth() === 11 ? new Date(date.getFullYear() + 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() + 1, 1)
// prettier-ignore
const prevMonth = date.getMonth() === 11 ? new Date(date.getFullYear() - 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() - 1, 1)

const data = {
  events: [
    {
      id: 1,
      url: "",
      title: "Design Review",
      start: date,
      end: nextDay,
      allDay: true,
      label: "Business",
      extendedProps: {
        guest: ["china", "usa"],
        calendar: "Business",
      },
    },
    {
      id: 2,
      url: "",
      title: "Meeting With Client",
      start: new Date(date.getFullYear(), date.getMonth() + 1, -11),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -10),
      allDay: true,
      label: "Business",
      extendedProps: {
        calendar: "Business",
      },
    },
    {
      id: 3,
      url: "",
      title: "Family Trip",
      allDay: true,
      start: new Date(date.getFullYear(), date.getMonth() + 1, -9),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -7),
      label: "Holiday",
      extendedProps: {
        calendar: "Holiday",
      },
    },
    {
      id: 4,
      url: "",
      title: "Doctor's Appointment",
      start: new Date(date.getFullYear(), date.getMonth() + 1, -11),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -10),
      allDay: false,
      extendedProps: {
        calendar: "Personal",
      },
    },
    {
      id: 5,
      url: "",
      title: "Dart Game?",
      start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
      allDay: true,
      label: "ETC",
      extendedProps: {
        calendar: "ETC",
      },
    },
    {
      id: 6,
      url: "",
      title: "Meditation",
      start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
      allDay: true,
      label: "Personal",
      extendedProps: {
        calendar: "Personal",
      },
    },
    {
      id: 7,
      url: "",
      title: "Dinner",
      start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
      allDay: false,
      extendedProps: {
        calendar: "Family",
      },
    },
    {
      id: 8,
      url: "",
      title: "Product Review",
      start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
      allDay: true,
      extendedProps: {
        guest: ["china", "usa"],
        calendar: "Business",
      },
    },
    {
      id: 9,
      url: "",
      title: "Monthly Meeting",
      start: nextMonth,
      end: nextMonth,
      allDay: true,
      label: "Business",
      extendedProps: {
        calendar: "Business",
      },
    },
    {
      id: 10,
      url: "",
      title: "Monthly Checkup",
      start: prevMonth,
      end: prevMonth,
      allDay: true,
      label: "Personal",
      extendedProps: {
        calendar: "Personal",
      },
    },
  ],
};

export async function getCalendar(params: any) {
  // return getnumber();
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(getnumber);
  //   }, 100);
  // });
  console.log("params");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        data.events.filter((event) =>
          params.includes(event.extendedProps.calendar)
        )
      );
    }, 30);
  });
}

async function getnumber() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(+new Date());
    }, 30);
  });
}
