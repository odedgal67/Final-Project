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
  Done = "Done",
  InProgress = "InProgress",
  Open = "Open",
}

export type Project = {
  name: string;
  stages: Stage[];
};

export type GeneralStage = {
  name: string;
  status: Status;
  completion_date: Date;
  missions: Mission[];
};

type UnitProperties = {
  floor: number;
  apartment_number: number;
};

export type UnitStage = GeneralStage & UnitProperties;

export type Stage = UnitStage | GeneralStage;

export type Mission = {
  name: string;
  status: Status;
  proof: number;
  link: string;
  green_building: boolean;
  completion_date: Date;
  completing_user: string;
};

export type User = {
  name: string;
  id: string;
};
