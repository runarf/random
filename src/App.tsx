import React, { useState } from "react";
import "antd/dist/antd.css";
import { Checkbox } from "antd";

const CheckboxGroup = Checkbox.Group;

const plainOptions = ["Apple", "Pear", "Orange"];
const defaultCheckedList = ["Apple", "Orange"];

interface State {
  checkedList: string[];
  indeterminate: boolean;
  checkAll: boolean;
}

const App = () => {
  const [state, setState] = useState<State>({
    checkedList: defaultCheckedList,
    indeterminate: true,
    checkAll: false,
  });

  const onChange = (checkedList: any) => {
    //{ length: number }) => {
    const indeterminate =
      !!checkedList.length && checkedList.length < plainOptions.length;
    setState({
      checkedList,
      indeterminate,
      checkAll: checkedList.length === plainOptions.length,
    });
  };

  const onCheckAllChange = (e: { target: { checked: any } }) => {
    setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  return (
    <div>
      <div className="site-checkbox-all-wrapper">
        <Checkbox
          indeterminate={state.indeterminate}
          onChange={onCheckAllChange}
          checked={state.checkAll}
        >
          Check all
        </Checkbox>
      </div>
      <br />
      <CheckboxGroup
        options={plainOptions}
        value={state.checkedList}
        onChange={onChange}
      />
    </div>
  );
};

export default App;
