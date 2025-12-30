export interface User {
  id: string;
  fullname: string;
  phone: string;
  email: string;
  role: UserRole;
  avatar?: string | null;
  created_at: Date;
}

export enum UserRole {
  ADMIN = "ADMIN",
  GUEST = "GUEST",
  USER = "USER",
}

export type TimerMode = "countdown" | "elapsed";

export type SelectOption = {
  id: string;
  label: string;
  value: string | number | boolean;
};

export type MediaType = "AUDIO" | "IMAGE" | "VIDEO";