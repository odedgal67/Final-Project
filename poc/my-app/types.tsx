/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { roles } from "./utils/Permissions";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export enum Status {
  Done = 3,
  InProgress = 2,
  Open = 1,
  Invalid = 4,
  Undefined = 0,
}

export enum Title /*same as backend*/ {
  EarlyStages = 0,
  SkeletalStages = 1,
  ApartmentStages = 2,
  GeneralStages = 3,
  BuildingFaults = 4,
}

export enum Urgency /*same as backend*/ {
  LOW = 1,
  MODERATE = 2,
  HIGH = 3,
}

export type Project = {
  id: string;
  name: string;
};

export type ListedStatusItem = {
  name: string;
  status: Status;
  id: string;
  title?: Title;
};

export type GeneralStage = {
  completion_date: Date;
} & ListedStatusItem;

type UnitProperties = {
  floor: number;
  apartment_number: number;
  title: Title.ApartmentStages;
};

export type UnitStage = GeneralStage & UnitProperties;

export type Stage = UnitStage | GeneralStage;

export type Mission = {
  proof_link?: string;
  plan_link?: string;
  document_link?: string;
  green_building: boolean;
  completion_date: Date;
  completing_user: string;
  comment: string;
} & ListedStatusItem;

export type User = {
  name: string;
  id: string;
};

export type Plan = {
  name: string;
  id: string;
  link: string;
  date: Date;
  project_id: number;
};

export type Fault = {
  urgency: Urgency;
  floor_number: number;
  apartment_number: number;
  completion_date: Date;
  proof: string;
  proof_fix: string;
  project_id: number;
  comment: string;
  green_building: boolean;
} & ListedStatusItem;

export type UserRecord = {
  user: User;
  role: roles;
};
