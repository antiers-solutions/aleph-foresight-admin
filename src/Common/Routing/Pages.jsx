import React from "react";
import { Path } from "./Constant/RoutePaths.jsx";
import Dashboard from "../Pages/Dashboard/Dashboard.jsx";
import Login from "../Pages/Login/Login.jsx";
import UserManagement from "../Pages/userManagement/UserMangement.jsx";
import EventManagement from "../Pages/EventManagement/EventManagement.jsx";
import CreateEvent from "../Pages/CreateEvent/CreateEvent.jsx";
import Activity from "../Pages/Activity/Activity.jsx";
import Arbitration from "../Pages/Arbitration/Arbitration.jsx";
import Disputes from "../Pages/Disputes/Disputes.jsx";
import Settings from "../Pages/Settings/Settings.jsx";

export const PAGES = {
  PUBLIC_PAGES: [
    { path: Path.HOME, element: <Login /> },
    { path: Path.ANY, element: <Login /> },
  ],
  PRIVATE_PAGES: [
    { path: Path.DASHBOARD, element: <Dashboard /> },
    { path: Path.USER, element: <UserManagement /> },
    { path: Path.EVENT, element: <EventManagement /> },
    { path: Path.CREATE, element: <CreateEvent /> },
    { path: Path.ACTIVITY, element: <Activity /> },
    { path: Path.ARBITRATION, element: <Arbitration /> },
    { path: Path.DISPUTES, element: <Disputes /> },
    { path: Path.SETTINGS, element: <Settings /> },
  ],
};
