import { Col, Container, Row, Tooltip } from "react-bootstrap";
import DateRangeButtons from "./assets/date-range-buttons/DateRangeButtons";
import "./Stats.scss";
import { useEffect, useState } from "react";
import { TrackingData } from "types/Types";
import { useComm } from "@hooks/useComm";
import { useDataContext } from "@context/DataContext";
import {
  Line,
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  Area,
  ComposedChart,
  AreaChart,
  Bar
} from "recharts";
import { format, parse } from "date-fns";
export const Stats = () => {
  const [datas, setDatas] = useState<TrackingData[]>([]);
  const { api } = useComm();
  const { selectedUser } = useDataContext();
  const [dateRange, setDateRange] = useState<{ startDate: string; endDate: string }>({
    startDate: "",
    endDate: ""
  });
  useEffect(() => {
    if (selectedUser && dateRange.startDate)
      api.tracker.getDatas({
        dto: { userId: selectedUser.Id, startDate: dateRange.startDate, endDate: dateRange.endDate },
        Success: setDatas
      });
  }, [dateRange]);
  return (
    <Container fluid className="stats">
      <Row>
        <Col>
          <DateRangeButtons setDateRange={setDateRange} />
        </Col>
      </Row>
      <Row>
        <Col>
          <SleepGraph data={datas} />
        </Col>
      </Row>
      <br></br> <br></br> <br></br>
      <hr></hr>
      <Row>
        <Col>
          <BalanceGraph data={datas} />
        </Col>
      </Row>
      <br></br> <br></br> <br></br>
      <hr></hr>
      <Row>
        <Col>
          <RadarGraph data={datas} />
        </Col>
      </Row>
      <hr></hr>
      <Row>
        <Col>
          <WaterGraph data={datas} />
        </Col>
      </Row>
      <Row>
        <Col>
          <SentenceGroup
            name={"Things that made me happy"}
            data={datas
              .filter((x) => x.HappySentence != null && x.HappySentence != "")
              .map((x) => ({ name: x.HappySentence, date: x.Date }))}
          />{" "}
        </Col>
      </Row>
      <hr></hr>
      <Row>
        <Col>
          <SentenceGroup
            name={"Realisation"}
            data={datas
              .filter((x) => x.RealisationSentence != null && x.RealisationSentence != "")
              .map((x) => ({ name: x.RealisationSentence ?? "", date: x.Date }))}
          />{" "}
        </Col>
      </Row>
    </Container>
  );
};

