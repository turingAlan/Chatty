export const reducer = (state, action) => {
  const { validationResult, inputId,inputValue } = action;
  const updatedValues = {
    ...state.inputValues,
    [inputId]: inputValue,
  };
  const updatedValidites = {
    ...state.inputValidties,
    [inputId]: validationResult,
  };
  let updatedFormIsValid = true;
  for (const key in updatedValidites) {
    if (updatedValidites[key] !== undefined) {
      updatedFormIsValid = false;
      break;
    }
  }
  return {inputValues:updatedValues, inputValidties: updatedValidites, formIsValid: updatedFormIsValid };
};
