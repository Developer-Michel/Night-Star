import { faTrash, faSave, faCheck, faCheckCircle, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useState, useRef, useEffect, ChangeEvent } from "react";
import { Row, Col, Button } from "react-bootstrap";
import "./EditableRow.scss";
export const EditableRow = ({
  initialValue,
  onSave,
  onSuccess,
  onDelete,
  succeeded = false,
  editable = false,
  addOnly = false
}: {
  initialValue: string;
  succeeded?: boolean;
  onSave?: (newValue: string) => void;
  onSuccess?: () => void;
  onDelete?: () => void;
  editable?: boolean;
  addOnly?: boolean;
}) => {
  const [state, setState] = useState<string>(initialValue);
  const [inEdit, setInEdit] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height to auto to shrink if needed
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on content
    }
  };
  useEffect(() => {
    if (addOnly)
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
  }, []);
  useEffect(() => {
    adjustTextareaHeight(); // Adjust height when component mounts or inputValue changes
  }, [state, inEdit]);
  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setState(event.target.value);
  };
  return (
    <Row>
      <Col className={`input-container-row ${succeeded ? "success" : "info"} ${(inEdit || addOnly) && "in-edit"}`}>
        {inEdit || addOnly ? (
          <>
            <textarea
              disabled={!inEdit && !addOnly}
              onChange={handleInputChange}
              ref={textareaRef}
              defaultValue={initialValue}
              className="input-container-row-input"
            />
            {onDelete && (
              <Button
                onClick={() => {
                  onDelete();
                }}
                style={{ color: "#BF0000" }}
                className="input-container-row-button">
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            )}
            {onSave && (
              <Button
                onClick={() => {
                  onSave(state);
                  setInEdit(false);
                }}
                style={{ color: "darkgreen" }}
                className="input-container-row-button">
                <FontAwesomeIcon icon={faSave} />
              </Button>
            )}
          </>
        ) : (
          <>
            <div style={{ whiteSpace: "pre-line" }} className="input-container-row-input ">
              {state}
            </div>
            {succeeded ? (
              <div className="input-container-row-success-indicator">
                <FontAwesomeIcon icon={faCheck} />
              </div>
            ) : (
              <>
                {editable && (
                  <Button
                    onClick={() => {
                      setInEdit(true);
                      setTimeout(() => {
                        textareaRef.current?.focus();
                      }, 200);
                    }}
                    style={{ color: "	#D397F8" }}
                    className="input-container-row-button">
                    <FontAwesomeIcon icon={faPen} />
                  </Button>
                )}

                {onSuccess && (
                  <Button style={{ color: "#4f6457" }} onClick={onSuccess} className="input-container-row-button">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </Button>
                )}
              </>
            )}
          </>
        )}
        <hr></hr>
      </Col>
    </Row>
  );
};