const SleepGraph = ({ data }: { data: TrackingData[] }) => {
  return (
    <div style={{ width: "100%", height: "30em" }}>
      <div className="stats-title">Sleep tracker</div>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
          <XAxis dataKey="name" />
          <YAxis domain={[0, 10]} />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#f5f5f5" />
          <Area type="monotone" dataKey="SleepTime" fill="#8884d8" stroke="#8884d8" />
          <Bar barSize={10} type="monotone" dataKey="SleepQuality" fill="#4CAF50" stroke="#4CAF50" />

          <Line type="monotone" dataKey="AnxietyLevel" fill="#5D6D7E" />
          <Line type="monotone" dataKey="StressLevel" stroke="#C0392B" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
const BalanceGraph = ({ data }: { data: TrackingData[] }) => {
  return (
    <div style={{ width: "100%", height: "20em" }}>
      <div className="stats-title">Healthy habit graph</div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorSv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#E9D8A6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#E9D8A6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorYv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#E1AFAF" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#E1AFAF" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorMv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#A6C8E9" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#A6C8E9" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="MeditationTime" stroke="#C3B1E1" fillOpacity={1} fill="url(#colorUv)" />
          <Area type="monotone" dataKey="ExerciseTime" stroke="#B5D8B5" fillOpacity={1} fill="url(#colorPv)" />
          <Area type="monotone" dataKey="OutsideWalkTime" stroke="#E9D8A6" fillOpacity={1} fill="url(#colorSv)" />
          <Area type="monotone" dataKey="YogaTime" stroke="#E1AFAF" fillOpacity={1} fill="url(#colorYv)" />
          <Area type="monotone" dataKey="MusicTime" stroke="#A6C8E9" fillOpacity={1} fill="url(#colorMv)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
const SentenceGroup = ({ data, name }: { data: { name: string; date: string }[]; name: string }) => {
  return (
    <>
      <div className="stats-title">{name}</div>
      <Container fluid className="sentence-group">
        {data.map((x) => (
          <Row className="sentence-group-row" key={x.name}>
            <Col xs={10}>{x.name}</Col>
            <Col xs={2}>
              <div className="sentence-group-date">{format(parse(x.date, "yyyy-MM-dd", new Date()), "d MMMM")}</div>
            </Col>
          </Row>
        ))}
      </Container>
    </>
  );
};
const WaterGraph = ({ data }: { data: TrackingData[] }) => {
  return (
    <div style={{ width: "100%", height: "30em" }}>
      <div className="stats-title">Water tracker</div>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#f5f5f5" />
          <Area type="monotone" dataKey="WaterIntake" fill="#4FC3F7 " stroke="#4FC3F7 " />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
const RadarGraph = ({ data }: { data: TrackingData[] }) => {
  const averages = calculateAverages(data);

  const radarData = [
    { subject: "Sleep Time", A: averages.SleepTime },
    { subject: "Sleep Quality", A: averages.SleepQuality },
    { subject: "Meditation Time", A: averages.MeditationTime },
    { subject: "Exercise Time", A: averages.ExerciseTime },
    { subject: "Hapiness Level", A: averages.HapinessLevel },
    { subject: "Stress Level", A: averages.StressLevel },
    { subject: "Anxiety Level", A: averages.AnxietyLevel }
  ];

  return (
    <div style={{ width: "100%", height: "20em" }}>
      <div className="stats-title">Health radar</div>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />

          <Radar name="Averages" dataKey="A" stroke="#8884d8" fill="#4f6457" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
const calculateAverages = (data: TrackingData[]) => {
  const totals = data.reduce(
    (acc, entry) => {
      acc.SleepTime += entry.SleepTime;
      acc.SleepQuality += entry.SleepQuality;
      acc.MeditationTime += entry.MeditationTime;
      acc.ExerciseTime += entry.ExerciseTime;
      acc.HapinessLevel += entry.HapinessLevel;
      acc.StressLevel += entry.StressLevel;
      acc.AnxietyLevel += entry.AnxietyLevel;
      return acc;
    },
    {
      SleepTime: 0,
      SleepQuality: 0,
      MeditationTime: 0,
      ExerciseTime: 0,
      HapinessLevel: 0,
      StressLevel: 0,
      AnxietyLevel: 0
    }
  );

  const numEntries = data.length;

  // Calculate the average and return the percentage of the max value
  return {
    SleepTime: (totals.SleepTime / numEntries / maxValues.SleepTime) * 100,
    SleepQuality: (totals.SleepQuality / numEntries / maxValues.SleepQuality) * 100,
    MeditationTime: (totals.MeditationTime / numEntries / maxValues.MeditationTime) * 100,
    ExerciseTime: (totals.ExerciseTime / numEntries / maxValues.ExerciseTime) * 100,
    HapinessLevel: (totals.HapinessLevel / numEntries / maxValues.HapinessLevel) * 100,
    StressLevel: (totals.StressLevel / numEntries / maxValues.StressLevel) * 100,
    AnxietyLevel: (totals.AnxietyLevel / numEntries / maxValues.AnxietyLevel) * 100
  };
};
const maxValues = {
  SleepTime: 9, // Max sleep time could be 8 hours
  SleepQuality: 10, // Sleep quality on a scale of 1 to 10
  MeditationTime: 90, // Max meditation time in minutes
  ExerciseTime: 120, // Max exercise time in minutes
  HapinessLevel: 10, // Hapiness level on a scale of 1 to 10
  StressLevel: 10, // Stress level on a scale of 1 to 10
  AnxietyLevel: 10 // Anxiety level on a scale of 1 to 10
};
