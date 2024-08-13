import React from "react";
import { Navigate } from "react-router-dom";
import { Suspense } from "react";
import { Path } from "../Constant/RoutePaths";
import DashboardLayout from "../../Layouts/DashboardLayout/DashboardLayout";
import { isLoggedIn } from "../../../utils/walletHelpers";

const Private = () => {
  const address = isLoggedIn();

  if (address)
    return (
      <Suspense fallback={""}>
        <DashboardLayout />
      </Suspense>
    );

  return <Navigate to={Path.HOME} replace />;
};

export default Private;
