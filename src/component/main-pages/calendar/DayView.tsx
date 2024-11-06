import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

import { subDays, addDays, format, isToday } from "date-fns";
import { TaskDto } from "types/Types";
import { LoadingSpinner } from "@component/assets/loading-indicator/LoadingSpinner";

import { useCalendar } from "./context/useCalendar";
import DateNavigator from "../home/assets/date-navigator/DateNavigator";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EditPostIt } from "./assets/EditPostIt";
import { taskStatusType } from "./types";
import { getCurrentEasternTimeDate } from "@component/service/format";
export const DailyView = () => {
  const [shadow, setShadow] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Use ref to store the timeout ID
  const { selectedDay } = useCalendar();
  const [currentDate, setCurrentDate] = useState<Date>(selectedDay);

  // Format the date as a string in 'yyyy-MM-dd' to ensure consistency
  const [outDirection, setOutDirection] = useState<string>("left");
  const [inDirection, setInDirection] = useState("right");
  const [visible, setVisible] = useState(false);
  const formattedCurrentDate = format(currentDate, "yyyy-MM-dd");
  const [outToggle, setOuttoggle] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 2000);
  }, []);
  const onNextDayPressed = () => {
    setOutDirection("left");
    setInDirection("right");
    setVisible(false);
    setOuttoggle(true);

    setTimeout(() => {
      setOuttoggle(false);
      setCurrentDate(addDays(currentDate, 1));
    }, 1000);
  };
  const onPreviousDayPressed = () => {
    setOutDirection("right");
    setInDirection("left");
    setVisible(false);
    setOuttoggle(true);

    setTimeout(() => {
      setOuttoggle(false);
      setCurrentDate(subDays(currentDate, 1));
    }, 1000);
  };
  console.log(visible);
  const triggerChange = () => {
    console.log("A");
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShadow(true); // Show the shadowbox
    setTimeout(() => {
      setShadow(false); // Hide the shadowbox after 2 seconds
    }, 1000);
  };
  const finishLoading = () => {
    setVisible(true);
  };
  return (
    <>
      <div className={`day-view ${visible && "visible"}`}>
        {!visible && (
          <div key={"loadingIcon"} style={{ position: "absolute", opacity: "20%", height: "100vh", width: "100vw" }}>
            <LoadingSpinner />
          </div>
        )}
        <div className={`home-shadow ${shadow && "visible"} `}></div>

        <DayContent
          triggerChange={triggerChange}
          key={formattedCurrentDate}
          date={currentDate}
          className={outToggle ? outDirection + "-out" : inDirection + "-in"}
          finishLoading={finishLoading}
          onNextDayPressed={onNextDayPressed}
          onPreviousDayPressed={onPreviousDayPressed}
        />
      </div>
    </>
  );
};
const DayContent = ({
  date,
  className,
  onNextDayPressed,
  finishLoading,
  onPreviousDayPressed,
  triggerChange
}: {
  date: Date;
  className: string;
  triggerChange: () => void;
  finishLoading: () => void;
  onNextDayPressed: () => void;
  onPreviousDayPressed: () => void;
}) => {
  const { data, setSelectedDay, setView, view, addToDoTask, deleteToDoTask, completeToDoTask, updateToDoTask } =
    useCalendar();
  const [addClick, setAddClick] = useState(false);
  const refData = data.filter((x) => x.Date === format(date, "yyyy-MM-dd"));
  const isInThePastRef = useRef(isPastDate(date, getCurrentEasternTimeDate()));
  const isTodayRef = useRef(isToday(date));
  useEffect(() => {
    setTimeout(() => {
      finishLoading();
    }, 200);
  }, []);

  if (refData == null) return <></>;
  return (
    <Container fluid className={"day-content " + className}>
      <Row>
        <Col>
          <DateNavigator
            currentDate={date}
            onNextDayPressed={onNextDayPressed}
            onPreviousDayPressed={onPreviousDayPressed}
            setView={setView}
            view={view}
            allowFutur={true}
            setSelectedDay={setSelectedDay}
          />
        </Col>
      </Row>
      {refData
        .filter((x) => x.Status !== taskStatusType.completed)
        .map((x) => (
          <EditPostIt
            key={x.Id + x.Date.toString()}
            date={date}
            existingData={x}
            onCancelClick={deleteToDoTask}
            onSaveClick={updateToDoTask}
            onSuccessClick={isTodayRef ? completeToDoTask : undefined}
          />
        ))}
      {!isInThePastRef.current ? (
        addClick ? (
          <EditPostIt
            date={date}
            key={"new-postit"}
            onCancelClick={() => setAddClick(false)}
            onSaveClick={(data: TaskDto) => {
              addToDoTask(data);
              setAddClick(false);
              triggerChange();
            }}
          />
        ) : (
          <Row className="postit-input-add-button-container" key={"new-postit"}>
            <Col>
              <Button
                disabled={addClick}
                onClick={() => {
                  setAddClick(true);
                }}
                className="postit-input-add-button">
                ADD
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </Col>
          </Row>
        )
      ) : (
        <></>
      )}
      <hr></hr>
      {refData
        .filter((x) => x.Status === taskStatusType.completed)
        .map((x) => (
          <EditPostIt
            key={x.Id + x.Date.toString()}
            date={date}
            existingData={x}
            onCancelClick={deleteToDoTask}
            onSaveClick={updateToDoTask}
            onSuccessClick={completeToDoTask}
          />
        ))}
    </Container>
  );
};

function isPastDate(d1: Date, d2: Date) {
  return (
    d1.getFullYear() < d2.getFullYear() ||
    (d1.getFullYear() === d2.getFullYear() && d1.getMonth() < d2.getMonth()) ||
    (d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() < d2.getDate())
  );
}
