import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./ZenSlider.scss";
export const ZenSlider = ({
  placeholder,
  defaultValue,
  submit,
  uom,
  multiple = 1,
  max
}: {
  placeholder: string;
  defaultValue: number;
  submit: (value: number) => void;
  uom: string;
  multiple?: number;
  max: number;
}) => {
  const [value, setValue] = useState(defaultValue);

  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(parseFloat(e.target.value)));
  };

  return (
    <Row className={`zen-slider-container ${isVisible ? "visible" : ""}`}>
      <Col>
        <div className="zen-value">
          {placeholder}: {value}
          {uom}
        </div>

        <input
          className="zen-slider"
          type="range"
          min="0"
          defaultValue={defaultValue}
          max={max}
          step={multiple}
          onChange={handleChange}
          onMouseUp={() => submit(value)} // Triggered when mouse button is released
          onTouchEnd={() => submit(value)}
        />
      </Col>
    </Row>
  );
};
