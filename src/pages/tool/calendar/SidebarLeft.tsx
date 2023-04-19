// ** React Imports
import { Fragment } from "react";

// ** Custom Components
import classnames from "classnames";

// ** Reactstrap Imports
import { Card, Button, Input, Radio, Space, Col, Row } from "antd";
import { Checkbox, Divider } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import React, { useState } from "react";
import _ from "lodash";
const CheckboxGroup = Checkbox.Group;
// ** illustration import
import illustration from "@/assets/images/calendar-illustration.png";
import styles from "./SidebarLeft.less";
import { connect, useModel } from "umi";
import useCalendar from "@/models/calendar";

// ** Filters Checkbox Array
const filters = [
  { label: "Personal", color: "danger", className: "form-check-danger mb-1" },
  { label: "Business", color: "primary", className: "form-check-primary mb-1" },
  { label: "Family", color: "warning", className: "form-check-warning mb-1" },
  { label: "Holiday", color: "success", className: "form-check-success mb-1" },
  { label: "ETC", color: "info", className: "form-check-info" },
];

const SidebarLeft = (props: any) => {
  // const model = { namespace: "calendar" };
  // const plainOptions = _.map(filters, (o) => o.label);
  const defaultCheckedList = _.map(filters, (o) => o.label); // _.map(filters, (o) => o.label);
  // const defaultCheckedList = model.
  // const [checkedList, setCheckedList] =
  //   useState<CheckboxValueType[]>(defaultCheckedList);
  // const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(true);
  const onChange = (list: CheckboxValueType[]) => {
    // setCheckedList(list);

    // setCheckAll(list.length === plainOptions.length);

    console.log("checked = ", list);
    setCheckAll(list.length === defaultCheckedList.length);
    dispatch({ type: "index/save", payload: { selectedCalendars: list } });
    dispatch({ type: "index/query", payload: [...list] });

    // setIndeterminate(!!list.length && list.length < defaultCheckedList.length);
    // setIndeterminate(!!list.length && list.length < defaultCheckedList.length);
  };
  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    // setCheckedList(e.target.checked ? plainOptions : []);
    // setIndeterminate(false);
    setCheckAll(e.target.checked);
    console.log("checked = ", e.target.checked);
    dispatch({
      type: "index/query",
      payload: {
        selectedCalendars: e.target.checked
          ? ["Personal", "Business", "Family", "Holiday", "ETC"]
          : [],
      },
    });
  };

  // ** Props
  const { store, dispatch, handleAddEventSidebar } = props;
  const { selectedCalendars } = store;
  // ** Function to handle Add Event Click
  const handleAddEventClick = () => {
    handleAddEventSidebar();
  };
  return (
    <div className="flex bg-opacity-95 flex-col h-full">
      <div className="flex-grow">
        <Card
          headStyle={{ textAlign: "center" }}
          title={
            <Button block type="primary" onClick={handleAddEventClick}>
              Button
            </Button>
          }
          className="h-full"
        >
          <div className="calendar-events-filter">
            <Row>
              <Col span={24}>
                <Checkbox
                  // indeterminate={indeterminate}
                  onChange={onCheckAllChange}
                  checked={checkAll}
                  style={{ color: "#ff4d4f" }}
                >
                  Check all
                </Checkbox>
              </Col>
            </Row>
            <Checkbox.Group
              options={defaultCheckedList}
              value={selectedCalendars}
              onChange={onChange}
            >
              {/* <Row>
                {plainOptions.length &&
                  plainOptions.map((filter) => {
                    return (
                      <Col span={24}>
                        <Checkbox value={filter}>{filter}</Checkbox>
                      </Col>
                    );
                  })}
              </Row> */}
            </Checkbox.Group>
          </div>
        </Card>
      </div>

      <div className="flex-none">
        <img
          className={styles.img_fluid}
          src={illustration}
          alt="illustration"
        />
      </div>
    </div>
  );
};

export default SidebarLeft;
