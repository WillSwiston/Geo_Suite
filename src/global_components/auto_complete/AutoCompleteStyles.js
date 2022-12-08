export const Styles = {
  option: (provided, state) => {
    return {
      backgroundColor: "var(--main-color-light-light)",
      color: "var(--main-color-dark)",
      fontSize: "1.3rem",
      fontWeight: state.isFocused ? 800 : 200,
      cursor: "pointer",
      padding: "4px",
      overflow: "hidden"
    };
  },
  control: () => {
    return {
      cursor: "text",
      width: "30vw",
      backgroundColor: "transparent",
      border: "none",
      borderBottom: "2px solid white",
      fontSize: "1.3rem",
      textAlign: "center"
    };
  },
  input: (provided) => {
    return {
      ...provided,
      color: "white",
      textAlign: "center"
    };
  }
};
