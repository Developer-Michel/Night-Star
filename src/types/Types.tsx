export interface TrackingData {
  UserId: number;
  Date: string; //format YYYY-MM-DD
  SleepTime: number;
  SleepQuality: number;
  MeditationTime: number;
  ExerciseTime: number;
  OutsideWalkTime: number;
  HapinessLevel: number;
  StressLevel: number;
  AnxietyLevel: number;
  HappySentence: string;
  RealisationSentence?: string;
}
export interface UserDto {
  Id: number;
  UserName: string;
  Name: string;
  BirthDate: string;
  Descrition: string;
  HasNip: boolean;
}
export interface Goal {
  Id: number;
  UserId: number;
  Name: string;
  Succeeded: string;
}
