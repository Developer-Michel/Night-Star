import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import RandomQuote from "./assets/quote/Quote";
import { ZenSlider } from "./assets/zen-slider/ZenSlider";
import "./Home.scss";
import ZenInput from "./assets/zen-input/ZenInput";
import DateNavigator from "./assets/date-navigator/DateNavigator";
import { subDays, addDays, format } from "date-fns";
import { TrackingData } from "types/Types";
import { LoadingSpinner } from "@component/loading-indicator/LoadingSpinner";
import { useComm } from "@hooks/useComm";
import { useDataContext } from "@context/DataContext";
import { toast } from "react-toastify";

export const Home = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [shadow, setShadow] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Use ref to store the timeout ID
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
  const renderContent = () => {
    const previousDate = subDays(currentDate, 1);
    const nextDate = addDays(currentDate, 1);

    // Format the date as a string in 'yyyy-MM-dd' to ensure consistency
    const formattedCurrentDate = format(currentDate, "yyyy-MM-dd");
    const formattedPreviousDate = format(previousDate, "yyyy-MM-dd");
    const formattedNextDate = format(nextDate, "yyyy-MM-dd");

    return (
      <>
        <HomeContent
          key={formattedPreviousDate}
          className="previous"
          triggerChange={triggerChange}
          date={previousDate}
          setCurrentDate={setCurrentDate}
        />
        <HomeContent
          triggerChange={triggerChange}
          key={formattedCurrentDate}
          className="current"
          date={currentDate}
          setCurrentDate={setCurrentDate}
        />
        <HomeContent
          key={formattedNextDate}
          triggerChange={triggerChange}
          className="next"
          date={nextDate}
          setCurrentDate={setCurrentDate}
        />
      </>
    );
  };
  return (
    <Container fluid className={`home`}>
      <div className={`home-shadow ${shadow && "visible"}`}></div>
      <div className="home-content-base">
        <div className="home-content-container">{renderContent()}</div>
      </div>

      {/* Display the slider value */}
    </Container>
  );
};
const HomeContent = ({
  date,
  className,
  setCurrentDate,
  triggerChange
}: {
  date: Date;
  triggerChange: () => void;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  className: string;
}) => {
  const [data, setData] = useState<TrackingData | undefined>();
  const isDayAlreadyCompleted = useRef(false);
  const { api } = useComm();
  const { selectedUser } = useDataContext();
  useEffect(() => {
    if (selectedUser)
      api.tracker.get({
        dto: { userId: selectedUser.Id, date: date },
        Success: (_data: TrackingData) => {
          setData(_data);
        }
      });
  }, []);
  useEffect(() => {
    if (data) {
      if (isDayAlreadyCompleted.current || className != "current") return;
      isDayAlreadyCompleted.current = isObjectValid(data);
      if (isDayAlreadyCompleted.current) toast.success("Day is done, Well done " + selectedUser?.Name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  const updateData = (_data: TrackingData) => {
    api.tracker.put({
      dto: _data,
      Success: () => {
        setData(_data);
        triggerChange();
      },
      Error: (msg) => {
        toast.error(msg);
      }
    });
  };
  if (data == null) return <LoadingSpinner />;
  return (
    <div className={"home-content " + className}>
      <Row>
        <Col>
          <DateNavigator currentDate={date} setCurrentDate={setCurrentDate} />
        </Col>
      </Row>

      <ZenSlider
        max={14}
        uom="H"
        multiple={0.5}
        defaultValue={data.SleepTime}
        placeholder="💤Hours of sleep"
        submit={(value) => {
          updateData({ ...data, SleepTime: value });
        }}
      />
      <ZenSlider
        max={10}
        uom="/10"
        defaultValue={data.SleepQuality}
        placeholder="⏰Sleep quality"
        submit={(value) => {
          updateData({ ...data, SleepQuality: value });
        }}
      />
      <ZenSlider
        max={480}
        uom="min"
        multiple={5}
        placeholder="🧘‍♀️Meditation time"
        defaultValue={data.MeditationTime}
        submit={(value) => {
          updateData({ ...data, MeditationTime: value });
        }}
      />
      <ZenSlider
        max={480}
        uom="min"
        multiple={5}
        placeholder="🪷Yoga time"
        defaultValue={data.YogaTime}
        submit={(value) => {
          updateData({ ...data, YogaTime: value });
        }}
      />
      <ZenSlider
        max={180}
        uom="min"
        multiple={5}
        placeholder="🏋️Exercise time"
        defaultValue={data.ExerciseTime}
        submit={(value) => {
          updateData({ ...data, ExerciseTime: value });
        }}
      />
      <ZenSlider
        max={180}
        uom="min"
        multiple={5}
        placeholder="🚶‍♀️Outside walk time"
        defaultValue={data.OutsideWalkTime}
        submit={(value) => {
          updateData({ ...data, OutsideWalkTime: value });
        }}
      />
      <ZenSlider
        max={10}
        uom="/10"
        placeholder="☺️Happiness level"
        defaultValue={data.HapinessLevel}
        submit={(value) => {
          updateData({ ...data, HapinessLevel: value });
        }}
      />
      <ZenSlider
        max={10}
        uom="/10"
        placeholder="🎚️Stress level"
        defaultValue={data.StressLevel}
        submit={(value) => {
          updateData({ ...data, StressLevel: value });
        }}
      />
      <ZenSlider
        max={10}
        uom="/10"
        placeholder="💭Anxiety level"
        defaultValue={data.AnxietyLevel}
        submit={(value) => {
          updateData({ ...data, AnxietyLevel: value });
        }}
      />
      <ZenInput
        placeholder={"Something that made you happy today...😊"}
        defaultValue={data.HappySentence}
        onSubmit={(value) => {
          updateData({ ...data, HappySentence: value });
        }}
      />
      <ZenInput
        placeholder={"Something that you realized today...🧠"}
        defaultValue={data.RealisationSentence ?? ""}
        onSubmit={(value) => {
          updateData({ ...data, RealisationSentence: value });
        }}
      />
      <Row>
        <Col>
          <RandomQuote />
        </Col>
      </Row>
    </div>
  );
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isObjectValid(obj: Record<string, any>): boolean {
  return Object.values(obj).every((value) => value !== null && value !== undefined && value !== "" && value !== 0);
}
