import { Platform } from "react-native";
import { IMAGES } from "./images";
import { SubscriptionPlan } from "../types";

export const APP_STORAGE_KEY = "KAHOOT_APP_STORAGE_KEY";
export const AUTH_STORAGE_KEY = "KAHOOT_AUTH_STORAGE";
export const ACC_TOKEN_STORAGE_KEY = "KAHOOT_ACC_TOKEN";
export const REFRESH_TOKEN_STORAGE_KEY = "KAHOOT_REFRESH_TOKEN";
export const CONFIGURATION_STORAGE_KEY = "KAHOOT_PREFERENCES_STORAGE";
export const GAME1_STORAGE_KEY = "KAHOOT_GAME1_STORAGE";
export const HAS_LAUNCHED = "has_launched";
export const RESET_PASSWORD_TOKEN = "RESET_PASSWORD_TOKEN";

export const TEXT_SCALE_FACOTR = Platform.isTVOS ? 10 : 1;
export const VIEW_SCALE_FACTOR = Platform.isTVOS ? 10 : 1;

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    iconUrl: IMAGES.ProPlan,
    price: 99.99,
    title: "محترف",
    subTitle: "رصيد غير محدود",
    features: [
      "20 جولة في اللعبة الأولى",
      "30 جولة في اللعبة الثانية",
      "قاعدة أسئلة موسعة ومستمرة",
      "إمكانية إعادة اللعب يوميًا",
      "محتوى وأسئلة حصرية تُحدث أسبوعيًا",
    ],
  },
  {
    iconUrl: IMAGES.StandardPlan,
    price: 44.99,
    title: "الأساسي",
    subTitle: "50 جولة",
    features: [
      "10 جولة في اللعبة الأولى",
      "15 جولة في اللعبة الثانية",
      "قاعدة أسئلة موسعة ومستمرة",
      "إمكانية إعادة اللعب يوميًا",
      "محتوى وأسئلة حصرية تُحدث أسبوعيًا",
    ],
  },
  {
    iconUrl: IMAGES.BasicPlan,
    price: 20.99,
    title: "بسيط",
    subTitle: "25 جولة",
    features: [
      "5 جولة في اللعبة الأولى",
      "10 جولة في اللعبة الثانية",
      "قاعدة أسئلة موسعة ومستمرة",
      "إمكانية إعادة اللعب يوميًا",
      "محتوى وأسئلة حصرية تُحدث أسبوعيًا",
    ],
  },
];

export const COMMON_TEAM_NAMES = [
  { id: "1", teamName: "Team A" },
  { id: "2", teamName: "Team B" },
  { id: "3", teamName: "Team C" },
  { id: "4", teamName: "Team D" },
  { id: "5", teamName: "Team E" },
  { id: "6", teamName: "Team F" },
  { id: "7", teamName: "Team G" },
  { id: "8", teamName: "Team H" },
];

export const GAME1_QUESTION_TIME = [
  { label: "25 ثانية", value: 25 },
  { label: "45 ثانية", value: 45 },
  { label: "60 ثانية", value: 60 },
  { label: "75 ثانية", value: 75 },
  { label: "90 ثانية", value: 90 },
];
