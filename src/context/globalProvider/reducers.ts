import type { MantineColor } from "@mantine/core";
import type { FontFamily } from "../../types";
import { parseDispatchAndSetState, parseSyncSafe } from "../../utils";
import { type GlobalAction, globalAction } from "./actions";
import {
  setColorSchemeGlobalDispatchZod,
  setCustomerMetricsCategoryGlobalDispatchZod,
  setCustomerMetricsDocumentGlobalDispatchZod,
  setDefaultGradientGlobalDispatchZod,
  setDirectoryGlobalDispatchZod,
  setFinancialMetricCategoryGlobalDispatchZod,
  setFinancialMetricsDocumentGlobalDispatchZod,
  setIsErrorGlobalDispatchZod,
  setIsFetchingGlobalDispatchZod,
  setPrefersReducedMotionGlobalDispatchZod,
  setPrimaryColorGlobalDispatchZod,
  setPrimaryShadeDarkGlobalDispatchZod,
  setPrimaryShadeLightGlobalDispatchZod,
  setProductMetricCategoryGlobalDispatchZod,
  setProductMetricsDocumentGlobalDispatchZod,
  setProductSubMetricCategoryGlobalDispatchZod,
  setRepairMetricCategoryGlobalDispatchZod,
  setRepairMetricsDocumentGlobalDispatchZod,
  setSelectedYYYYMMDDGlobalDispatchZod,
  setStoreLocationViewGlobalDispatchZod,
} from "./schemas";
import type {
  ChartKind,
  ColorScheme,
  ExpandBarChartData,
  ExpandCalendarChartData,
  ExpandLineChartData,
  ExpandPieChartData,
  ExpandRadialBarChartData,
  ExpandSunburstChartData,
  GlobalDispatch,
  GlobalState,
  Shade,
} from "./types";

function globalReducer(
  state: GlobalState,
  dispatch: GlobalDispatch,
): GlobalState {
  const reducer = globalReducersMap.get(dispatch.action);
  return reducer ? reducer(state, dispatch) : state;
}

const globalReducersMap = new Map<
  GlobalAction[keyof GlobalAction],
  (state: GlobalState, dispatch: GlobalDispatch) => GlobalState
>([
  [globalAction.setDirectory, globalReducer_setDirectory],
  [
    globalAction.setProductMetricCategory,
    globalReducer_setProductMetricCategory,
  ],
  [
    globalAction.setProductSubMetricCategory,
    globalReducer_setProductSubMetricCategory,
  ],
  [
    globalAction.setRepairMetricCategory,
    globalReducer_setRepairMetricCategory,
  ],
  [
    globalAction.setFinancialMetricCategory,
    globalReducer_setFinancialMetricCategory,
  ],
  [
    globalAction.setCustomerMetricsCategory,
    globalReducer_setCustomerMetricsCategory,
  ],
  [
    globalAction.setFinancialMetricsDocument,
    globalReducer_setFinancialMetricsDocument,
  ],
  [
    globalAction.setProductMetricsDocument,
    globalReducer_setProductMetricsDocument,
  ],
  [
    globalAction.setCustomerMetricsDocument,
    globalReducer_setCustomerMetricsDocument,
  ],
  [
    globalAction.setRepairMetricsDocument,
    globalReducer_setRepairMetricsDocument,
  ],
  [globalAction.setColorScheme, globalReducer_setColorScheme],
  [
    globalAction.setSelectedYYYYMMDD,
    globalReducer_setSelectedYYYYMMDD,
  ],
  [globalAction.setDefaultGradient, globalReducer_setDefaultGradient],
  [globalAction.setFontFamily, globalReducer_setFontFamily],
  [
    globalAction.setPrefersReducedMotion,
    globalReducer_setPrefersReducedMotion,
  ],
  [globalAction.setPrimaryColor, globalReducer_setPrimaryColor],
  [globalAction.setPrimaryShadeDark, globalReducer_setPrimaryShadeDark],
  [globalAction.setPrimaryShadeLight, globalReducer_setPrimaryShadeLight],
  [
    globalAction.setRespectReducedMotion,
    globalReducer_setRespectReducedMotion,
  ],
  [globalAction.setIsError, globalReducer_setIsError],
  [globalAction.setIsFetching, globalReducer_setIsFetching],
  [globalAction.setExpandBarChartData, globalReducer_setExpandBarChartData],
  [
    globalAction.setExpandCalendarChartData,
    globalReducer_setExpandCalendarChartData,
  ],
  [globalAction.setExpandLineChartData, globalReducer_setExpandLineChartData],
  [globalAction.setExpandPieChartData, globalReducer_setExpandPieChartData],
  [
    globalAction.setExpandRadialBarChartData,
    globalReducer_setExpandRadialBarChartData,
  ],
  [
    globalAction.setExpandSunburstChartData,
    globalReducer_setExpandSunburstChartData,
  ],
  [globalAction.setSelectedChartKind, globalReducer_setSelectedChartKind],
  [globalAction.setStoreLocation, globalReducer_setStoreLocationView],
]);

