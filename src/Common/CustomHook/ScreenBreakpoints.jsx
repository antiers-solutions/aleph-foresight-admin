import { Grid } from "antd";
const { useBreakpoint } = Grid;

export default function ScreenBreakpoints() {
  const screens = useBreakpoint();
  const isLargeScreen = screens.lg;
  const isMediumScreen = screens.md;
  const isSmallScreen = screens.sm;
  const isXXLargeScreen = screens.xxl;
  const isXlargeScreen = screens.xl;
  const isExtraSmallScreen = screens.xs;

  return [
    isLargeScreen,
    isMediumScreen,
    isSmallScreen,
    isXXLargeScreen,
    isXlargeScreen,
    isExtraSmallScreen,
  ];
}
