import { EditableRow } from "@component/assets/editable-row/EditableRow";
import { useDataContext } from "@context/DataContext";
import { useComm } from "@hooks/useComm";
import { format } from "path";
import { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { FeedbackType, NotificationUser } from "types/Types";
import "./notification.scss";
export const Notification = () => {
  const [addClick, setAddClick] = useState(false);
  const { selectedUser, notifications, setNotifications } = useDataContext();
  const { api } = useComm();
  const [visible, setVisible] = useState(false);
  const notificationStateSaved = useRef(notifications);

  useEffect(() => {
    const list: NotificationUser[] = [];
    if (selectedUser)
      notifications.map((x) => {
        if (!x.Seen) {
          list.push({ UserId: selectedUser.Id, NotificationId: x.Notification.Id });
        }
        return { ...x, Seen: true };
      });
    if (list.length > 0) api.notification.AddNoticeNotifications({ dto: list });
    setNotifications(
      notifications.map((x) => {
        return { ...x, Seen: true };
      })
    );
    setTimeout(() => {
      setVisible(true);
    }, 300);
  }, []);
  return (
    <Container className={`notification transition-enter ${visible && "visible"}`}>
      <Row>
        <Col></Col>
      </Row>
      {/* <Row>
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
        </Row> */}
      {notificationStateSaved.current.map((x) => {
        return (
          <div className="notification-row" key={x.Notification.Id}>
            <h2>{x.Notification.Type}</h2>
            <p dangerouslySetInnerHTML={{ __html: x.Notification.Description.split("@").join("<br />") }}>{}</p>
            {!x.Seen && <div className="notification-row-new-indicator">NEW!</div>}
          </div>
        );
      })}
    </Container>
  );
};
