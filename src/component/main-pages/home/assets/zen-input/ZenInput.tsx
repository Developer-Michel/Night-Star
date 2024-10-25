import React, { useEffect, useState } from "react";
import "./ZenInput.scss"; // Import the CSS for styling
import { Col, Row } from "react-bootstrap";

const ZenInput = ({
  placeholder,
  defaultValue,
  onSubmit
}: {
  placeholder: string;
  defaultValue: string;
  onSubmit: (val: string) => void;
}) => {
  const [inputValue, setInputValue] = useState(defaultValue);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <Row className={`zen-input-container ${isVisible && "visible"}`}>
      <Col>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={() => onSubmit(inputValue)}
          placeholder={placeholder}
          className={"zen-input "}
        />
      </Col>
    </Row>
  );
};

export default ZenInput;
