import { format } from "date-fns";
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import DateNavigator from "../home/assets/date-navigator/DateNavigator";
import { CalendarContextProvider } from "./context/CalendarProvider";
import { useCalendar } from "./context/useCalendar";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToDoTask } from "types/Types";
import { useUserData } from "@hooks/useUserData";
import { ZenSlider } from "../home/assets/zen-slider/ZenSlider";
import "./calendar.scss";
import underWork from "public/assets/UnderWork.gif";
export const Calendar = () => {
  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <img
        style={{ width: "75%", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
        src={underWork}
      />
    </div>
  );
  return (
    <CalendarContextProvider>
      <DayViewContainer />
    </CalendarContextProvider>
  );
};
const DayViewContainer = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const formattedCurrentDate = format(currentDate, "yyyy-MM-dd");

  return (
    <Container fluid className={`calendar`}>
      <DayContent key={formattedCurrentDate} date={currentDate} setCurrentDate={setCurrentDate} />
      {/* Display the slider value */}
    </Container>
  );
};
const DayContent = ({
  date,

  setCurrentDate
}: {
  date: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
}) => {
  const [addClick, setAddClick] = useState(false);
  const { data } = useCalendar();
  return (
    <div className={"day-content"}>
      <Row>
        <Col>
          <DateNavigator currentDate={date} setCurrentDate={setCurrentDate} />
        </Col>
      </Row>
      <Row>
        <Col>
          {addClick ? (
            <EditPostIt date={date} />
          ) : (
            <Button
              disabled={addClick}
              onClick={() => {
                setAddClick(true);
              }}
              className="input-add-button">
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          )}
        </Col>
      </Row>
    </div>
  );
};
const EditPostIt = ({ date, existingData }: { date: Date; existingData?: ToDoTask }) => {
  const { selectedUser } = useUserData();
  const [state, setState] = useState<ToDoTask>(
    existingData ?? {
      Id: -1,
      UserId: selectedUser.Id,
      Name: "",
      Description: "",
      Priority: 0,
      Succeeded: false,
      Color: "white",
      Date: format(date, "yyyy-MM-dd")
    }
  );
  return (
    <div className="postit-input-container">
      <input
        placeholder={"Name of the task...."}
        defaultValue={state.Name}
        onChange={(e) => {
          setState({ ...state, Name: e.target.value });
        }}
      />
      <br></br>
      <label>DATE:</label>
      <br></br>
      <textarea
        placeholder={"Description of the task...."}
        defaultValue={state.Description}
        onChange={(e) => {
          setState({ ...state, Description: e.target.value });
        }}
      />
      <br></br>
      <label>DATE:</label> <br></br>
      <input
        type="date"
        defaultValue={state.Date}
        onChange={(e) => {
          setState({ ...state, Date: e.target.value });
        }}
      />
      <ZenSlider
        max={5}
        uom=""
        tooltip="Priority will determine the order of display in the day, the higher the number the higher it will show up."
        multiple={1}
        placeholder="Priority"
        defaultValue={state.Priority}
        submit={(value) => {
          setState({ ...state, Priority: value });
        }}
      />
    </div>
  );
};
const PostItInput = () => {
  return;
};
const PostIt = ({ data }: { data: ToDoTask }) => {
  return <div></div>;
};
