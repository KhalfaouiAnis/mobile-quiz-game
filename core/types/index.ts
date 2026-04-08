export type SubscriptionType = string;

export interface SubscriptionPlan {
  iconUrl: any;
  title: string;
  subTitle: string;
  price: number;
  features?: string[];
}

export type Subscription_TYPES =
  | "ultimate_tier"
  | "premium_tier"
  | "basic_tier";

export interface User {
  id: number;
  username: string;
  email: string;
  role: "USER" | "ADMIN";
  games_played: number;
  total_score: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
  is_deleted: boolean;
  google_id?: string | null;
  apple_id?: string | null;
  facebook_id?: string | null;
  is_active?: boolean;
  avatar_url?: string;
}

export interface CreateUserRequest {
  username?: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email?: string;
  username?: string;
  password: string;
}

export interface AuthResponse {
  user: Omit<User, "password_hash">;
  accessToken: string;
  refreshToken: string;
}

// JWT payload
export interface JWTPayload {
  userId: number;
  email: string;
  username: string;
  role: "USER" | "ADMIN";
  iat?: number;
  exp?: number;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Category types
export interface Category {
  id: number;
  name: string;
  image_url?: string | null;
  order: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
  is_deleted: boolean;
}

export interface CategoryResponse {
  category: Category;
}

export interface CategoriesResponse {
  categories: Category[];
  total: number;
  page: number;
  limit: number;
}

export interface SubCategory {
  id: number;
  category_id: number;
  name: string;
  image_url?: string | null;
  order: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
  is_deleted: boolean;
}

export interface SubCategoryResponse {
  subcategory: SubCategory;
}

export interface SubCategoriesResponse {
  subcategories: SubCategory[];
  total: number;
  page: number;
  limit: number;
}

export interface SubCategoryWithCategory extends SubCategory {
  category: Category;
}

// Question types
export type QuestionType = "single_choice" | "multiple_choice" | "true_false";
export type Difficulty = "easy" | "medium" | "hard";

export interface Question {
  id: number;
  sub_category_id: number;
  content: string;
  file_url?: string | null;
  difficulty: Difficulty;
  points: number;
  point_value?: number;
  is_answered?: boolean;
  grid_row: number;
  grid_col: number;
  subcategory?: {
    id: number;
    name: string;
    image_url: string | null;
  };
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
  is_deleted: boolean;
}

export interface Answer {
  id: number;
  question_id: number;
  file_url?: string | null;
  answer_text: string;
  is_correct: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  is_deleted: boolean;
}

export interface AnswerSubmissionRequest {
  team_id: number;
  question_id: number;
  session_id: number;
  is_correct: boolean;
  is_boosted: boolean;
}

export interface AnswerSubmissionResponse {
  is_correct: boolean;
  points_available: number;
  correct_answer_ids: number[];
  correct_answers: Answer[];
  selected_answers: Answer[];
  explanation: string | null;
}

export interface QuestionWithAnswers extends Question {
  answers: Answer[];
  // subcategory?: SubCategory;
}

export interface GameSession {
  id: number;
  created_by: number;
  question_time_limit: number;
  max_categories: number;
  start_time?: Date | null;
  end_time?: Date | null;
  status: "pending" | "active" | "completed" | "cancelled";
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
  is_deleted: boolean;
  creator?: {
    user_id: number;
    username: string;
    email: string;
  };
}

export interface LastAciveSessionStats {
  remainingQuestions: number;
  completionPercentage: number;
  sessionId: number;
}

// Package types
export type Currency = "KWD" | "USD" | "EUR" | "INR";

export interface Package {
  id: number;
  name: string;
  price: number;
  currency: Currency;
  description?: string;
  question_count: number;
  game_limit: number;
  subscription_type: SubscriptionType;
  created_at: Date;
}

export interface UserPurchase {
  id: number;
  user_id: number;
  package_id: number;
  purchase_date: Date;
  expires_at: Date;
}

// Team Types
export interface Team {
  id: number;
  session_id: number;
  name: string;
  is_current_turn: boolean;
  is_boost_used: boolean;
  score: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
  is_deleted: boolean;
}

export interface QuestionResponse {
  question: QuestionWithAnswers;
}

export interface GameBoard {
  questionTimeLimit: number;
  sessionId: number;
  grid: Question[];
  teams: Team[];
}
