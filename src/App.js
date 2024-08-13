import React, { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.scss";
import routes from "./Common/Routing/Routes.jsx";
import ErrorBoundary from "./Common/Pages/ErrorBoundary/ErrorBoundary.jsx";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { handleLogout } from "./helpers/commonApiHelpers.jsx";
import Loader from "./Common/Loader/index.jsx";
import { useIsLoggedIn } from "./context/loggedInContext.jsx";
import { isLoggedIn } from "./utils/walletHelpers.jsx";

function App() {
  const provider = window.ethereum;
  const [loading, setLoading] = useState(false);
  const { loggedInValue, setLoggedInValue } = useIsLoggedIn();
  const address = isLoggedIn();

  useEffect(() => {
    const handleAccountsChanged = async (accounts) => {
      if (accounts[0] && (loggedInValue?.length || address?.length)) {
        setLoggedInValue("");
        await handleLogout(setLoading);
      }
    };

    const handleNetworkChanged = async (networkId) => {
      if (networkId && (loggedInValue?.length || address?.length)) {
        setLoggedInValue("");
        await handleLogout(setLoading);
      }
    };

    if (provider) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleNetworkChanged);

      return () => {
        window.ethereum.off("accountsChanged", handleAccountsChanged);
        window.ethereum.off("chainChanged", handleNetworkChanged);
      };
    }
  }, [provider, loggedInValue, address]);

  const router = createBrowserRouter([
    {
      path: "/",
      children: routes,
      errorElement: <ErrorBoundary />,
    },
  ]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <RouterProvider router={router} />
      <NotificationContainer />
    </>
  );
}

export default App;