function globalReducer_setDirectory(
  state: GlobalState,
  dispatch: GlobalDispatch,
): GlobalState {
  return parseDispatchAndSetState({
    dispatch,
    key: "directory",
    state,
    zSchema: setDirectoryGlobalDispatchZod,
  });
}

function globalReducer_setProductMetricCategory(
  state: GlobalState,
  dispatch: GlobalDispatch,
): GlobalState {
  return parseDispatchAndSetState({
    dispatch,
    key: "productMetricCategory",
    state,
    zSchema: setProductMetricCategoryGlobalDispatchZod,
  });
}

function globalReducer_setProductSubMetricCategory(
  state: GlobalState,
  dispatch: GlobalDispatch,
): GlobalState {
  return parseDispatchAndSetState({
    dispatch,
    key: "productSubMetricCategory",
    state,
    zSchema: setProductSubMetricCategoryGlobalDispatchZod,
  });
}

function globalReducer_setRepairMetricCategory(
  state: GlobalState,
  dispatch: GlobalDispatch,
): GlobalState {
  return parseDispatchAndSetState({
    dispatch,
    key: "repairMetricCategory",
    state,
    zSchema: setRepairMetricCategoryGlobalDispatchZod,
  });
}

function globalReducer_setFinancialMetricCategory(
  state: GlobalState,
  dispatch: GlobalDispatch,
): GlobalState {
  return parseDispatchAndSetState({
    dispatch,
    key: "financialMetricCategory",
    state,
    zSchema: setFinancialMetricCategoryGlobalDispatchZod,
  });
}

function globalReducer_setCustomerMetricsCategory(
  state: GlobalState,
  dispatch: GlobalDispatch,
): GlobalState {
  return parseDispatchAndSetState({
    dispatch,
    key: "customerMetricsCategory",
    state,
    zSchema: setCustomerMetricsCategoryGlobalDispatchZod,
  });
}

function globalReducer_setFinancialMetricsDocument(
  state: GlobalState,
  dispatch: GlobalDispatch,
): GlobalState {
  return parseDispatchAndSetState({
    dispatch,
    key: "financialMetricsDocument",
    state,
    zSchema: setFinancialMetricsDocumentGlobalDispatchZod,
  });
}

function globalReducer_setProductMetricsDocument(
  state: GlobalState,
  dispatch: GlobalDispatch,
): GlobalState {
  return parseDispatchAndSetState({
    dispatch,
    key: "productMetricsDocument",
    state,
    zSchema: setProductMetricsDocumentGlobalDispatchZod,
  });
}

function globalReducer_setCustomerMetricsDocument(
  state: GlobalState,
  dispatch: GlobalDispatch,
): GlobalState {
  return parseDispatchAndSetState({
    dispatch,
    key: "customerMetricsDocument",
    state,
    zSchema: setCustomerMetricsDocumentGlobalDispatchZod,
  });
}

function globalReducer_setRepairMetricsDocument(
  state: GlobalState,
  dispatch: GlobalDispatch,
): GlobalState {
  return parseDispatchAndSetState({
    dispatch,
    key: "repairMetricsDocument",
    state,
    zSchema: setRepairMetricsDocumentGlobalDispatchZod,
  });
}

function globalReducer_setColorScheme(
  state: GlobalState,
  dispatch: GlobalDispatch,
): GlobalState {
  const parsedResult = parseSyncSafe({
    object: dispatch,
    zSchema: setColorSchemeGlobalDispatchZod,
  });

  if (parsedResult.err || parsedResult.val.none) {
    return state;
  }

  const colorScheme = parsedResult.val.val.payload as ColorScheme;
  const { components } = state.themeObject;
  const { Button, Text, Title } = components;

  // set button variant
  const { defaultProps } = Button;
  const newButtonDefaultProps = {
    ...defaultProps,
    variant: colorScheme === "dark" ? "outline" : "light",
  };

  // set text color
  const { defaultProps: textDefaultProps } = Text;
  const newTextDefaultProps = {
    ...textDefaultProps,
    color: colorScheme === "dark" ? "gray.5" : "gray.8",
  };

  // set title color
  const { defaultProps: titleDefaultProps } = Title;
  const newTitleDefaultProps = {
    ...titleDefaultProps,
    color: colorScheme === "dark" ? "dark.1" : "dark.4",
  };

  return {
    ...state,
    themeObject: {
      ...state.themeObject,
      colorScheme,
      components: {
        ...components,
        Button: {
          ...Button,
          defaultProps: newButtonDefaultProps,
        },
        Text: {
          ...Text,
          defaultProps: newTextDefaultProps,
        },
        Title: {
          ...Title,
          defaultProps: newTitleDefaultProps,
        },
      },
    },
  };
}

