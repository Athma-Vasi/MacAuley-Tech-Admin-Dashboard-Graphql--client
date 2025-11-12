/* eslint-disable @typescript-eslint/no-unused-vars */
import { Group, Loader, Space, Stack, Text } from "@mantine/core";
import React, { useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";
import {
  TbAffiliate,
  TbFileDatabase,
  TbLogout,
  TbReportMoney,
  TbTestPipe,
  TbTools,
  TbUser,
} from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { COLORS_SWATCHES, METRICS_URL } from "../../constants";
import { globalAction } from "../../context/globalProvider";
import { useMountedRef } from "../../hooks";
import { useAuth } from "../../hooks/useAuth";
import { useGlobalState } from "../../hooks/useGlobalState";
import { returnThemeColors } from "../../utils";
import { AccessibleButton } from "../accessibleInputs/AccessibleButton";
import { AccessibleNavLink } from "../accessibleInputs/AccessibleNavLink";
import { type MessageEventDashboardCacheWorkerToMain } from "../dashboard/cacheWorker";
import MetricsCacheWorker from "../dashboard/cacheWorker?worker";
import { sidebarAction } from "./actions";
import {
  handleMessageEventMetricsCacheWorkerToMain,
  handleMetricCategoryNavClick,
} from "./handlers";
import { sidebarReducer } from "./reducers";
import { initialSidebarState } from "./state";

type SidebarProps = {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

function Sidebar({ opened, setOpened }: SidebarProps) {
  const { authDispatch } = useAuth();
  const {
    globalState,
    globalDispatch,
  } = useGlobalState();
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();
  const [sidebarState, sidebarDispatch] = React.useReducer(
    sidebarReducer,
    initialSidebarState,
  );

  const isComponentMountedRef = useMountedRef();

  const {
    themeObject,
    productMetricCategory,
    repairMetricCategory,
    storeLocation,
    isFetching,
    selectedYYYYMMDD,
  } = globalState;
  const {
    clickedNavlink,
    directoryFetchWorker,
    logoutFetchWorker,
    metricsCacheWorker,
    prefetchAndCacheWorker,
  } = sidebarState;

  useEffect(() => {
    const newMetricsCacheWorker = new MetricsCacheWorker();
    sidebarDispatch({
      action: sidebarAction.setMetricsCacheWorker,
      payload: newMetricsCacheWorker,
    });

    newMetricsCacheWorker.onmessage = async (
      event: MessageEventDashboardCacheWorkerToMain,
    ) => {
      await handleMessageEventMetricsCacheWorkerToMain({
        event,
        globalDispatch,
        isComponentMountedRef,
        navigate,
        showBoundary,
      });
    };

    return () => {
      isComponentMountedRef.current = false;
      newMetricsCacheWorker.terminate();
    };
  }, []);

  const productsNavlink = (
    <AccessibleNavLink
      attributes={{
        dataTestId: "products-navlink",
        icon: clickedNavlink === "products" && isFetching
          ? <Loader data-testid={"products-navlink-loader-icon"} size={18} />
          : <TbAffiliate size={18} />,
        name: "Products",
        onClick: async () => {
          sidebarDispatch({
            action: sidebarAction.setClickedNavlink,
            payload: "products",
          });

          await handleMetricCategoryNavClick({
            metricsCacheWorker,
            globalDispatch,
            isComponentMountedRef,
            metricsUrl: METRICS_URL,
            metricsView: "products",
            productMetricCategory,
            repairMetricCategory,
            showBoundary,
            storeLocation,
          });

          setOpened(false);
        },
      }}
    />
  );

  const financialsNavlink = (
    <AccessibleNavLink
      attributes={{
        dataTestId: "financials-navlink",
        icon: clickedNavlink === "financials" && isFetching
          ? <Loader size={18} />
          : <TbReportMoney size={18} />,
        name: "Financials",
        onClick: async () => {
          sidebarDispatch({
            action: sidebarAction.setClickedNavlink,
            payload: "financials",
          });

          await handleMetricCategoryNavClick({
            metricsCacheWorker,
            globalDispatch,
            isComponentMountedRef,
            metricsUrl: METRICS_URL,
            metricsView: "financials",
            productMetricCategory,
            repairMetricCategory,
            showBoundary,
            storeLocation,
          });

          setOpened(false);
        },
      }}
    />
  );

  const customersNavlink = (
    <AccessibleNavLink
      attributes={{
        dataTestId: "customers-navlink",
        icon: clickedNavlink === "customers" && isFetching
          ? <Loader size={18} />
          : <TbUser size={18} />,
        name: "Customers",
        onClick: async () => {
          sidebarDispatch({
            action: sidebarAction.setClickedNavlink,
            payload: "customers",
          });

          await handleMetricCategoryNavClick({
            metricsCacheWorker,
            globalDispatch,
            isComponentMountedRef,
            metricsUrl: METRICS_URL,
            metricsView: "customers",
            productMetricCategory,
            repairMetricCategory,
            showBoundary,
            storeLocation,
          });

          setOpened(false);
        },
      }}
    />
  );

  const repairsNavlink = (
    <AccessibleNavLink
      attributes={{
        dataTestId: "repairs-navlink",
        icon: clickedNavlink === "repairs" && isFetching
          ? <Loader size={18} />
          : <TbTools size={18} />,
        name: "Repairs",
        onClick: async () => {
          sidebarDispatch({
            action: sidebarAction.setClickedNavlink,
            payload: "repairs",
          });

          await handleMetricCategoryNavClick({
            metricsCacheWorker,
            globalDispatch,
            isComponentMountedRef,
            metricsUrl: METRICS_URL,
            metricsView: "repairs",
            productMetricCategory,
            repairMetricCategory,
            showBoundary,
            storeLocation,
          });

          setOpened(false);
        },
      }}
    />
  );

  const directoryNavlink = (
    <AccessibleNavLink
      attributes={{
        dataTestId: "directory-navlink",
        icon: clickedNavlink === "directory" && isFetching
          ? <Loader size={18} />
          : <TbFileDatabase size={18} />,
        name: "Directory",
        onClick: async () => {
          sidebarDispatch({
            action: sidebarAction.setClickedNavlink,
            payload: "directory",
          });

          globalDispatch({
            action: globalAction.setIsFetching,
            payload: true,
          });

          setOpened(false);
        },
        onMouseEnter: async () => {
        },
      }}
    />
  );

  const testingNavlink = (
    <AccessibleNavLink
      attributes={{
        dataTestId: "testing-navlink",
        icon: <TbTestPipe size={18} />,
        name: "Testing",
        onClick: async () => {
          navigate("/testing");
          setOpened(false);
        },
      }}
    />
  );

  const usersNavlink = (
    <AccessibleNavLink
      attributes={{
        dataTestId: "users-navlink",
        icon: <TbUser size={18} />,
        name: "Users",
        onClick: () => {
          navigate("/dashboard/users");
          setOpened(false);
        },
      }}
    />
  );

  const { bgGradient } = returnThemeColors({
    colorsSwatches: COLORS_SWATCHES,
    themeObject,
  });

  const logoutButton = (
    <AccessibleButton
      attributes={{
        dataTestId: "logout-button",
        enabledScreenreaderText: "Logout",
        kind: "logout",
        leftIcon: clickedNavlink === "logout" && isFetching
          ? (
            <Loader
              size={18}
              color={themeObject.colorScheme === "light" ? "white" : ""}
            />
          )
          : <TbLogout size={18} />,
        name: "logout",
        onClick: async () => {
          sidebarDispatch({
            action: sidebarAction.setClickedNavlink,
            payload: "logout",
          });
        },
      }}
    />
  );

  return (
    <Stack
      bg={bgGradient}
      className={`sidebar ${opened ? "opened" : ""}`}
      pt="xl"
      w="100%"
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        zIndex: 2,
      }}
    >
      <Group w="100%" position="left">
        <Text size={18} weight={400}>
          Metrics
        </Text>
      </Group>
      {financialsNavlink}
      {productsNavlink}
      {customersNavlink}
      {repairsNavlink}
      <Text size={18} weight={400} pt="xl">
        Directory
      </Text>
      {directoryNavlink}
      {usersNavlink}
      <Space h="xl" />
      {logoutButton}
    </Stack>
  );
}

export default Sidebar;
