import { Effect, Reducer } from "umi";
import { getCalendar } from "./service";
import { message } from "antd";

export interface IndexModelState {
  events: [];
  selectedEvent: {};
  selectedCalendars: Array.type;
}

export interface IndexModelType {
  namespace: "index";
  state: IndexModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<IndexModelState>;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  };
}

const IndexModel: IndexModelType = {
  namespace: "index",

  state: {
    events: [],
    selectedEvent: {},
    selectedCalendars: ["Personal", "Business", "Family", "Holiday", "ETC"],
  },

  effects: {
    *query({ payload }, { call, put }) {
      const events = yield call(getCalendar, payload);
      // const events = new Promise().resolve("test");

      // console.log("events");
      // if (events) {
      //   message.success("登陆成功");
      // }
      console.log(events);
      yield put({ type: "save", payload: { events: events } });
    },
  },
  reducers: {
    save(state, action) {
      console.log("save");
      return {
        ...state,
        ...action.payload,
      };
    },
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
  },
};

export default IndexModel;
