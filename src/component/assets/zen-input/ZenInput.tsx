import React, { ChangeEvent, useEffect, useRef, useState } from "react";
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
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    adjustTextareaHeight(); // Adjust height when component mounts or inputValue changes
  }, [inputValue]);
  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height to auto to shrink if needed
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on content
    }
  };

  return (
    <Row>
      <Col className={`zen-input-container ${isVisible && "visible"}`}>
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={() => onSubmit(inputValue)}
          placeholder={placeholder}
          className="zen-input"
        />
      </Col>
    </Row>
  );
};

export default ZenInput;
