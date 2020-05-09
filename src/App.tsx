import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Checkbox, Input, Button, Row, Layout, Card } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import difference from "lodash/difference";
import Title from "antd/lib/typography/Title";

const CheckboxGroup = Checkbox.Group;

interface State {
  indeterminate: boolean;
  isAllChecked: boolean;
}

const SAVED_CHECKED_OPTIONS = "savedCheckedOptions";
const SAVED_ALL_OPTIONS = "savedAllOptions";
const App = () => {
  const [allOptions, setAllOptions] = useState<string[]>([]);
  const [currentlyChecked, setCurrentlyChecked] = useState<CheckboxValueType[]>(
    []
  );
  const [candidates, setCandidates] = useState<CheckboxValueType[]>([]);
  const [state, setState] = useState<State>({
    indeterminate: true,
    isAllChecked: false,
  });

  const [inputText, setInputText] = useState("");

  const [randomPerson, setRandomPerson] = useState("");

  useEffect(() => {
    const savedCheckedOptionsJson =
      localStorage.getItem(SAVED_CHECKED_OPTIONS) ?? "[]";
    const savedCheckedOptions = JSON.parse(
      savedCheckedOptionsJson
    ) as CheckboxValueType[];

    setCurrentlyChecked(savedCheckedOptions);

    const savedAllOptionsJson = localStorage.getItem(SAVED_ALL_OPTIONS) ?? "[]";
    const savedAllOptions = JSON.parse(savedAllOptionsJson);
    setAllOptions(savedAllOptions);
    const inputText = savedAllOptions.join(", ");
    console.log(inputText);
    setInputText(inputText);

    if (savedAllOptions.length === savedCheckedOptions.length) {
      setState({ indeterminate: false, isAllChecked: true });
    } else if (savedCheckedOptions.length === 0) {
      setState({ indeterminate: false, isAllChecked: false });
    }
  }, []);

  useEffect(() => {
    const allOptionsJson = JSON.stringify(allOptions);

    localStorage.setItem(SAVED_ALL_OPTIONS, allOptionsJson);

    const currentlyCheckedJson = JSON.stringify(currentlyChecked);
    localStorage.setItem(SAVED_CHECKED_OPTIONS, currentlyCheckedJson);

    setCandidates(currentlyChecked);
  }, [currentlyChecked, allOptions]);

  const onClickCheckbox = (checkedValues: CheckboxValueType[]) => {
    const indeterminate =
      checkedValues.length > 0 && checkedValues.length < allOptions.length;
    setState({
      indeterminate,
      isAllChecked: checkedValues.length === allOptions.length,
    });
    setCurrentlyChecked(checkedValues);
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value;
    setInputText(inputText);

    const inputTextAllOptions = inputText.split(",").map((text) => text.trim());

    setAllOptions(inputTextAllOptions);
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
    let localCandidates: CheckboxValueType[];
    if (candidates.length > 0) {
      localCandidates = candidates;
    } else {
      console.log("restart");
      localCandidates = currentlyChecked;
    }
    const randomPerson = getRandomElement(localCandidates) as string;
    setRandomPerson(randomPerson);
    setCandidates(difference(localCandidates, [randomPerson]));
  };

  const { Content } = Layout;
  return (
    <Layout style={{ height: "100vh" }}>
      <Content>
        <Row justify="center">
          <Card
            title="Get a random person"
            style={{ width: "80vw", margin: "12px" }}
          >
            <Row justify="center">
              <Checkbox
                indeterminate={state.indeterminate}
                onChange={onCheckMasterChange}
                checked={state.isAllChecked}
              >
                Check all
              </Checkbox>
            </Row>
            <Row justify="center">
              <CheckboxGroup
                options={allOptions}
                value={currentlyChecked}
                onChange={onClickCheckbox}
              />
            </Row>
            <Row>
              <Input
                placeholder="Input comma separated list of people"
                onChange={onChangeInput}
                value={inputText}
                onPressEnter={() => setInputText(inputText + ", ")}
              />
            </Row>
            <br />
            <Row justify="center">
              <Button
                disabled={allOptions.length < 2 && currentlyChecked.length < 2}
                onClick={onClickButton}
              >
                Get Random
              </Button>
            </Row>
            <br />
            <Row justify="center">
              <Title>{randomPerson}</Title>
            </Row>
          </Card>
        </Row>
      </Content>
    </Layout>
  );
};

export default App;
