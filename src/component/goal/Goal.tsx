import { Button, Col, Container, Row } from "react-bootstrap";
import "./Goal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faEdit, faPlusCircle, faRemove, faSave } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { useComm } from "@hooks/useComm";
import { useDataContext } from "@context/DataContext";
import { Goal } from "types/Types";

export const Goal = () => {
  const [addClick, setAddClick] = useState(false);
  const { selectedUser } = useDataContext();
  const [goals, setGoals] = useState<Goal[]>([]);
  const { api } = useComm();
  useEffect(() => {
    if (selectedUser) api.goal.getAllGoals({ dto: { userId: selectedUser.Id }, Success: setGoals });
  }, []);
  return (
    <Container className="goal">
      <Row>
        <Col>
          <Button
            disabled={addClick}
            onClick={() => {
              setAddClick(true);
            }}
            className="Goal-add-button">
            <FontAwesomeIcon icon={faPlusCircle} />
          </Button>
        </Col>
      </Row>
      {addClick && <InEditRow setAddClick={setAddClick} />}
    </Container>
  );
};
const DoneRow = ({ setAddClick }: { setAddClick: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const ref = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    setTimeout(() => {
      ref.current?.focus();
    }, 100);
  });
  return (
    <Row>
      <Col className="in-edit-row">
        <input ref={ref} className="in-edit-row-input" />
        <Button
          onClick={() => {
            setAddClick(false);
          }}
          style={{ backgroundColor: "#BF0000" }}
          className="in-edit-row-button">
          <FontAwesomeIcon icon={faEdit} />
        </Button>
        <Button style={{ backgroundColor: "#4f6457" }} className="in-edit-row-button">
          <FontAwesomeIcon icon={faCheckCircle} />
        </Button>
      </Col>
    </Row>
  );
};

const InEditRow = ({ setAddClick }: { setAddClick: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const ref = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    setTimeout(() => {
      ref.current?.focus();
    }, 100);
  });
  return (
    <Row>
      <Col className="in-edit-row">
        <input ref={ref} className="in-edit-row-input" />
        <Button
          onClick={() => {
            setAddClick(false);
          }}
          style={{ backgroundColor: "#BF0000" }}
          className="in-edit-row-button">
          <FontAwesomeIcon icon={faRemove} />
        </Button>
        <Button style={{ backgroundColor: "#4f6457" }} className="in-edit-row-button">
          <FontAwesomeIcon icon={faSave} />
        </Button>
      </Col>
    </Row>
  );
};
