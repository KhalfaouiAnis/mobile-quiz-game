import { Platform } from "react-native";
import { IMAGES } from "./images";
import { SubscriptionPlan } from "../types";

export const APP_STORAGE_KEY = "KAHOOT_APP_STORAGE_KEY";
export const AUTH_STORAGE_KEY = "KAHOOT_AUTH_STORAGE";
export const ACC_TOKEN_STORAGE_KEY = "KAHOOT_ACC_TOKEN";
export const REFRESH_TOKEN_STORAGE_KEY = "KAHOOT_REFRESH_TOKEN";
export const CONFIGURATION_STORAGE_KEY = "KAHOOT_PREFERENCES_STORAGE";
export const HAS_LAUNCHED = "has_launched";
export const RESET_PASSWORD_TOKEN = "RESET_PASSWORD_TOKEN";

export const TEXT_SCALE_FACOTR = Platform.isTVOS ? 4 : 1;
export const VIEW_SCALE_FACTOR = Platform.isTVOS ? 4 : 1;

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 1,
    iconUrl: IMAGES.ProPlan,
    isActive: true,
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
    id: 2,
    iconUrl: IMAGES.StandardPlan,
    isActive: false,
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
    id: 3,
    iconUrl: IMAGES.BasicPlan,
    isActive: false,
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
