import { DatabaseOutlined } from "@ant-design/icons";
import { Request, Response } from "express";
import moment from "moment";
import { parse } from "url";
const date = new Date();
const prevDay = new Date().getDate() - 1;
const nextDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

// prettier-ignore
const nextMonth = date.getMonth() === 11 ? new Date(date.getFullYear() + 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() + 1, 1)
// prettier-ignore
const prevMonth = date.getMonth() === 11 ? new Date(date.getFullYear() - 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() - 1, 1)

// mock tableListDataSource
const genList = (current: number, pageSize: number) => {
  const tableListDataSource: API.RuleListItem[] = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    tableListDataSource.push({
      key: index,
      disabled: i % 6 === 0,
      href: "https://ant.design",
      avatar: [
        "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png",
        "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
      ][i % 2],
      name: `TradeCode ${index}`,
      owner: "曲丽丽",
      desc: "这是一段描述",
      callNo: Math.floor(Math.random() * 1000),
      status: Math.floor(Math.random() * 10) % 4,
      updatedAt: moment().format("YYYY-MM-DD"),
      createdAt: moment().format("YYYY-MM-DD"),
      progress: Math.ceil(Math.random() * 100),
    });
  }
  tableListDataSource.reverse();
  return tableListDataSource;
};

let tableListDataSource = genList(1, 100);

function getRule(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (
    !realUrl ||
    Object.prototype.toString.call(realUrl) !== "[object String]"
  ) {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  const params = parse(realUrl, true).query as unknown as API.PageParams &
    API.RuleListItem & {
      sorter: any;
      filter: any;
    };

  let dataSource = [...tableListDataSource].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number)
  );
  if (params.sorter) {
    const sorter = JSON.parse(params.sorter);
    dataSource = dataSource.sort((prev, next) => {
      let sortNumber = 0;
      Object.keys(sorter).forEach((key) => {
        if (sorter[key] === "descend") {
          if (prev[key] - next[key] > 0) {
            sortNumber += -1;
          } else {
            sortNumber += 1;
          }
          return;
        }
        if (prev[key] - next[key] > 0) {
          sortNumber += 1;
        } else {
          sortNumber += -1;
        }
      });
      return sortNumber;
    });
  }
  if (params.filter) {
    const filter = JSON.parse(params.filter as any) as {
      [key: string]: string[];
    };
    if (Object.keys(filter).length > 0) {
      dataSource = dataSource.filter((item) => {
        return Object.keys(filter).some((key) => {
          if (!filter[key]) {
            return true;
          }
          if (filter[key].includes(`${item[key]}`)) {
            return true;
          }
          return false;
        });
      });
    }
  }

  if (params.name) {
    dataSource = dataSource.filter((data) =>
      data?.name?.includes(params.name || "")
    );
  }
  const result = {
    data: dataSource,
    total: tableListDataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${params.current}`, 10) || 1,
  };

  return res.json(result);
}

function postRule(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (
    !realUrl ||
    Object.prototype.toString.call(realUrl) !== "[object String]"
  ) {
    realUrl = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, name, desc, key } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case "delete":
      tableListDataSource = tableListDataSource.filter(
        (item) => key.indexOf(item.key) === -1
      );
      break;
    case "post":
      (() => {
        const i = Math.ceil(Math.random() * 10000);
        const newRule: API.RuleListItem = {
          key: tableListDataSource.length,
          href: "https://ant.design",
          avatar: [
            "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png",
            "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
          ][i % 2],
          name,
          owner: "曲丽丽",
          desc,
          callNo: Math.floor(Math.random() * 1000),
          status: Math.floor(Math.random() * 10) % 2,
          updatedAt: moment().format("YYYY-MM-DD"),
          createdAt: moment().format("YYYY-MM-DD"),
          progress: Math.ceil(Math.random() * 100),
        };
        tableListDataSource.unshift(newRule);
        return res.json(newRule);
      })();
      return;

    case "update":
      (() => {
        let newRule = {};
        tableListDataSource = tableListDataSource.map((item) => {
          if (item.key === key) {
            newRule = { ...item, desc, name };
            return { ...item, desc, name };
          }
          return item;
        });
        return res.json(newRule);
      })();
      return;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  res.json(result);
}
function getCalendar(req: Request, res: Response) {
  const data = {
    events: [
      {
        id: 1,
        url: "",
        title: "Design Review",
        start: date,
        end: nextDay,
        allDay: false,
        extendedProps: {
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
        allDay: true,
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
        allDay: true,
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
        extendedProps: {
          calendar: "Personal",
        },
      },
    ],
  };
  res.json(DatabaseOutlined);
}
export default {
  "GET /api/rule": getRule,
  "GET /api/calendar": getCalendar,
  "POST /api/rule": postRule,
};
