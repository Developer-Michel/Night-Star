import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./ZenSlider.scss";
import CustomTooltip from "@component/assets/custom-tooltip/CustomToolTip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
export const ZenSlider = ({
  placeholder,
  defaultValue,
  tooltip,
  submit,
  uom,
  multiple = 1,
  max
}: {
  placeholder: string;
  tooltip?: string;
  defaultValue: number;
  submit: (value: number) => void;
  uom: string;
  multiple?: number;
  max: number;
}) => {
  const [value, setValue] = useState(defaultValue);
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);
  const handleTouchStart = (e: React.TouchEvent<HTMLInputElement>) => {
    // Check if touch target is the handle
    if (e.target === e.currentTarget) {
      setIsDragging(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLInputElement>) => {
    if (isDragging) {
      setValue(Number(parseFloat(e.currentTarget.value)));
    }
  };

  const handleTouchEnd = () => {
    if (isDragging) {
      submit(value);
      setIsDragging(false);
    }
  };

  return (
    <Row className={`zen-slider-container ${isVisible ? "visible" : ""}`}>
      <Col>
        <div className="zen-value">
          {placeholder}:{" "}
          {uom != "H" ? `${value}${uom}` : `${Math.floor(value / 60)}${uom}${(value % 60).toString().padStart(2, "0")}`}
          &nbsp;
          {tooltip && (
            <div style={{ float: "right", opacity: 0.5 }}>
              <CustomTooltip tooltipText={tooltip}>
                <FontAwesomeIcon icon={faInfoCircle} />
              </CustomTooltip>
            </div>
          )}
        </div>

        <input
          className="zen-slider"
          type="range"
          min="0"
          defaultValue={defaultValue}
          max={max}
          step={multiple}
          onChange={(e) => setValue(Number(parseFloat(e.target.value)))}
          onMouseUp={() => submit(value)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      </Col>
    </Row>
  );
};
