import {
  ValidateEmail,
  ValidateLength,
  ValidatePassword,
  ValidateString,
} from "../ValdationConstraints";

export const validateInput = (inputId, inputValue) => {
  if (inputId === "FirstName" || inputId === "LastName") {
    return ValidateString(inputId, inputValue);
  } else if (inputId === "Email") {
    return ValidateEmail(inputId, inputValue);
  } else if (inputId === "Password") {
    return ValidatePassword(inputId, inputValue);
  } else if (inputId === "about") {
    return ValidateLength(inputId, inputValue, 0, 150, true);
  }
};
