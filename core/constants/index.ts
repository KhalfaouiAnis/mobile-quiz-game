import { Platform } from "react-native";

export const APP_STORAGE_KEY = "KAHOOT_APP_STORAGE_KEY";
export const AUTH_STORAGE_KEY = "KAHOOT_AUTH_STORAGE";
export const ACC_TOKEN_STORAGE_KEY = "KAHOOT_ACC_TOKEN";
export const REFRESH_TOKEN_STORAGE_KEY = "KAHOOT_REFRESH_TOKEN";
export const CONFIGURATION_STORAGE_KEY = "KAHOOT_PREFERENCES_STORAGE";
export const HAS_LAUNCHED = "has_launched";
export const RESET_PASSWORD_TOKEN = "RESET_PASSWORD_TOKEN";

export const TEXT_SCALE_FACOTR = Platform.isTVOS ? 4 : 1;
export const VIEW_SCALE_FACTOR = Platform.isTVOS ? 4 : 1;