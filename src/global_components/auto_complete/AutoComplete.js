import React, { useState, useRef } from "react";
import "./AutoComplete.css";
import Select from "react-select";
import { Styles } from "./AutoCompleteStyles";
import { States } from "../../const/States.js";
import Countries from "../../json/lists/ISO_to_country_name";

export default function AutoComplete (props) {
  const [inputText, setInputText] = useState("");
  const inputRef = useRef();

  const getItems = () => {
    const choices = [];
    let items = [];
    if (!(props.override)) {
      items = Countries;
    } else {
      switch (props.override) {
        case "states":
          items = States;
          break;
        default:
          items = Countries;
      }
    }

    for (const item in items) {
      choices.push({ value: item, label: items[item] });
    }
    return choices;
  };

  const handleAnyKeyboardPress = (e) => {
    if (e.code === "Enter") {
      e.preventDefault();
      handleSubmission();
    }
  };

  // { action, prevValue } to get previous value.
  const handleKeyboardInputChange = (item, { action }) => {
    // If the user is using the keyboard to add characters
    if (action === "input-change") {
      setInputText(item);
    }
  };

  const handleSubmission = () => {
    if (props.onEnter(inputText)) {
      setInputText("");
    }
  };

  const handleMenuSelection = (item) => {
    setInputText(item.label);

    // Ugh... have to do this to prevent the text from disappearing
    inputRef.current.blur();
    inputRef.current.focus();
  };

  return (
    <div className="auto-complete-wrapper">
      <Select
        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
        isDisabled={props.disabled}
        ref={inputRef}
        onKeyDown={handleAnyKeyboardPress}
        onInputChange={handleKeyboardInputChange}
        options={getItems()}
        inputValue={inputText}
        onChange={handleMenuSelection}
        value={inputText}
        styles={Styles}
        menuShouldScrollIntoView={false}
      />
      <button className="hollow light" onClick={() => handleSubmission()}>
        Submit
      </button>
    </div>
  );
}
