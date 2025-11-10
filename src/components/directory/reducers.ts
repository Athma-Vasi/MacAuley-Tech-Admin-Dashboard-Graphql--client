import { parseDispatchAndSetState } from "../../utils";
import { directoryAction } from "./actions";
import {
  setClickedInputDirectoryDispatchZod,
  setDepartmentDirectoryDispatchZod,
  setDirectoryFetchWorkerDirectoryDispatchZod,
  setIsLoadingDirectoryDispatchZod,
  setOrientationDirectoryDispatchZod,
  setStoreLocationDirectoryDispatchZod,
} from "./schemas";
import type {
  DirectoryAction,
  DirectoryDispatch,
  DirectoryState,
} from "./types";

function directoryReducer(
  state: DirectoryState,
  dispatch: DirectoryDispatch,
): DirectoryState {
  const reducer = directoryReducers.get(dispatch.action);
  return reducer ? reducer(state, dispatch) : state;
}

const directoryReducers = new Map<
  DirectoryAction[keyof DirectoryAction],
  (state: DirectoryState, dispatch: DirectoryDispatch) => DirectoryState
>([
  [directoryAction.setClickedInput, directoryReducer_setClickedInput],
  [directoryAction.setDepartment, directoryReducer_setDepartment],
  [
    directoryAction.setDirectoryFetchWorker,
    directoryReducer_setDirectoryFetchWorker,
  ],
  [directoryAction.setIsLoading, directoryReducer_setIsLoading],
  [directoryAction.setOrientation, directoryReducer_setOrientation],
  [directoryAction.setStoreLocation, directoryReducer_setStoreLocation],
]);

function directoryReducer_setClickedInput(
  state: DirectoryState,
  dispatch: DirectoryDispatch,
): DirectoryState {
  return parseDispatchAndSetState({
    dispatch,
    key: "clickedInput",
    state,
    zSchema: setClickedInputDirectoryDispatchZod,
  });
}

function directoryReducer_setDepartment(
  state: DirectoryState,
  dispatch: DirectoryDispatch,
): DirectoryState {
  return parseDispatchAndSetState({
    dispatch,
    key: "department",
    state,
    zSchema: setDepartmentDirectoryDispatchZod,
  });
}

function directoryReducer_setDirectoryFetchWorker(
  state: DirectoryState,
  dispatch: DirectoryDispatch,
): DirectoryState {
  return parseDispatchAndSetState({
    dispatch,
    key: "directoryFetchWorker",
    state,
    zSchema: setDirectoryFetchWorkerDirectoryDispatchZod,
  });
}

function directoryReducer_setIsLoading(
  state: DirectoryState,
  dispatch: DirectoryDispatch,
): DirectoryState {
  return parseDispatchAndSetState({
    dispatch,
    key: "isLoading",
    state,
    zSchema: setIsLoadingDirectoryDispatchZod,
  });
}

function directoryReducer_setOrientation(
  state: DirectoryState,
  dispatch: DirectoryDispatch,
): DirectoryState {
  return parseDispatchAndSetState({
    dispatch,
    key: "orientation",
    state,
    zSchema: setOrientationDirectoryDispatchZod,
  });
}

function directoryReducer_setStoreLocation(
  state: DirectoryState,
  dispatch: DirectoryDispatch,
): DirectoryState {
  return parseDispatchAndSetState({
    dispatch,
    key: "storeLocation",
    state,
    zSchema: setStoreLocationDirectoryDispatchZod,
  });
}

export {
  directoryReducer,
  directoryReducer_setClickedInput,
  directoryReducer_setDepartment,
  directoryReducer_setDirectoryFetchWorker,
  directoryReducer_setIsLoading,
  directoryReducer_setOrientation,
  directoryReducer_setStoreLocation,
};
