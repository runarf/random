import React, { useState } from "react";
import "antd/dist/antd.css";
import { Checkbox, Input, Button } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import Text from "antd/lib/typography/Text";

const CheckboxGroup = Checkbox.Group;

interface State {
  indeterminate: boolean;
  isAllChecked: boolean;
}

const App = () => {
  const [allOptions, setAllOptions] = useState(["Apple", "Pear", "Orange"]);
  const [currentlyChecked, setCurrentlyChecked] = useState<CheckboxValueType[]>(
    ["Apple", "Orange"]
  );
  const [state, setState] = useState<State>({
    indeterminate: true,
    isAllChecked: false,
  });

  const [inputText, setInputText] = useState("");

  const [randomPerson, setRandomPerson] = useState("");

  const onChange = (checkedValues: CheckboxValueType[]) => {
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

  const getRandomElement = (array: CheckboxValueType[]) =>
    array[Math.floor(Math.random() * array.length)];

  const onClickButton = () => {
    const randomPerson = getRandomElement(currentlyChecked) as string;
    setRandomPerson(randomPerson);
  };

  return (
    <div>
      <div>
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
        value={inputText}
      />
      <Button onClick={onClickButton}>Get Random</Button>
      <Text>{randomPerson}</Text>
    </div>
  );
};

export default App;
