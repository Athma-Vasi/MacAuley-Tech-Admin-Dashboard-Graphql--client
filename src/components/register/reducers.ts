import type {
  SetInputsInErrorPayload,
  SetStepInErrorPayload,
  SetStepWithEmptyInputsPayload,
} from "../../types";
import { parseDispatchAndSetState, parseSyncSafe } from "../../utils";
import { registerAction } from "./actions";
import {
  type RegisterDispatch,
  setActiveStepRegisterDispatchZod,
  setAddressLineRegisterDispatchZod,
  setCheckEmailWorkerRegisterDispatchZod,
  setCheckUsernameWorkerRegisterDispatchZod,
  setCityRegisterDispatchZod,
  setConfirmPasswordRegisterDispatchZod,
  setCountryRegisterDispatchZod,
  setDepartmentRegisterDispatchZod,
  setEmailRegisterDispatchZod,
  setErrorMessageRegisterDispatchZod,
  setFilesInErrorRegisterRegisterDispatchZod,
  setFirstNameRegisterDispatchZod,
  setFormDataRegisterDispatchZod,
  setInputsInErrorRegisterDispatchZod,
  setIsEmailExistsRegisterDispatchZod,
  setIsEmailExistsSubmittingRegisterDispatchZod,
  setIsErrorRegisterDispatchZod,
  setIsSubmittingRegisterDispatchZod,
  setIsSuccessfulRegisterDispatchZod,
  setIsUsernameExistsRegisterDispatchZod,
  setIsUsernameExistsSubmittingRegisterDispatchZod,
  setJobPositionRegisterDispatchZod,
  setLastNameRegisterDispatchZod,
  setPasswordRegisterDispatchZod,
  setPostalCodeCanadaRegisterDispatchZod,
  setPostalCodeUSRegisterDispatchZod,
  setProfilePictureUrlRegisterDispatchZod,
  setProvinceRegisterDispatchZod,
  setRegisterWorkerRegisterDispatchZod,
  setStateRegisterDispatchZod,
  setStepsInErrorRegisterDispatchZod,
  setStepsWithEmptyInputsRegisterDispatchZod,
  setStoreLocationRegisterDispatchZod,
  setUsernameRegisterDispatchZod,
} from "./schemas";
import type { RegisterAction, RegisterState } from "./types";

function registerReducer(
  state: RegisterState,
  dispatch: RegisterDispatch,
): RegisterState {
  const reducer = registerReducers.get(dispatch.action);
  return reducer ? reducer(state, dispatch) : state;
}

const registerReducers = new Map<
  RegisterAction[keyof RegisterAction],
  (state: RegisterState, dispatch: RegisterDispatch) => RegisterState
>([
  [registerAction.setInputsInError, registerReducer_setInputsInError],
  [
    registerAction.setStepsWithEmptyInputs,
    registerReducer_setStepsWithEmptyInputs,
  ],
  [registerAction.setActiveStep, registerReducer_setActiveStep],
  [registerAction.setStepsInError, registerReducer_setStepsInError],
  [registerAction.setDepartment, registerReducer_setDepartment],
  [registerAction.setFilesInError, registerReducer_setFilesInError],
  [registerAction.setFirstName, registerReducer_setFirstName],
  [registerAction.setFormData, registerReducer_setFormData],
  [registerAction.setJobPosition, registerReducer_setJobPosition],
  [registerAction.setLastName, registerReducer_setLastName],
  [registerAction.setProfilePictureUrl, registerReducer_setProfilePictureUrl],
  [registerAction.setStoreLocation, registerReducer_setStoreLocation],
  [registerAction.setAddressLine, registerReducer_setAddressLine],
  [registerAction.setCity, registerReducer_setCity],
  [registerAction.setCountry, registerReducer_setCountry],
  [registerAction.setPostalCodeCanada, registerReducer_setPostalCodeCanada],
  [registerAction.setPostalCodeUS, registerReducer_setPostalCodeUS],
  [registerAction.setProvince, registerReducer_setProvince],
  [registerAction.setState, registerReducer_setState],
  [registerAction.setConfirmPassword, registerReducer_setConfirmPassword],
  [registerAction.setEmail, registerReducer_setEmail],
  [registerAction.setErrorMessage, registerReducer_setErrorMessage],
  [registerAction.setIsEmailExists, registerReducer_setIsEmailExists],
  [
    registerAction.setIsEmailExistsSubmitting,
    registerReducer_setIsEmailExistsSubmitting,
  ],
  [registerAction.setIsError, registerReducer_setIsError],
  [registerAction.setIsSubmitting, registerReducer_setIsSubmitting],
  [registerAction.setIsSuccessful, registerReducer_setIsSuccessful],
  [registerAction.setIsUsernameExists, registerReducer_setIsUsernameExists],
  [
    registerAction.setIsUsernameExistsSubmitting,
    registerReducer_setIsUsernameExistsSubmitting,
  ],
  [registerAction.setPassword, registerReducer_setPassword],
  [registerAction.setUsername, registerReducer_setUsername],
  [
    registerAction.setCheckUsernameWorker,
    registerReducer_setCheckUsernameWorker,
  ],
  [
    registerAction.setCheckEmailWorker,
    registerReducer_setCheckEmailWorker,
  ],
  [registerAction.setRegisterWorker, registerReducer_setRegisterWorker],
]);

