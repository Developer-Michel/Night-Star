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
  const [isTouching, setIsTouching] = useState(false);
  useEffect(() => {
    if (isTouching) {
      document.body.style.overflow = "hidden"; // Disable scroll when touching slider
    } else {
      document.body.style.overflow = "auto"; // Re-enable scroll after touch
    }
  }, [isTouching]);
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
          onMouseUp={() => submit(value)}
          onTouchStart={() => setIsTouching(true)}
          onTouchEnd={() => {
            setIsTouching(false);
            submit(value);
          }}
        />
      </Col>
    </Row>
  );
};
