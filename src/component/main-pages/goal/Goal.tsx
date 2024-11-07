import { Button, Col, Container, Row } from "react-bootstrap";
import "./Goal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useComm } from "@hooks/useComm";

import { GoalType } from "types/Types";
import { EditableRow } from "@component/assets/editable-row/EditableRow";
import { useUserData } from "@hooks/useUserData";
import CustomTooltip from "@component/assets/custom-tooltip/CustomToolTip";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { toast } from "react-toastify";
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
  const succeededList = goals.filter((x) => x.Succeeded);
  const toDoList = goals.filter((x) => !x.Succeeded).sort((a, b) => a.VisOrder - b.VisOrder);
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination || source.index === destination.index) return;

    const newItems = reorder(toDoList, source.index, destination.index);
    setGoals([...newItems, ...succeededList]);
    api.goal.reorderGoals({ dto: newItems });
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
                dto: { Name: newValue, UserId: selectedUser.Id, Succeeded: false, Id: -1, VisOrder: 0 },
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
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {toDoList.map((x, index) => (
                <Draggable key={x.Id.toString()} draggableId={x.Id.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style
                      }}>
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
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <hr></hr>
      {succeededList.map((x) => {
        return <EditableRow key={x.Id} initialValue={x.Name} succeeded={true} />;
      })}
    </Container>
  );
};

const reorder = (list: GoalType[], startIndex: number, endIndex: number): GoalType[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  // Update VisOrder based on new order
  return result.map((item, index) => ({
    ...item,
    VisOrder: index + 1 // Set VisOrder to the 1-based index position
  }));
};