function registerReducer_setInputsInError(
  state: RegisterState,
  dispatch: RegisterDispatch,
): RegisterState {
  const parsedResult = parseSyncSafe({
    object: dispatch,
    zSchema: setInputsInErrorRegisterDispatchZod,
  });

  if (parsedResult.err || parsedResult.val.none) {
    return state;
  }

  const data = parsedResult.val.val.payload as SetInputsInErrorPayload;

  const { kind, name } = data;
  const inputsInError = new Set(state.inputsInError);
  if (kind === "add") {
    inputsInError.add(name);
  }
  if (kind === "delete") {
    inputsInError.delete(name);
  }
  return { ...state, inputsInError };
}

function registerReducer_setStepsWithEmptyInputs(
  state: RegisterState,
  dispatch: RegisterDispatch,
): RegisterState {
  const parsedResult = parseSyncSafe({
    object: dispatch,
    zSchema: setStepsWithEmptyInputsRegisterDispatchZod,
  });

  if (parsedResult.err || parsedResult.val.none) {
    return state;
  }

  const data = parsedResult.val.val
    .payload as SetStepWithEmptyInputsPayload;

  const { kind, step } = data;
  const stepsWithEmptyInputs = new Set(state.stepsWithEmptyInputs);
  if (kind === "add") {
    stepsWithEmptyInputs.add(step);
  }
  if (kind === "delete") {
    stepsWithEmptyInputs.delete(step);
  }
  return { ...state, stepsWithEmptyInputs };
}

function registerReducer_setActiveStep(
  state: RegisterState,
  dispatch: RegisterDispatch,
): RegisterState {
  return parseDispatchAndSetState({
    dispatch,
    key: "activeStep",
    state,
    zSchema: setActiveStepRegisterDispatchZod,
  });
}

function registerReducer_setStepsInError(
  state: RegisterState,
  dispatch: RegisterDispatch,
): RegisterState {
  const parsedResult = parseSyncSafe({
    object: dispatch,
    zSchema: setStepsInErrorRegisterDispatchZod,
  });

  if (parsedResult.err || parsedResult.val.none) {
    return state;
  }

  const { kind, step } = parsedResult.val.val
    .payload as SetStepInErrorPayload;
  const stepsInError = new Set(state.stepsInError);
  if (kind === "add") {
    stepsInError.add(step);
  }
  if (kind === "delete") {
    stepsInError.delete(step);
  }

  return { ...state, stepsInError };
}

function registerReducer_setDepartment(
  state: RegisterState,
  dispatch: RegisterDispatch,
): RegisterState {
  return parseDispatchAndSetState({
    dispatch,
    key: "department",
    state,
    zSchema: setDepartmentRegisterDispatchZod,
  });
}

function registerReducer_setFilesInError(
  state: RegisterState,
  dispatch: RegisterDispatch,
): RegisterState {
  const parsedResult = parseSyncSafe({
    object: dispatch,
    zSchema: setFilesInErrorRegisterRegisterDispatchZod,
  });

  if (parsedResult.err || parsedResult.val.none) {
    return state;
  }

  const { kind, name } = parsedResult.val.val.payload as {
    kind: "isError" | "notError" | "remove";
    name: string;
  };
  const filesInError = new Map(state.filesInError);
  if (kind === "remove") {
    filesInError.delete(name);
  } else {
    filesInError.set(name, kind === "isError");
  }

  return { ...state, filesInError };
}

function registerReducer_setFirstName(
  state: RegisterState,
  dispatch: RegisterDispatch,
): RegisterState {
  return parseDispatchAndSetState({
    dispatch,
    key: "firstName",
    state,
    zSchema: setFirstNameRegisterDispatchZod,
  });
}

