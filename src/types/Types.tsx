import { taskOccurenceType, taskStatusType } from "@component/main-pages/calendar/types";

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
  HapinessLevelNight: number;
  StressLevelNight: number;
  AnxietyLevelNight: number;
  HappySentence: string;
  RealisationSentence?: string;
  WaterIntake: number;
  MusicTime: number;
  ImageUrl: string;
  DiaryText: string;
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
  VisOrder: number;
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

export interface NotificationType {
  Id: number;
  Type: string;
  Description: string;
  Date: string;
}
export interface NotificationUser {
  NotificationId: number;
  UserId: number;
}

export interface NotificationDTO {
  Notification: NotificationType;
  Seen: boolean;
}

export interface ToDoTask {
  Id: number;
  UserId: number;
  Name: string;
  Description: string;
  Date: string;
  Priority: number;
  Succeeded: boolean;
  Color: string;
}
export interface PostType {
  Id: number;
  Description: string;
  PictureUrl: string;
  Date: string;
  UserId: number;
}
export interface TaskDto {
  Id: number;
  OriginalDate: string;
  UserId: number;
  Name: string;
  Description: string;
  Priority: number;
  Color: string;
  OccurenceType: taskOccurenceType;
  OccurenceXday: number;
  OccurenceWeekDaysJson: string[];
  Date: string;
  Status: taskStatusType;
}
export interface PostReactionType {
  UserId: number;
  PostId: number;
  ReactionEmoji: string;
}
