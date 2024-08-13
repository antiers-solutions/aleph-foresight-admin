import React, { Suspense } from "react";
import { Navigate } from "react-router-dom";
import { Path } from "../Constant/RoutePaths";
import OnboardAuthLayout from "../../Layouts/OnboardLayout/OnboardLayout.jsx";
import { isLoggedIn } from "../../../utils/walletHelpers.jsx";

const Public = () => {
  const address = isLoggedIn();

  return address ? (
    <Navigate to={Path.DASHBOARD} />
  ) : (
    <Suspense fallback={""}>
      <OnboardAuthLayout />
    </Suspense>
  );
};

export default Public;
