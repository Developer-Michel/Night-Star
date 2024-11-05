import { ZenSlider } from "@component/main-pages/home/assets/zen-slider/ZenSlider";
import { useUserData } from "@hooks/useUserData";
import { useEffect, useRef, useState } from "react";
import { TaskDto } from "types/Types";
import { taskStatusType, taskOccurenceType } from "../types";
import { format } from "date-fns";
import "./EditPostIt.scss";
import { CirclePicker, ColorResult } from "react-color";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faClock,
  faExclamationCircle,
  faPen,
  faRefresh,
  faSave,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
export const EditPostIt = ({
  date,
  existingData,
  onCancelClick,
  onSaveClick,
  onSuccessClick
}: {
  date: Date;
  existingData?: TaskDto;
  onCancelClick: (data: TaskDto) => void;
  onSaveClick: (data: TaskDto) => void;
  onSuccessClick?: (data: TaskDto) => void;
}) => {
  const { selectedUser } = useUserData();
  const [inEdit, setInEdit] = useState(existingData == null);
  const [state, setState] = useState<TaskDto>(
    existingData ?? {
      Id: -1,
      UserId: selectedUser.Id,
      Name: "",
      Description: "",
      Priority: 0,
      Status: taskStatusType.pending,
      Color: "#ffffff",
      Date: format(date, "yyyy-MM-dd"),
      OccurenceWeekDaysJson: [],
      OccurenceXday: 1,
      OccurenceType: taskOccurenceType.onetime,
      OriginalDate: format(date, "yyyy-MM-dd")
    }
  );

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    adjustTextareaHeight(); // Adjust height when component mounts or inputValue changes
  }, [state.Description]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height to auto to shrink if needed
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on content
    }
  };
  return (
    <div
      className={`postit-input-container ${inEdit && "in-edit"} ${
        state.Status === taskStatusType.completed && "success"
      }`}
      style={{ backgroundColor: state.Status === taskStatusType.completed ? "lightgray" : state.Color }}>
      <div className="postit-input-container-header">
        <input
          disabled={!inEdit}
          placeholder={"Name of the task...."}
          defaultValue={state.Name}
          onChange={(e) => {
            setState({ ...state, Name: e.target.value });
          }}
        />
      </div>
      {state.Status === taskStatusType.completed ? (
        <div className="postit-input-container-indicator">
          {" "}
          <FontAwesomeIcon size="xs" icon={faCheckCircle} />{" "}
        </div>
      ) : (
        <div className="postit-input-container-indicator">
          {state.Priority > 0 && (
            <FontAwesomeIcon size="xs" icon={faExclamationCircle} color={priorityColors[state.Priority]} />
          )}
          {state.OccurenceType !== taskOccurenceType.onetime && <FontAwesomeIcon size="xs" icon={faRefresh} />}
          {state.Status === taskStatusType.overdue && <FontAwesomeIcon size="xs" icon={faClock} color="red" />}
        </div>
      )}

      <div className="postit-input-container-description">
        {!inEdit ? (
          <div>{state.Description}</div>
        ) : (
          <textarea
            disabled={!inEdit}
            ref={textareaRef}
            placeholder={"Description of the task...."}
            defaultValue={state.Description}
            onChange={(e) => {
              setState({ ...state, Description: e.target.value });
            }}
          />
        )}
      </div>
      {!inEdit && state.Status !== taskStatusType.completed && (
        <div className="postit-input-container-buttons">
          <Button onClick={() => setInEdit(true)}>
            <FontAwesomeIcon icon={faPen} />
          </Button>
          {onSuccessClick && (
            <Button
              onClick={() => {
                onSuccessClick(state);
                setState({ ...state, Status: taskStatusType.completed });
              }}
              variant="success">
              {" "}
              <FontAwesomeIcon icon={faCheckCircle} />
            </Button>
          )}
        </div>
      )}
      {inEdit && (
        <>
          <OccurrenceTypeSelector state={state} setState={setState} />
          <br></br>
          <PostItColorPicker
            selectedColor={state.Color}
            onColorChange={(color: string) => setState({ ...state, Color: color })}
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
          <div className="postit-input-container-buttons">
            <Button onClick={() => onCancelClick(state)} variant="danger">
              <FontAwesomeIcon icon={faTrash} />
            </Button>
            <Button
              onClick={() => {
                onSaveClick(state);
                setInEdit(false);
              }}
              variant="success">
              <FontAwesomeIcon icon={faSave} />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
const priorityColors = [
  "#FF4C4C", // Priority 1 - Red (Urgent)
  "#FF944C", // Priority 2 - Orange (High)
  "#FFD24C", // Priority 3 - Yellow (Medium)
  "#A4D94C", // Priority 4 - Lime (Low)
  "#4CD9A4" // Priority 5 - Green (Lowest)
];
const postitColors = [
  "#FFEB3B", // Yellow
  "#FFCDD2", // Light Pink
  "#C8E6C9", // Light Green
  "#BBDEFB", // Light Blue
  "#E1BEE7" // Light Purple
];
const PostItColorPicker = ({
  selectedColor,
  onColorChange
}: {
  selectedColor: string;
  onColorChange: (color: string) => void;
}) => {
  const handleColorChange = (color: ColorResult) => {
    onColorChange(color.hex);
  };

  return (
    <div>
      <h4>COLOR</h4>
      <CirclePicker colors={postitColors} color={selectedColor} onChangeComplete={handleColorChange} />
    </div>
  );
};

const OccurrenceTypeSelector = ({
  state,
  setState
}: {
  state: TaskDto;
  setState: React.Dispatch<React.SetStateAction<TaskDto>>;
}) => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const handleDaySelection = (day: string) => {
    const newValue = state.OccurenceWeekDaysJson.includes(day)
      ? state.OccurenceWeekDaysJson.filter((d) => d !== day)
      : [...state.OccurenceWeekDaysJson, day];
    setState({ ...state, OccurenceWeekDaysJson: newValue });
  };

  return (
    <div className="postit-input-container-occurence-selector">
      <h4>OCCURENCE</h4>

      <label>
        <input
          type="radio"
          name="occurrenceType"
          value={taskOccurenceType.onetime}
          checked={state.OccurenceType === taskOccurenceType.onetime}
          onChange={() => setState({ ...state, OccurenceType: taskOccurenceType.onetime })}
        />
        One-time
      </label>

      <label>
        <input
          type="radio"
          name="occurrenceType"
          value={taskOccurenceType.daily}
          checked={state.OccurenceType === taskOccurenceType.daily}
          onChange={() => setState({ ...state, OccurenceType: taskOccurenceType.daily })}
        />
        Daily
      </label>

      <label>
        <input
          type="radio"
          name="occurrenceType"
          value={taskOccurenceType.everyXDay}
          checked={state.OccurenceType === taskOccurenceType.everyXDay}
          onChange={() => setState({ ...state, OccurenceType: taskOccurenceType.everyXDay })}
        />
        Every X Days
      </label>

      <label>
        <input
          type="radio"
          name="occurrenceType"
          value={taskOccurenceType.daysOfWeek}
          checked={state.OccurenceType === taskOccurenceType.daysOfWeek}
          onChange={() => setState({ ...state, OccurenceType: taskOccurenceType.daysOfWeek })}
        />
        Days of the Week
      </label>

      {/* Conditional rendering for additional fields */}
      {state.OccurenceType === taskOccurenceType.everyXDay && (
        <div>
          <label>
            Every
            <input
              type="number"
              min="1"
              value={state.OccurenceXday}
              onChange={(e) => setState({ ...state, OccurenceXday: parseInt(e.target.value) })}
            />
            day(s)
          </label>
        </div>
      )}

      {state.OccurenceType === taskOccurenceType.daysOfWeek && (
        <div>
          <label>Select Days of the Week:</label>
          <br />
          {daysOfWeek.map((day) => (
            <label key={day}>
              <input
                type="checkbox"
                checked={state.OccurenceWeekDaysJson.includes(day)}
                onChange={() => handleDaySelection(day)}
              />
              {day}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
