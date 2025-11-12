/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NavigateFunction } from "react-router-dom";
import type { SafeResult } from "../../types";
import {
  catchHandlerErrorSafe,
  createSafeErrorResult,
  createSafeSuccessResult,
  makeTransition,
  parseSyncSafe,
} from "../../utils";
import { VALIDATION_FUNCTIONS_TABLE } from "../../validations";
import { InvariantError, UnknownError } from "../error/classes";
import { registerAction } from "./actions";
import { MAX_REGISTER_STEPS, STEPS_INPUTNAMES_MAP } from "./constants";
import {
  handleCheckEmailInputZod,
  handleCheckUsernameInputZod,
  handleMessageEventCheckEmailWorkerToMainInputZod,
  handleMessageEventCheckUsernameWorkerToMainInputZod,
  handleMessageEventRegisterFetchWorkerToMainInputZod,
  handlePrevNextStepClickInputZod,
  handleRegisterButtonSubmitInputZod,
  type RegisterDispatch,
} from "./schemas";
import type { RegisterState } from "./types";

function handlePrevNextStepClick(
  input: {
    activeStep: number;
    isComponentMountedRef: React.RefObject<boolean>;
    kind: "previous" | "next";
    registerDispatch: React.Dispatch<RegisterDispatch>;
    registerState: RegisterState;
    showBoundary: (error: unknown) => void;
  },
): SafeResult<string> {
  try {
    const parsedInputResult = parseSyncSafe({
      object: input,
      zSchema: handlePrevNextStepClickInputZod,
    });
    if (parsedInputResult.err) {
      input?.showBoundary?.(parsedInputResult);
      return parsedInputResult;
    }
    if (parsedInputResult.val.none) {
      const safeErrorResult = createSafeErrorResult(
        new InvariantError(
          "Unexpected None option in input parsing",
        ),
      );
      input?.showBoundary?.(safeErrorResult);
      return safeErrorResult;
    }

    const { activeStep, kind, registerDispatch, registerState } =
      parsedInputResult.val.val;

    if (activeStep === MAX_REGISTER_STEPS) {
      return createSafeErrorResult(
        new InvariantError(
          "Cannot go to next step, already at the last step",
        ),
      );
    }

    const stepInputNames = STEPS_INPUTNAMES_MAP.get(activeStep) ??
      [];

    const {
      stepInError,
      isStepWithEmptyInputs,
      inputsInError,
      inputsNotInError,
    } = stepInputNames
      .reduce(
        (acc, inputName) => {
          const inputValidation = VALIDATION_FUNCTIONS_TABLE[inputName];

          const isInputValid = inputValidation.every((validation) => {
            const [regExpOrFunc, _] = validation;
            const stateValue = Object.entries(registerState).find(([key]) =>
              key === inputName
            )?.[1] ?? "";
            if (stateValue === null || stateValue === undefined) {
              return acc;
            }

            if (
              typeof stateValue === "string" && stateValue?.length === 0
            ) {
              acc.isStepWithEmptyInputs = true;

              // ignore empty inputs from validation error
              return acc;
            }

            return typeof regExpOrFunc === "function"
              ? regExpOrFunc(stateValue as string)
              : regExpOrFunc.test(stateValue as string);
          });

          if (isInputValid) {
            acc.inputsNotInError.add(inputName);
          } else {
            acc.inputsInError.add(inputName);
            acc.stepInError = true;
          }

          return acc;
        },
        {
          stepInError: false,
          isStepWithEmptyInputs: false,
          inputsInError: new Set<string>(),
          inputsNotInError: new Set<string>(),
        },
      );

    inputsInError.forEach((inputName) => {
      registerDispatch({
        action: registerAction.setInputsInError,
        payload: {
          kind: "add",
          name: inputName,
        },
      });
    });

    inputsNotInError.forEach((inputName) => {
      registerDispatch({
        action: registerAction.setInputsInError,
        payload: {
          kind: "delete",
          name: inputName,
        },
      });
    });

    registerDispatch({
      action: registerAction.setStepsInError,
      payload: {
        kind: stepInError ? "add" : "delete",
        step: activeStep,
      },
    });

    registerDispatch({
      action: registerAction.setStepsWithEmptyInputs,
      payload: {
        kind: isStepWithEmptyInputs ? "add" : "delete",
        step: activeStep,
      },
    });

    makeTransition(() => {
      registerDispatch({
        action: registerAction.setActiveStep,
        payload: kind === "next" ? activeStep + 1 : activeStep - 1,
      });
    });

    return createSafeSuccessResult(
      `Step ${activeStep} ${kind === "next" ? "next" : "previous"} step`,
    );
  } catch (error: unknown) {
    return catchHandlerErrorSafe(
      error,
      input?.isComponentMountedRef,
      input?.showBoundary,
    );
  }
}

export { handlePrevNextStepClick };
