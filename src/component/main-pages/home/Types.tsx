export interface HomeContextData {
  setView: React.Dispatch<React.SetStateAction<homeViewType>>;
  view: homeViewType;
  selectedDay: Date;
  setSelectedDay: React.Dispatch<React.SetStateAction<Date>>;
}
export enum homeViewType {
  month = "MONTH",
  year = "YEAR",
  day = "DAY"
}
