import { useEffect, useState } from "react";
import { addDays, format, isToday, subDays } from "date-fns";
import { faCaretLeft, faCaretRight, faFeatherPointed } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useComm } from "@hooks/useComm";
import { useUserData } from "@hooks/useUserData";
import { TrackingData } from "types/Types";
import "./Diary.scss";
import { LoadingSpinner } from "@component/assets/loading-indicator/LoadingSpinner";
import bookCover from "public/assets/BookCover.png";
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
        setTimeout(() => {
          setVisible(true);
        }, 1000);
      }
    });
  }, [currentDate]);

  const onNextDayPressed = () => {
    setVisible(false);
    setTimeout(() => {
      setValue("");
      setData(undefined);
      setCurrentDate(addDays(currentDate, 1));
    }, 3000);
  };
  const onPreviousDayPressed = () => {
    setVisible(false);
    setTimeout(() => {
      setValue("");
      setData(undefined);
      setCurrentDate(subDays(currentDate, 1));
    }, 3000);
  };
  const submit = () => {
    if (data) api.tracker.put({ dto: { ...data, DiaryText: value } });
  };

  return (
    <div className={`diary ${visible && "visible"}`}>
      {!data && <LoadingSpinner />}
      <div className="page-cover" style={{ backgroundImage: `url(${bookCover})` }}>
        <div className="page-cover-title">
          {selectedUser.UserName} DIARY
          <FontAwesomeIcon icon={faFeatherPointed} />
        </div>
      </div>
      <textarea
        className="book-textarea "
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
