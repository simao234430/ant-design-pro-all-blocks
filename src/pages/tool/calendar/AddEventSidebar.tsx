import { useModel } from "@/.umi/plugin-model/useModel";
import { isObjEmpty } from "@/utils/utils";
import { Button, DatePicker, Drawer, Form, Input, Select, Switch } from "antd";
import { Fragment, useState } from "react";
import MyForm from "./Form";
import moment from "moment";
import MySelect from "./Form";

const AddEventSidebar = (props: any) => {
  // const handleChange = (value: string | string[]) => {
  //   console.log(`Selected: ${value}`);
  //   // setCalendarLabel({ value: value });
  //   form.setFieldsValue({ label: value });
  // };
  // const { selectedEvent } = props;
  // const { selectedCalendars, dispatch, selectedEvent } = useModel("calendar");
  // const [calendarLabel, setCalendarLabel] = useState([
  //   { value: "Business", label: "Business", color: "primary" },
  // ]);
  // ** Props
  const { store, dispatch } = props;
  const { selectedCalendars, selectedEvent } = store;
  // const [selectedEvent, setselectedEvent]: [any, any] =
  //   useState(selectedEvent);
  // ** Select Options
  const options = [
    { value: "Business", label: "Business", color: "primary" },
    { value: "Personal", label: "Personal", color: "danger" },
    { value: "Family", label: "Family", color: "warning" },
    { value: "Holiday", label: "Holiday", color: "success" },
    { value: "ETC", label: "ETC", color: "info" },
  ];
  const [calendarLabel, setCalendarLabel] = useState([
    { value: "Business", label: "Business", color: "primary" },
  ]);
  // const [startPicker, setStartPicker] = useState(new Date());
  // ** Vars & Hooks
  // const selectedEvent = selectedEvent;

  // ** Reset Input Values on Close
  const handleResetInputValues = () => {
    console.log("666");

    // form.setFieldsValue({});

    dispatch({
      type: "index/save",
      payload: {
        selectedEvent: {},
      },
    });
    // form.setFieldsValue(props.selectedEvent);
    form.setFieldsValue({ title: "" });
    form.setFieldsValue({ startDate: moment(new Date()) });
    form.setFieldsValue({ endDate: moment(new Date()) });
    form.setFieldsValue({ guests: [] });
    form.setFieldsValue({ checked: false });
    console.log(JSON.stringify(form.getFieldsValue(), null, 2));
    props.handleAddEventSidebar();
  };
  const [form] = Form.useForm();
  // form.setFieldsValue(props.selectedEvent);
  form.setFieldsValue({ title: selectedEvent?.title });
  form.setFieldsValue({ label: selectedEvent?.extendedProps?.calendar });
  form.setFieldsValue({ startDate: moment(selectedEvent?.start) });
  form.setFieldsValue({ endDate: moment(selectedEvent?.end) });
  form.setFieldsValue({ guests: selectedEvent?.extendedProps?.guest });
  form.setFieldsValue({ checked: selectedEvent?.allDay });

  // form.setFieldsValue({ label: selectedEvent?.extendedProps?.calendar });
  // const [optionsValue, setoptionsValue] = useState<String>(
  //   selectedEvent?.extendedProps?.calendar
  // );

  const handleSelectedEvent = () => {
    if (!isObjEmpty(selectedEvent)) {
      const calendar = selectedEvent?.extendedProps?.calendar;
      console.log("3334");
      const resolveLabel = () => {
        // ** CalendarColors
        const calendarsColor = {
          Business: "primary",
          Holiday: "success",
          Personal: "danger",
          Family: "warning",
          ETC: "info",
        };
        if (calendar?.length) {
          return {
            label: calendar,
            value: calendar,
            color: calendarsColor[calendar],
          };
        } else {
          return { value: "Business", label: "Business", color: "primary" };
        }
      };
      // setStartPicker(new Date(selectedEvent?.start));
      setCalendarLabel([resolveLabel()]);
    }
  };

  // const optionsValue = [selectedEvent?.extendedProps?.calendar];
  // const [label, setLabel] = useState<String>(
  //   props.selectedEvent.extendedProps.calendar
  // );
  // const onTitleChange = (value: string) => {
  //   form.setFieldsValue({ title: value });
  // };
  // ** Event Action buttons
  const EventActions = () => {
    if (
      isObjEmpty(selectedEvent) ||
      (!isObjEmpty(selectedEvent) && !selectedEvent.title.length)
    ) {
      return (
        <Fragment>
          <Button className="me-1" color="primary">
            Add
          </Button>
          <Button color="secondary">Cancel</Button>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Button className="me-1" color="primary">
            Update
          </Button>
          <Button color="danger">Delete</Button>
        </Fragment>
      );
    }
  };
  return (
    <>
      <Drawer
        title={
          <div className="modal-title">
            {selectedEvent && selectedEvent.title && selectedEvent.title.length
              ? "Update"
              : "Add"}{" "}
            Event
          </div>
        }
        placement="right"
        onClose={handleResetInputValues}
        afterOpenChange={handleSelectedEvent}
        open={props.open}
      >
        <Form initialValues={selectedEvent} layout="vertical" form={form}>
          <Form.Item name="title" label="title">
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item name="label" label="label">
            <Select
              value={calendarLabel}
              // defaultValue={calendarLabel}
              // onChange={handleChange}
              // value={[selectedEvent?.extendedProps?.calendar]}
              // defaultValue={selectedEvent?.extendedProps?.calendar}
              options={options}
            >
              {/* <Input value={selectedEvent?.extendedProps?.calendar}></Input> */}
            </Select>
          </Form.Item>
          <Form.Item name="startDate" label="startDate">
            <DatePicker className="w-full" showTime />
          </Form.Item>
          <Form.Item name="endDate" label="endDate">
            <DatePicker className="w-full" showTime />
          </Form.Item>
          <Form.Item name="checked" label="checked">
            <Switch checked={selectedEvent?.allDay} />
          </Form.Item>
          <Form.Item name="guests" label="guests">
            <Select
              value={selectedEvent?.extendedProps?.guest}
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="select one country"
              optionLabelProp="label"
            >
              <Select.Option value="china" label="China">
                <div className="demo-option-label-item">
                  <span role="img" aria-label="China">
                    🇨🇳
                  </span>
                  China (中国)
                </div>
              </Select.Option>
              <Select.Option value="usa" label="USA">
                <div className="demo-option-label-item">
                  <span role="img" aria-label="USA">
                    🇺🇸
                  </span>
                  USA (美国)
                </div>
              </Select.Option>
              <Select.Option value="japan" label="Japan">
                <div className="demo-option-label-item">
                  <span role="img" aria-label="Japan">
                    🇯🇵
                  </span>
                  Japan (日本)
                </div>
              </Select.Option>
              <Select.Option value="korea" label="Korea">
                <div className="demo-option-label-item">
                  <span role="img" aria-label="Korea">
                    🇰🇷
                  </span>
                  Korea (韩国)
                </div>
              </Select.Option>
            </Select>
          </Form.Item>
        </Form>
        {/* <MyForm initialValues={selectedEvent}></MyForm> */}
        <pre className="language-bash">
          {JSON.stringify(form.getFieldsValue(), null, 2)}
        </pre>
        <pre className="language-bash">
          {JSON.stringify(selectedEvent, null, 2)}
        </pre>{" "}
        <EventActions />
      </Drawer>
    </>
  );
};
export default AddEventSidebar;
