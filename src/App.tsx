import React, { useState } from "react";
import "antd/dist/antd.css";
import { Checkbox, Input } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

const CheckboxGroup = Checkbox.Group;

const defaultCheckedList: CheckboxValueType[] = ["Apple", "Orange"];

interface State {
  indeterminate: boolean;
  isAllChecked: boolean;
}

const App = () => {
  const [allOptions, setAllOptions] = useState(["Apple", "Pear", "Orange"]);
  const [currentlyChecked, setCurrentlyChecked] = useState(defaultCheckedList);
  const [state, setState] = useState<State>({
    indeterminate: true,
    isAllChecked: false,
  });

  const [inputText, setInputText] = useState("");

  const onChange = (checkedValues: CheckboxValueType[]) => {
    //{ length: number }) => {
    const indeterminate =
      checkedValues.length > 0 && checkedValues.length < allOptions.length;
    setState({
      indeterminate,
      isAllChecked: checkedValues.length === allOptions.length,
    });
    setCurrentlyChecked(checkedValues);
  };

  const onPressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const newChecked = inputText.split(",").map((text) => text.trim());
    setAllOptions([...allOptions, ...newChecked]);
    setCurrentlyChecked([...currentlyChecked, ...newChecked]);
    setInputText("");
  };

  const onCheckMasterChange = (e: CheckboxChangeEvent) => {
    const isAllChecked = e.target.checked;
    setState({
      indeterminate: false,
      isAllChecked: isAllChecked,
    });
    setCurrentlyChecked(isAllChecked ? allOptions : []);
  };

  return (
    <div>
      <div className="site-checkbox-all-wrapper">
        <Checkbox
          indeterminate={state.indeterminate}
          onChange={onCheckMasterChange}
          checked={state.isAllChecked}
        >
          Check all
        </Checkbox>
      </div>
      <br />
      <CheckboxGroup
        options={allOptions}
        value={currentlyChecked}
        onChange={onChange}
      />
      <Input
        placeholder="Basic usage"
        onPressEnter={onPressEnter}
        onChange={(e) => setInputText(e.target.value)}
      />
    </div>
  );
};

export default App;