function globalReducer_setSelectedYYYYMMDD(
  state: GlobalState,
  dispatch: GlobalDispatch,
): GlobalState {
  return parseDispatchAndSetState({
    dispatch,
    key: "selectedYYYYMMDD",
    state,
    zSchema: setSelectedYYYYMMDDGlobalDispatchZod,
  });
}

function globalReducer_setDefaultGradient(
  state: GlobalState,
  dispatch: GlobalDispatch,
): GlobalState {
  const parsedResult = parseSyncSafe({
    object: dispatch,
    zSchema: setDefaultGradientGlobalDispatchZod,
  });

  if (parsedResult.err || parsedResult.val.none) {
    return state;
  }

  return {
    ...state,
    themeObject: {
      ...state.themeObject,
      defaultGradient: parsedResult.val.val.payload as {
        deg: number;
        from: MantineColor;
        to: MantineColor;
      },
    },
  };
}

function globalReducer_setFontFamily(
  state: GlobalState,
  dispatch: GlobalDispatch,
): GlobalState {
  return {
    ...state,
    themeObject: {
      ...state.themeObject,
      fontFamily: dispatch.payload as FontFamily,
    },
  };
}

function globalReducer_setPrefersReducedMotion(
  state: GlobalState,
  dispatch: GlobalDispatch,
): GlobalState {
  return parseDispatchAndSetState({
    dispatch,
    key: "isPrefersReducedMotion",
    state,
    zSchema: setPrefersReducedMotionGlobalDispatchZod,
  });
}

function globalReducer_setPrimaryColor(
  state: GlobalState,
  dispatch: GlobalDispatch,
): GlobalState {
  const parsedResult = parseSyncSafe({
    object: dispatch,
    zSchema: setPrimaryColorGlobalDispatchZod,
  });

  if (parsedResult.err || parsedResult.val.none) {
    return state;
  }

  return {
    ...state,
    themeObject: {
      ...state.themeObject,
      primaryColor: parsedResult.val.val
        .payload as MantineColor,
    },
  };
}

function globalReducer_setPrimaryShadeDark(
  state: GlobalState,
  dispatch: GlobalDispatch,
): GlobalState {
  const parsedResult = parseSyncSafe({
    object: dispatch,
    zSchema: setPrimaryShadeDarkGlobalDispatchZod,
  });

  if (parsedResult.err || parsedResult.val.none) {
    return state;
  }

  return {
    ...state,
    themeObject: {
      ...state.themeObject,
      primaryShade: {
        ...state.themeObject.primaryShade,
        dark: parsedResult.val.val.payload as Shade,
      },
    },
  };
}

function globalReducer_setPrimaryShadeLight(
  state: GlobalState,
  dispatch: GlobalDispatch,
): GlobalState {
  const parsedResult = parseSyncSafe({
    object: dispatch,
    zSchema: setPrimaryShadeLightGlobalDispatchZod,
  });

  if (parsedResult.err || parsedResult.val.none) {
    return state;
  }

  return {
    ...state,
    themeObject: {
      ...state.themeObject,
      primaryShade: {
        ...state.themeObject.primaryShade,
        light: parsedResult.val.val.payload as Shade,
      },
    },
  };
}

function globalReducer_setRespectReducedMotion(
  state: GlobalState,
  dispatch: GlobalDispatch,
): GlobalState {
  const parsedResult = parseSyncSafe({
    object: dispatch,
    zSchema: setPrefersReducedMotionGlobalDispatchZod,
  });

  if (parsedResult.err || parsedResult.val.none) {
    return state;
  }

  return {
    ...state,
    themeObject: {
      ...state.themeObject,
      respectReducedMotion: parsedResult.val.val
        .payload as boolean,
    },
  };
}

