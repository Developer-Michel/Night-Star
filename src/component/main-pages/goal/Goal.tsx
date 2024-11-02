import { Button, Col, Container, Row } from "react-bootstrap";
import "./Goal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useComm } from "@hooks/useComm";

import { GoalType } from "types/Types";
import { toast } from "react-toastify";
import { EditableRow } from "@component/assets/editable-row/EditableRow";
import { useUserData } from "@hooks/useUserData";
import CustomTooltip from "@component/assets/custom-tooltip/CustomToolTip";

export const Goal = () => {
  const [addClick, setAddClick] = useState(false);
  const { selectedUser } = useUserData();
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
          <h2>
            GOALS
            <div style={{ float: "right", opacity: 0.5 }}>
              <CustomTooltip
                tooltipText={
                  "Enter your goals, big or small, here. Whenever you achieve one, simply click the check mark to mark it as complete, keep up the great work you!"
                }>
                <FontAwesomeIcon icon={faInfoCircle} />
              </CustomTooltip>
            </div>
          </h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <p></p>
        </Col>
      </Row>
      {addClick ? (
        <EditableRow
          onSave={(newValue) => {
            if (selectedUser)
              api.goal.addGoal({
                dto: { Name: newValue, UserId: selectedUser.Id, Succeeded: false, Id: -1 },
                Success: () => {
                  refresh();
                  setAddClick(false);
                }
              });
          }}
          initialValue={""}
          succeeded={false}
          addOnly={true}
          onDelete={() => setAddClick(false)}
        />
      ) : (
        <Row>
          <Col>
            <Button
              disabled={addClick}
              onClick={() => {
                setAddClick(true);
              }}
              className="input-add-button">
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </Col>
        </Row>
      )}

      {goals.map((x) => {
        return (
          <EditableRow
            key={x.Id}
            initialValue={x.Name}
            onSave={(newValue: string) => {
              api.goal.updateGoal({
                dto: { ...x, Name: newValue },
                Success: () => {
                  refresh();
                }
              });
            }}
            succeeded={x.Succeeded}
            editable={true}
            onDelete={() => {
              if (confirm("Are you sure you want to delete this goal? " + x.Name))
                api.goal.deleteGoal({
                  dto: x,
                  Success: () => {
                    toast.error("Goal deleted");
                    refresh();
                  }
                });
            }}
            onSuccess={() => {
              if (confirm("Please confirm that you completed this goal? " + x.Name))
                api.goal.updateGoal({
                  dto: { ...x, Succeeded: true },
                  Success: () => {
                    toast.success("Well done, I'm proud of you!!:)");
                    refresh();
                  }
                });
            }}
          />
        );
      })}
    </Container>
  );
};
