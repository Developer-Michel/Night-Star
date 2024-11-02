import { faInfoCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useComm } from "@hooks/useComm";
import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { FeedbackType } from "types/Types";
import "./Feedback.scss";
import { format } from "date-fns";
import { EditableRow } from "@component/assets/editable-row/EditableRow";
import { useUserData } from "@hooks/useUserData";
import CustomTooltip from "@component/assets/custom-tooltip/CustomToolTip";

export const Feedback = () => {
  const [addClick, setAddClick] = useState(false);
  const { selectedUser } = useUserData();
  const [datas, setDatas] = useState<FeedbackType[]>([]);
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
      api.feedback.getAllFeedbacks({
        Success: (data) => {
          setDatas(data.sort((a, b) => Number(a.Succeeded) - Number(b.Succeeded)));
          setAddClick(false);
        }
      });
  };
  return (
    <Container className={`feedback transition-enter ${visible && "visible"}`}>
      <Row>
        <Col>
          <h2>
            FEEDBACKS
            <div style={{ float: "right", opacity: 0.5 }}>
              <CustomTooltip
                tooltipText={
                  "You can enter suggestions or report any bugs found here, and the lead developer of this app will reviewyour requests as quickly as possible!"
                }>
                <FontAwesomeIcon icon={faInfoCircle} />
              </CustomTooltip>
            </div>
          </h2>
        </Col>
      </Row>
      {addClick ? (
        <EditableRow
          onSave={(newValue) => {
            const dto: FeedbackType = {
              Name: newValue,
              Succeeded: false,
              Id: 0,
              Date: format(new Date(), "yyyy-MM-dd")
            };
            api.feedback.addFeedback({
              dto: dto,
              Success: () => {
                refresh();
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
      {datas.map((x) => {
        return (
          <EditableRow
            key={x.Id}
            initialValue={x.Name}
            onSave={(newValue: string) => {
              api.feedback.updateFeedback({
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
                api.feedback.deleteFeedback({
                  dto: x,
                  Success: () => {
                    toast.error("Feedback deleted");
                    refresh();
                  }
                });
            }}
            onSuccess={
              selectedUser?.UserName == "MICHEL"
                ? () => {
                    if (confirm("Please confirm that you completed this goal? " + x.Name))
                      api.feedback.updateFeedback({
                        dto: { ...x, Succeeded: true },
                        Success: () => {
                          toast.success("Well done, I'm proud of you!!:)");
                          refresh();
                        }
                      });
                  }
                : undefined
            }
          />
        );
      })}
    </Container>
  );
};
