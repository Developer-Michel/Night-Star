export interface TrackingData {
  UserId: number;
  Date: string; //format YYYY-MM-DD
  SleepTime: number;
  SleepQuality: number;
  MeditationTime: number;
  YogaTime: number;
  ExerciseTime: number;
  OutsideWalkTime: number;
  HapinessLevel: number;
  StressLevel: number;
  AnxietyLevel: number;
  HappySentence: string;
  RealisationSentence?: string;
  WaterIntake: number;
  MusicTime: number;
}
export interface UserDto {
  Id: number;
  UserName: string;
  Name: string;
  BirthDate: string;
  Description: string;
  HasNip: boolean;
}
export interface GoalType {
  Id: number;
  UserId: number;
  Name: string;
  Succeeded: boolean;
}
export interface FeedbackType {
  Id: number;
  Name: string;
  Succeeded: boolean;
  Date: string;
}

export interface BookType {
  Name: string;
  Author: string;
  PageQuantity: number;
  NumberOfWeekObjective: number;
  Started: string | null;
  Created: string;
  CreatorId: number;
  CreatorName: string;
  Finished: boolean;
}
export interface BookUser {
  UserId: number;
  BookName: string;
  PageRead: number;
}
export interface BookDto {
  Book: BookType;
  Users: BookUser[];
}
