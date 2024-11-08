import { useEffect, useState } from "react";
import { addDays, format, isToday, subDays } from "date-fns";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useComm } from "@hooks/useComm";
import { useUserData } from "@hooks/useUserData";
import { TrackingData } from "types/Types";
import "./Diary.scss";
import { LoadingSpinner } from "@component/assets/loading-indicator/LoadingSpinner";
export const Diary = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [data, setData] = useState<TrackingData>();
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(false);
  const { selectedUser } = useUserData();
  const { api } = useComm();
  useEffect(() => {
    api.tracker.get({
      dto: { userId: selectedUser.Id, date: currentDate },
      Success: (val) => {
        setData(val);
        setValue(val.DiaryText);
        setVisible(true);
      }
    });
  }, [currentDate]);

  const onNextDayPressed = () => {
    setValue("");
    setData(undefined);
    setCurrentDate(addDays(currentDate, 1));
  };
  const onPreviousDayPressed = () => {
    setValue("");
    setData(undefined);
    setCurrentDate(subDays(currentDate, 1));
  };
  const submit = () => {
    if (data) api.tracker.put({ dto: { ...data, DiaryText: value } });
  };

  return (
    <div className={`diary ${visible && "visible"}`}>
      {!data && <LoadingSpinner />}
      <textarea
        placeholder={"What's on your mind today " + selectedUser.UserName + "..."}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={submit}></textarea>
      <div className={`date-navigator`}>
        <button onClick={onPreviousDayPressed}>
          <FontAwesomeIcon icon={faCaretLeft} />
        </button>
        <span className="date-navigator-indicator">{format(currentDate, "yyyy-MM-dd")}</span>
        <button onClick={onNextDayPressed} disabled={isToday(currentDate)}>
          <FontAwesomeIcon icon={faCaretRight} />
        </button>
      </div>
    </div>
  );
};
