import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useMemo, useState, useEffect } from "react";
import { Tooltip } from "antd";
import "./SideBar.scss";
import { Logout } from "../../assets/svgImages/StoreAsset";
import useCurrentWidth from "../CustomHook/useCurrentWidth";
import { sidebarMenuItems } from "../../constant/structuralContants";
import { handleLogout } from "../../helpers/commonApiHelpers";
import { Path } from "../Routing/Constant/RoutePaths";

function SidebarDashboard(props) {
  const { logo, className, onClick, icons, ...rest } = props;
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [arrow, setArrow] = useState("Show");
  const width = useCurrentWidth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const activeIndex = useMemo(() => {
    const index = sidebarMenuItems?.findIndex(
      (menuItem) => menuItem?.link === pathname //to persist choosen sidebar option
    );
    return index !== -1 ? index : 0;
  }, [pathname]);

  const mergedArrow = useMemo(() => {
    if (arrow === "Hide") {
      return false;
    }
    if (arrow === "Show") {
      return true;
    }
    return {
      pointAtCenter: true,
    };
  }, [arrow]);

  const openDisputeModal = () => {
    setShowDisputeModal(true);
  };

  const closeDisputeModal = () => {
    setShowDisputeModal(false);
  };

  const logoutHandler = async () => {
    const isLogout = await handleLogout(setLoading);
    if (isLogout) {
      navigate("/");
    }
  };

  return (
    <div className={`sideBar  ${className}`} {...rest}>
      <div className="sideBar_logo">
        <Link to={Path.DASHBOARD}>
          {" "}
          <img src={logo} alt="logo" className="reslogo" />
        </Link>
        {width > 991 && <span onClick={onClick}>{icons}</span>}
      </div>
      <div className="sideBar_menuItem">
        <div className="sideBar_menuItem_top">
          <ul>
            {sidebarMenuItems?.map((menuItem, index) => (
              <li key={index}>
                <Tooltip
                  placement="right"
                  title={
                    className === "dashLayout_sidebar CloaseNavbar" &&
                    menuItem?.tip
                  }
                  arrow={mergedArrow}
                >
                  <Link
                    to={menuItem?.link}
                    className={index === activeIndex ? "active" : ""}
                  >
                    <span>{menuItem?.icon}</span>
                    <b>{menuItem?.text}</b>
                  </Link>
                </Tooltip>
              </li>
            ))}
          </ul>
        </div>
        <div className="sideBar_menuItem_logout">
          <ul>
            <li>
              <Link to="#" onClick={logoutHandler}>
                <Tooltip
                  placement="right"
                  title={
                    className === "dashLayout_sidebar CloaseNavbar" && "Logout"
                  }
                  arrow={mergedArrow}
                >
                  <span>
                    <Logout />
                  </span>
                </Tooltip>
                <b>Logout</b>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SidebarDashboard;
