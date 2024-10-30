import React, { useState, useEffect, ReactNode } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

interface Props {
  children: ReactNode;
  tooltipText: string;
}

const CustomTooltip: React.FC<Props> = ({ children, tooltipText }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const isMobile = () => window.innerWidth <= 768;

  const handleMouseEnter = () => {
    if (!isMobile()) {
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile()) {
      setShowTooltip(false);
    }
  };

  const handleToggleTooltip = () => {
    if (isMobile()) {
      setShowTooltip(!showTooltip);
    }
  };

  // Close tooltip on outside click for mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!event.target || !(event.target as HTMLElement).closest(".tooltip-trigger")) {
        setShowTooltip(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <OverlayTrigger show={showTooltip} placement="left" overlay={<Tooltip>{tooltipText}</Tooltip>}>
      <span
        className="tooltip-trigger"
        onClick={handleToggleTooltip}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        {children}
      </span>
    </OverlayTrigger>
  );
};

export default CustomTooltip;