function registerReducer_setFormData(
  state: RegisterState,
  dispatch: RegisterDispatch,
): RegisterState {
  return parseDispatchAndSetState({
    dispatch,
    key: "formData",
    state,
    zSchema: setFormDataRegisterDispatchZod,
  });
}

function registerReducer_setJobPosition(
  state: RegisterState,
  dispatch: RegisterDispatch,
): RegisterState {
  return parseDispatchAndSetState({
    dispatch,
    key: "jobPosition",
    state,
    zSchema: setJobPositionRegisterDispatchZod,
  });
}

function registerReducer_setLastName(
  state: RegisterState,
  dispatch: RegisterDispatch,
): RegisterState {
  return parseDispatchAndSetState({
    dispatch,
    key: "lastName",
    state,
    zSchema: setLastNameRegisterDispatchZod,
  });
}

function registerReducer_setProfilePictureUrl(
  state: RegisterState,
  dispatch: RegisterDispatch,
): RegisterState {
  return parseDispatchAndSetState({
    dispatch,
    key: "profilePictureUrl",
    state,
    zSchema: setProfilePictureUrlRegisterDispatchZod,
  });
}

function registerReducer_setStoreLocation(
  state: RegisterState,
  dispatch: RegisterDispatch,
): RegisterState {
  return parseDispatchAndSetState({
    dispatch,
    key: "storeLocation",
    state,
    zSchema: setStoreLocationRegisterDispatchZod,
  });
}

function registerReducer_setAddressLine(
  state: RegisterState,
  dispatch: RegisterDispatch,
): RegisterState {
  return parseDispatchAndSetState({
    dispatch,
    key: "addressLine",
    state,
    zSchema: setAddressLineRegisterDispatchZod,
  });
}

function registerReducer_setCity(
  state: RegisterState,
  dispatch: RegisterDispatch,
): RegisterState {
  return parseDispatchAndSetState({
    dispatch,
    key: "city",
    state,
    zSchema: setCityRegisterDispatchZod,
  });
}

function registerReducer_setCountry(
  state: RegisterState,
  dispatch: RegisterDispatch,
): RegisterState {
  return parseDispatchAndSetState({
    dispatch,
    key: "country",
    state,
    zSchema: setCountryRegisterDispatchZod,
  });
}

function registerReducer_setPostalCodeCanada(
  state: RegisterState,
  dispatch: RegisterDispatch,
): RegisterState {
  return parseDispatchAndSetState({
    dispatch,
    key: "postalCodeCanada",
    state,
    zSchema: setPostalCodeCanadaRegisterDispatchZod,
  });
}

function registerReducer_setPostalCodeUS(
  state: RegisterState,
  dispatch: RegisterDispatch,
): RegisterState {
  return parseDispatchAndSetState({
    dispatch,
    key: "postalCodeUS",
    state,
    zSchema: setPostalCodeUSRegisterDispatchZod,
  });
}

function registerReducer_setProvince(
  state: RegisterState,
  dispatch: RegisterDispatch,
): RegisterState {
  return parseDispatchAndSetState({
    dispatch,
    key: "province",
    state,
    zSchema: setProvinceRegisterDispatchZod,
  });
}

function registerReducer_setState(
  state: RegisterState,
  dispatch: RegisterDispatch,
): RegisterState {
  return parseDispatchAndSetState({
    dispatch,
    key: "state",
    state,
    zSchema: setStateRegisterDispatchZod,
  });
}

function registerReducer_setConfirmPassword(
  state: RegisterState,
  dispatch: RegisterDispatch,
): RegisterState {
  return parseDispatchAndSetState({
    dispatch,
    key: "confirmPassword",
    state,
    zSchema: setConfirmPasswordRegisterDispatchZod,
  });
}

function registerReducer_setEmail(
  state: RegisterState,
  dispatch: RegisterDispatch,
): RegisterState {
  return parseDispatchAndSetState({
    dispatch,
    key: "email",
    state,
    zSchema: setEmailRegisterDispatchZod,
  });
}

function registerReducer_setErrorMessage(
  state: RegisterState,
  dispatch: RegisterDispatch,
): RegisterState {
  return parseDispatchAndSetState({
    dispatch,
    key: "errorMessage",
    state,
    zSchema: setErrorMessageRegisterDispatchZod,
  });
}

function registerReducer_setIsEmailExists(
  state: RegisterState,
  dispatch: RegisterDispatch,
): RegisterState {
  return parseDispatchAndSetState({
    dispatch,
    key: "isEmailExists",
    state,
    zSchema: setIsEmailExistsRegisterDispatchZod,
  });
}

