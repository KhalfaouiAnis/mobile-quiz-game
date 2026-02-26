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

// name: string;
// created_at: Date;
// package_id: number;
// price: Decimal;
// currency: $Enums.Currency;
// description: string | null;
// question_count: number;
// game_limit: number;
// subscription_type: string;

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
