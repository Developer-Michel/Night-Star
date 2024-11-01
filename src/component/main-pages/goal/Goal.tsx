import { Button, Col, Container, Row } from "react-bootstrap";
import "./Goal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCheckCircle, faEdit, faPlusCircle, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { useComm } from "@hooks/useComm";
import { useDataContext } from "@context/DataContext";
import { GoalType } from "types/Types";
import { toast } from "react-toastify";

export const Goal = () => {
  const [addClick, setAddClick] = useState(false);
  const { selectedUser } = useDataContext();
  const [goals, setGoals] = useState<GoalType[]>([]);
  const { api } = useComm();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    refresh();
    setTimeout(() => {
      setVisible(true);
    }, 300);
  }, []);
  const refresh = () => {
    if (selectedUser)
      api.goal.getAllGoals({
        dto: { userId: selectedUser.Id },
        Success: (data) => {
          setGoals(data);
          setAddClick(false);
        }
      });
  };
  return (
    <Container className={`goal transition-enter ${visible && "visible"}`}>
      <Row>
        <Col>
          <h2>GOALS</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>
            "Enter your goals, big or small, here. Whenever you achieve one, simply click the check mark to mark it as
            complete, keep up the great work you!"
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            disabled={addClick}
            onClick={() => {
              setAddClick(true);
            }}
            className="input-add-button">
            <FontAwesomeIcon icon={faPlusCircle} />
          </Button>
        </Col>
      </Row>
      {goals.map((x) => {
        return <NormalRow data={x} refresh={refresh} />;
      })}
      {addClick && <AddRow setAddClick={setAddClick} refresh={refresh} />}
    </Container>
  );
};

const NormalRow = ({ data, refresh }: { data: GoalType; refresh: () => void }) => {
  const [state, setState] = useState<GoalType>(data);
  const ref = useRef<HTMLInputElement | null>(null);
  const [inEdit, setInEdit] = useState(false);
  const { api } = useComm();

  const onSaveClick = () => {
    api.goal.updateGoal({
      dto: state,
      Success: () => {
        setInEdit(false);
        refresh();
      }
    });
  };
  const onDoneClick = () => {
    if (confirm("Please confirm that you completed this goal? " + data.Name))
      api.goal.updateGoal({
        dto: { ...state, Succeeded: true },
        Success: () => {
          toast.success("Well done, I'm proud of you!!:)");
          refresh();
        }
      });
  };
  const onDeleteClick = () => {
    if (confirm("Are you sure you want to delete this goal? " + data.Name))
      api.goal.deleteGoal({
        dto: state,
        Success: () => {
          toast.error("Goal deleted");
          refresh();
        }
      });
  };
  return (
    <Row>
      <Col className={`input-container-row ${inEdit && "in-edit"}`}>
        {inEdit ? (
          <>
            <input
              type="text"
              disabled={!inEdit}
              onChange={(e) => setState({ ...state, Name: e.target.value })}
              ref={ref}
              defaultValue={state.Name}
              className="input-container-row-input"
            />
            <Button
              onClick={() => {
                onDeleteClick();
              }}
              style={{ backgroundColor: "#BF0000" }}
              className="input-container-row-button">
              <FontAwesomeIcon icon={faTrash} />
            </Button>
            <Button onClick={onSaveClick} style={{ backgroundColor: "#4f6457" }} className="input-container-row-button">
              <FontAwesomeIcon icon={faSave} />
            </Button>
          </>
        ) : (
          <>
            <div className="input-container-row-input">{data.Name}</div>
            {data.Succeeded ? (
              <div className="input-container-row-success-indicator">
                <FontAwesomeIcon icon={faCheck} />
              </div>
            ) : (
              <>
                <Button
                  onClick={() => {
                    setInEdit(true);
                  }}
                  style={{ backgroundColor: "	#D397F8" }}
                  className="input-container-row-button">
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button
                  style={{ backgroundColor: "#4f6457" }}
                  onClick={onDoneClick}
                  className="input-container-row-button">
                  <FontAwesomeIcon icon={faCheckCircle} />
                </Button>
              </>
            )}
          </>
        )}
        <hr></hr>
      </Col>
    </Row>
  );
};

const AddRow = ({
  setAddClick,
  refresh
}: {
  setAddClick: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: () => void;
}) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const { selectedUser } = useDataContext();
  const [inputValue, setInputValue] = useState("");
  const { api } = useComm();
  const onSavePress = () => {
    if (selectedUser)
      api.goal.addGoal({
        dto: { Name: inputValue, UserId: selectedUser.Id, Succeeded: false, Id: -1 },
        Success: () => {
          refresh();
        }
      });
  };
  useEffect(() => {
    setTimeout(() => {
      ref.current?.focus();
    }, 100);
  }, []);
  return (
    <Row>
      <Col className="input-container-row in-edit ">
        <input
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          ref={ref}
          placeholder="Enter a goal here...."
          className="input-container-row-input"
        />
        <Button
          onClick={() => {
            setAddClick(false);
          }}
          style={{ backgroundColor: "#BF0000" }}
          className="input-container-row-button">
          <FontAwesomeIcon icon={faTrash} />
        </Button>
        <Button onClick={onSavePress} style={{ backgroundColor: "#4f6457" }} className="input-container-row-button">
          <FontAwesomeIcon icon={faPlusCircle} />
        </Button>
      </Col>
    </Row>
  );
};
