import { useDataContext } from "@context/DataContext";
import { faPlusCircle, faTrash, faSave, faCheck, faEdit, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useComm } from "@hooks/useComm";
import { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { FeedbackType } from "types/Types";
import "./Feedback.scss";
import { format } from "date-fns";

export const Feedback = () => {
  const [addClick, setAddClick] = useState(false);
  const { selectedUser } = useDataContext();
  const [datas, setDatas] = useState<FeedbackType[]>([]);
  const { api } = useComm();
  useEffect(() => {
    refresh();
  }, []);
  const refresh = () => {
    if (selectedUser)
      api.feedback.getAllFeedbacks({
        Success: (data) => {
          setDatas(data);
          setAddClick(false);
        }
      });
  };
  return (
    <Container className="goal">
      <Row>
        <Col>
          <h2>FEEDBACKS</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>
            "You can enter suggestions or report any bugs found here, and the lead developer of this app will review
            your requests as quickly as possible!"
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
      {datas.map((x) => {
        return <NormalRow key={x.Id} data={x} refresh={refresh} />;
      })}
      {addClick && <AddRow setAddClick={setAddClick} refresh={refresh} />}
    </Container>
  );
};

const NormalRow = ({ data, refresh }: { data: FeedbackType; refresh: () => void }) => {
  const [state, setState] = useState<FeedbackType>(data);
  const ref = useRef<HTMLInputElement | null>(null);
  const { selectedUser } = useDataContext();
  const [inEdit, setInEdit] = useState(false);
  const { api } = useComm();
  const onSaveClick = () => {
    api.feedback.updateFeedback({
      dto: state,
      Success: () => {
        setInEdit(false);
        refresh();
      }
    });
  };
  const onDoneClick = () => {
    if (confirm("Please confirm that you completed this goal? " + data.Name))
      api.feedback.updateFeedback({
        dto: { ...state, Succeeded: true },
        Success: () => {
          toast.success("Well done, I'm proud of you!!:)");
          refresh();
        }
      });
  };
  const onDeleteClick = () => {
    if (confirm("Are you sure you want to delete this goal? " + data.Name))
      api.feedback.deleteFeedback({
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
              <div className="input-container-row-button">
                <FontAwesomeIcon icon={faCheck} />
              </div>
            ) : (
              <>
                <div className="input-container-row-button">{data.Date}</div>
                <Button
                  onClick={() => {
                    setInEdit(true);
                  }}
                  style={{ backgroundColor: "	#D397F8" }}
                  className="input-container-row-button">
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                {selectedUser?.UserName == "MICHEL" && (
                  <Button
                    style={{ backgroundColor: "#4f6457" }}
                    onClick={onDoneClick}
                    className="input-container-row-button">
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

const AddRow = ({
  setAddClick,
  refresh
}: {
  setAddClick: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: () => void;
}) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState("");
  const { api } = useComm();
  const onSavePress = () => {
    const dto: FeedbackType = { Name: inputValue, Succeeded: false, Id: 0, Date: format(new Date(), "yyyy-MM-dd") };
    api.feedback.addFeedback({
      dto: dto,
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
          placeholder="Enter a Feedback here...."
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