function globalReducer_setIsError(
  state: GlobalState,
  dispatch: GlobalDispatch,
): GlobalState {
  return parseDispatchAndSetState({
    dispatch,
    key: "isError",
    state,
    zSchema: setIsErrorGlobalDispatchZod,
  });
}

function globalReducer_setIsFetching(
  state: GlobalState,
  dispatch: GlobalDispatch,
): GlobalState {
  return parseDispatchAndSetState({
    dispatch,
    key: "isFetching",
    state,
    zSchema: setIsFetchingGlobalDispatchZod,
  });
}

function globalReducer_setExpandBarChartData(
  state: GlobalState,
  dispatch: GlobalDispatch,
): GlobalState {
  if (dispatch.payload === null || dispatch.payload === undefined) {
    return state;
  }

  return {
    ...state,
    expandBarChartData: dispatch.payload as ExpandBarChartData,
  };
}

function globalReducer_setExpandCalendarChartData(
  state: GlobalState,
  dispatch: GlobalDispatch,
): GlobalState {
  if (dispatch.payload === null || dispatch.payload === undefined) {
    return state;
  }

  return {
    ...state,
    expandCalendarChartData: dispatch.payload as ExpandCalendarChartData,
  };
}

function globalReducer_setExpandLineChartData(
  state: GlobalState,
  dispatch: GlobalDispatch,
): GlobalState {
  if (dispatch.payload === null || dispatch.payload === undefined) {
    return state;
  }

  return {
    ...state,
    expandLineChartData: dispatch.payload as ExpandLineChartData,
  };
}

function globalReducer_setExpandPieChartData(
  state: GlobalState,
  dispatch: GlobalDispatch,
): GlobalState {
  if (dispatch.payload === null || dispatch.payload === undefined) {
    return state;
  }

  return {
    ...state,
    expandPieChartData: dispatch.payload as ExpandPieChartData,
  };
}

function globalReducer_setExpandRadialBarChartData(
  state: GlobalState,
  dispatch: GlobalDispatch,
): GlobalState {
  if (dispatch.payload === null || dispatch.payload === undefined) {
    return state;
  }

  return {
    ...state,
    expandRadialBarChartData: dispatch.payload as ExpandRadialBarChartData,
  };
}

function globalReducer_setExpandSunburstChartData(
  state: GlobalState,
  dispatch: GlobalDispatch,
): GlobalState {
  if (dispatch.payload === null || dispatch.payload === undefined) {
    return state;
  }

  return {
    ...state,
    expandSunburstChartData: dispatch.payload as ExpandSunburstChartData,
  };
}

function globalReducer_setSelectedChartKind(
  state: GlobalState,
  dispatch: GlobalDispatch,
): GlobalState {
  if (dispatch.payload === null || dispatch.payload === undefined) {
    return state;
  }

  return {
    ...state,
    selectedChartKind: dispatch.payload as ChartKind,
  };
}

function globalReducer_setStoreLocationView(
  state: GlobalState,
  dispatch: GlobalDispatch,
): GlobalState {
  return parseDispatchAndSetState({
    dispatch,
    key: "storeLocation",
    state,
    zSchema: setStoreLocationViewGlobalDispatchZod,
  });
}

export {
  globalReducer,
  globalReducer_setColorScheme,
  globalReducer_setCustomerMetricsCategory,
  globalReducer_setCustomerMetricsDocument,
  globalReducer_setDefaultGradient,
  globalReducer_setExpandBarChartData,
  globalReducer_setExpandCalendarChartData,
  globalReducer_setExpandLineChartData,
  globalReducer_setExpandPieChartData,
  globalReducer_setExpandRadialBarChartData,
  globalReducer_setExpandSunburstChartData,
  globalReducer_setFinancialMetricCategory,
  globalReducer_setFinancialMetricsDocument,
  globalReducer_setFontFamily,
  globalReducer_setIsError,
  globalReducer_setIsFetching,
  globalReducer_setPrefersReducedMotion,
  globalReducer_setPrimaryColor,
  globalReducer_setPrimaryShadeDark,
  globalReducer_setPrimaryShadeLight,
  globalReducer_setProductMetricCategory,
  globalReducer_setProductMetricsDocument,
  globalReducer_setProductSubMetricCategory,
  globalReducer_setRepairMetricCategory,
  globalReducer_setRepairMetricsDocument,
  globalReducer_setRespectReducedMotion,
  globalReducer_setSelectedChartKind,
  globalReducer_setSelectedYYYYMMDD,
  globalReducer_setStoreLocationView,
};
