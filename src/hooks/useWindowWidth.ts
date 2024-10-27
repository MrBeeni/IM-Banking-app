import { useState, useEffect } from "react";
import { useWindowSize } from "@react-hook/window-size";

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState<number>();
  const [width] = useWindowSize();

  const getBreakpointWidth = (width: number) => {
    if (width < 576) {
      return width - 30; // Extra small (max-width: 575px)
    } else if (width >= 576 && width < 768) {
      return width - 30; // Small (576px - 767px)
    } else if (width >= 768 && width < 992) {
      return width - 80; // Medium (768px - 991px)
    } else if (width >= 992 && width < 1020) {
      return width - 120; // Large (992px - 1019px) - 88% of the width
    } else if (width >= 1020 && width < 1200) {
      return width - 360; // Extra large (1020px - 1199px) - 87% of the width
    } else if (width >= 1200 && width < 2048) {
      return width - 695; // 2k screens (1200px - 2047px) - 85% of the width
    } else {
      return width - 700; // Above 2k (2048px and above) - 80% of the width
    }
  };

  useEffect(() => {
    setWindowWidth(getBreakpointWidth(width));
  }, [width]);

  return windowWidth;
};

export default useWindowWidth;