function registerReducer_setIsEmailExistsSubmitting(
  state: RegisterState,
  dispatch: RegisterDispatch,
): RegisterState {
  return parseDispatchAndSetState({
    dispatch,
    key: "isEmailExistsSubmitting",
    state,
    zSchema: setIsEmailExistsSubmittingRegisterDispatchZod,
  });
}

function registerReducer_setIsError(
  state: RegisterState,
  dispatch: RegisterDispatch,
): RegisterState {
  return parseDispatchAndSetState({
    dispatch,
    key: "isError",
    state,
    zSchema: setIsErrorRegisterDispatchZod,
  });
}

function registerReducer_setIsSubmitting(
  state: RegisterState,
  dispatch: RegisterDispatch,
): RegisterState {
  return parseDispatchAndSetState({
    dispatch,
    key: "isSubmitting",
    state,
    zSchema: setIsSubmittingRegisterDispatchZod,
  });
}

function registerReducer_setIsSuccessful(
  state: RegisterState,
  dispatch: RegisterDispatch,
): RegisterState {
  return parseDispatchAndSetState({
    dispatch,
    key: "isSuccessful",
    state,
    zSchema: setIsSuccessfulRegisterDispatchZod,
  });
}

function registerReducer_setIsUsernameExists(
  state: RegisterState,
  dispatch: RegisterDispatch,
): RegisterState {
  return parseDispatchAndSetState({
    dispatch,
    key: "isUsernameExists",
    state,
    zSchema: setIsUsernameExistsRegisterDispatchZod,
  });
}

function registerReducer_setIsUsernameExistsSubmitting(
  state: RegisterState,
  dispatch: RegisterDispatch,
): RegisterState {
  return parseDispatchAndSetState({
    dispatch,
    key: "isUsernameExistsSubmitting",
    state,
    zSchema: setIsUsernameExistsSubmittingRegisterDispatchZod,
  });
}

function registerReducer_setPassword(
  state: RegisterState,
  dispatch: RegisterDispatch,
): RegisterState {
  return parseDispatchAndSetState({
    dispatch,
    key: "password",
    state,
    zSchema: setPasswordRegisterDispatchZod,
  });
}

function registerReducer_setUsername(
  state: RegisterState,
  dispatch: RegisterDispatch,
): RegisterState {
  return parseDispatchAndSetState({
    dispatch,
    key: "username",
    state,
    zSchema: setUsernameRegisterDispatchZod,
  });
}

function registerReducer_setCheckUsernameWorker(
  state: RegisterState,
  dispatch: RegisterDispatch,
): RegisterState {
  return parseDispatchAndSetState({
    dispatch,
    key: "checkUsernameWorker",
    state,
    zSchema: setCheckUsernameWorkerRegisterDispatchZod,
  });
}

function registerReducer_setCheckEmailWorker(
  state: RegisterState,
  dispatch: RegisterDispatch,
): RegisterState {
  return parseDispatchAndSetState({
    dispatch,
    key: "checkEmailWorker",
    state,
    zSchema: setCheckEmailWorkerRegisterDispatchZod,
  });
}

function registerReducer_setRegisterWorker(
  state: RegisterState,
  dispatch: RegisterDispatch,
): RegisterState {
  return parseDispatchAndSetState({
    dispatch,
    key: "registerWorker",
    state,
    zSchema: setRegisterWorkerRegisterDispatchZod,
  });
}

export {
  registerReducer,
  registerReducer_setActiveStep,
  registerReducer_setAddressLine,
  registerReducer_setCheckEmailWorker,
  registerReducer_setCheckUsernameWorker,
  registerReducer_setCity,
  registerReducer_setConfirmPassword,
  registerReducer_setCountry,
  registerReducer_setDepartment,
  registerReducer_setEmail,
  registerReducer_setErrorMessage,
  registerReducer_setFirstName,
  registerReducer_setInputsInError,
  registerReducer_setIsEmailExists,
  registerReducer_setIsEmailExistsSubmitting,
  registerReducer_setIsError,
  registerReducer_setIsSubmitting,
  registerReducer_setIsSuccessful,
  registerReducer_setIsUsernameExists,
  registerReducer_setIsUsernameExistsSubmitting,
  registerReducer_setJobPosition,
  registerReducer_setLastName,
  registerReducer_setPassword,
  registerReducer_setPostalCodeCanada,
  registerReducer_setPostalCodeUS,
  registerReducer_setProfilePictureUrl,
  registerReducer_setProvince,
  registerReducer_setRegisterWorker,
  registerReducer_setState,
  registerReducer_setStepsInError,
  registerReducer_setStepsWithEmptyInputs,
  registerReducer_setStoreLocation,
  registerReducer_setUsername,
};
