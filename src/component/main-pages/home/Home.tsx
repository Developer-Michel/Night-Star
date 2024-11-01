import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import RandomQuote from "./assets/quote/Quote";
import { ZenSlider } from "./assets/zen-slider/ZenSlider";
import "./Home.scss";
import ZenInput from "../../assets/zen-input/ZenInput";
import DateNavigator from "./assets/date-navigator/DateNavigator";
import { subDays, addDays, format } from "date-fns";
import { TrackingData } from "types/Types";
import { LoadingSpinner } from "@component/assets/loading-indicator/LoadingSpinner";
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
  const { selectedUser, dataUpdatedToday, setDataUpdatedToday } = useDataContext();
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
    if (!dataUpdatedToday.updated && format(date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")) {
      if (data && data?.SleepQuality > 0) setDataUpdatedToday({ incr: dataUpdatedToday.incr + 1, updated: true });
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

  if (data == null)
    return (
      <div style={{ height: "100%", width: "33%", position: "relative" }}>
        <LoadingSpinner />
      </div>
    );
  return (
    <div className={"home-content " + className}>
      <Row>
        <Col>
          <DateNavigator currentDate={date} setCurrentDate={setCurrentDate} />
        </Col>
      </Row>

      <ZenSlider
        max={720}
        uom="H"
        tooltip="Most adults aged 20-30 need 7–9 hours of sleep each night for optimal health, mood, and cognitive performance. Quality, uninterrupted sleep is key to reaping full benefits."
        multiple={10}
        defaultValue={Math.round(data.SleepTime * 60)}
        placeholder="💤Hours of sleep"
        submit={(value) => {
          updateData({ ...data, SleepTime: value / 60 });
        }}
      />
      <ZenSlider
        max={10}
        uom="/10"
        tooltip="To improve sleep quality, keep a consistent sleep schedule, avoid caffeine late in the day, and create a calming bedtime routine. These practices help regulate your body's internal clock, reduce sleep disturbances, and prepare your mind for restful sleep."
        defaultValue={data.SleepQuality}
        placeholder="⏰Sleep quality"
        submit={(value) => {
          updateData({ ...data, SleepQuality: value });
        }}
      />
      <ZenSlider
        max={120}
        uom="min"
        tooltip="Meditation benefits include reduced stress, improved focus, and enhanced emotional resilience. Start with 5-10 minutes daily, gradually increasing to 20-30 minutes. Practices like mindfulness, body scanning, or loving-kindness meditation can improve concentration and promote a sense of calm."
        multiple={1}
        placeholder="🧘‍♀️Meditation time"
        defaultValue={data.MeditationTime}
        submit={(value) => {
          updateData({ ...data, MeditationTime: value });
        }}
      />
      <ZenSlider
        max={120}
        uom="min"
        multiple={1}
        tooltip="Yoga enhances flexibility, strengthens muscles, and reduces stress. Practicing for 15-30 minutes daily can improve posture, boost energy, and promote a sense of calm. Try different styles like Hatha for balance, Vinyasa for flow, or Yin for deep stretching."
        placeholder="🪷Yoga time"
        defaultValue={data.YogaTime}
        submit={(value) => {
          updateData({ ...data, YogaTime: value });
        }}
      />
      <ZenSlider
        max={180}
        uom="min"
        tooltip="Exercise boosts energy, strengthens muscles, and improves mood. Aim for 30 minutes of moderate activity most days to support heart health, mental clarity, and overall well-being. Try cardio for endurance, strength training for muscle health, or flexibility exercises to reduce tension."
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
        tooltip="Outdoor walks boost mood, improve cardiovascular health, and reduce stress. Aim for 20-30 minutes a day. Walking in natural settings also supports mental clarity and can increase creativity. A brisk pace maximizes benefits, while a slower walk can promote relaxation."
        multiple={5}
        placeholder="🚶‍♀️Outside walk time"
        defaultValue={data.OutsideWalkTime}
        submit={(value) => {
          updateData({ ...data, OutsideWalkTime: value });
        }}
      />
      <ZenSlider
        max={4000}
        uom="ml"
        tooltip="Adequate water intake supports energy, digestion, and skin health. Aim for 8 glasses (about 2 liters) daily, adjusting for activity level, climate, and individual needs. Drink water consistently throughout the day, and prioritize hydration before, during, and after exercise for optimal benefits."
        multiple={100}
        placeholder="💧Water intake"
        defaultValue={data.WaterIntake}
        submit={(value) => {
          updateData({ ...data, WaterIntake: value });
        }}
      />
      <ZenSlider
        max={360}
        uom="min"
        multiple={5}
        tooltip="Playing a musical instrument enhances cognitive function, improves coordination, and reduces stress. Practicing for 15-30 minutes daily can boost memory, increase focus, and promote creativity. Try setting small goals, exploring different genres, or joining group sessions to stay motivated and enjoy the process."
        placeholder="🎵Music time played"
        defaultValue={data.MusicTime}
        submit={(value) => {
          updateData({ ...data, MusicTime: value });
        }}
      />
      <ZenSlider
        max={10}
        uom="/10"
        tooltip="Boost happiness by practicing gratitude, building social connections, exercising regularly, and engaging in mindfulness. Pursue personal goals, give back to others, limit social media, and practice self-compassion to foster resilience and positivity."
        placeholder="☺️Happiness level"
        defaultValue={data.HapinessLevel}
        submit={(value) => {
          updateData({ ...data, HapinessLevel: value });
        }}
      />
      <ZenSlider
        max={10}
        uom="/10"
        tooltip="Reduce stress by practicing deep breathing, engaging in regular exercise, and getting enough sleep. Try mindfulness techniques like meditation, take breaks for relaxation, and connect with friends or loved ones for support."
        placeholder="🎚️Stress level"
        defaultValue={data.StressLevel}
        submit={(value) => {
          updateData({ ...data, StressLevel: value });
        }}
      />
      <ZenSlider
        max={10}
        uom="/10"
        tooltip="To reduce anxiety, try deep breathing exercises, practice mindfulness, and engage in regular physical activity. Set aside time for relaxation, limit caffeine, and focus on positive self-talk to help manage anxious thoughts."
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
