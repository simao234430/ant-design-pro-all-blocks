import { useReducer } from "react";
interface InitialStateType {
  events: [];
  selectedEvent: {};
  selectedCalendars: [];
}

interface EventType {}

interface StateType extends InitialStateType {
  dispatch: React.Dispatch<{
    type: "CHANGESTATE";
    payload: EventType;
  }>;
}
export default function useCalendar(): StateType {
  const initialState: any = {
    events: [],
    selectedEvent: {},
    selectedCalendars: ["Personal", "Business", "Family", "Holiday", "ETC"],
  };

  const reducer = (
    state: InitialStateType,

    { type, payload }: { type: "CHANGESTATE"; payload: EventType }
  ) => {
    switch (type) {
      case "CHANGESTATE": {
        return { ...state, ...payload };
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  return { ...state, dispatch };
}
