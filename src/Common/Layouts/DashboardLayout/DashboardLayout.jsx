import { Outlet } from "react-router-dom";
import "./DashboardLayout.scss";
import Header from "../../Header/Header.jsx";
import SidebarDashboard from "../../SidebarDashboard/SidebarDashboard.jsx";
import logo from "../../../assets/Logo.svg";
import smallLogo from "../../../assets/logosmall.svg";
import { useState, useEffect } from "react";
import useCurrentWidth from "../../CustomHook/useCurrentWidth.jsx";

function DashboardLayout() {
  const [isNavbarOpen, SetIsNavbarOpen] = useState(true);
  const width = useCurrentWidth();

  useEffect(() => {
    if (width <= 991) {
      SetIsNavbarOpen(false);
    } else SetIsNavbarOpen(true);
  }, [width]);

  return (
    <div className="dashLayout">
      <div className="dashLayout_sidebar">
        <SidebarDashboard
          className={`dashLayout_sidebar ${
            isNavbarOpen ? "openNavbar" : "CloaseNavbar"
          }`}
          logo={isNavbarOpen ? logo : smallLogo}
        />
      </div>
      <div className="dashLayout_content">
        <div className="dashLayout_content_header">
          <Header />
        </div>
        <div className="dashLayout_content_body">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
