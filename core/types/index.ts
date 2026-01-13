export type SubscriptionType = string;

export interface User {
  user_id: number;
  username: string;
  email: string;
  role: 'USER' | 'ADMIN';
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
  user: Omit<User, 'password_hash'>;
  accessToken: string;
  refreshToken: string;
}

// JWT payload
export interface JWTPayload {
  userId: number;
  email: string;
  username: string;
  role: 'USER' | 'ADMIN';
  iat?: number;
  exp?: number;
}

// Database query result types
export interface QueryResult<T> {
  rows: T[];
  rowCount: number | null;
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

export interface CreateCategoryRequest {
  name: string;
  image_url?: string | undefined;
  order?: number;
  is_active?: boolean;
}

export interface UpdateCategoryRequest {
  name?: string;
  image_url?: string | undefined;
  order?: number;
  is_active?: boolean;
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
  sub_category_id: number;
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

export interface CreateSubCategoryRequest {
  category_id: number;
  name: string;
  image_url?: string | undefined;
  order?: number;
  is_active?: boolean;
}

export interface UpdateSubCategoryRequest {
  name?: string;
  image_url?: string | undefined;
  order?: number;
  is_active?: boolean;
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
export type QuestionType = 'single_choice' | 'multiple_choice' | 'true_false';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  question_id: number;
  sub_category_id: number;
  content: string;
  file_url?: string | null;
  question_type: QuestionType;
  difficulty: Difficulty;
  points: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
  is_deleted: boolean;
}

export interface Answer {
  answer_id: number;
  question_id: number;
  answer_text: string;
  is_correct: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  is_deleted: boolean;
}

export interface QuestionWithAnswers extends Question {
  answers: Answer[];
  subcategory?: SubCategory;
}

// Game types
export interface GameType {
  game_type_id: number;
  name: string;
  description?: string;
}

export interface GameSession {
  session_id: number;
  created_by: number;
  game_type_id: number;
  question_time_limit: 'FIVE_SECONDS' | 'TEN_SECONDS' | 'FIFTEEN_SECONDS' | 'TWENTY_SECONDS';
  max_categories: number;
  start_time?: Date | null;
  end_time?: Date | null;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
  is_deleted: boolean;
  creator?: {
    user_id: number;
    username: string;
    email: string;
  };
  game_type?: {
    game_type_id: number;
    name: string;
    description: string | null;
  };
}

// Package types
export type Currency = 'KWD' | 'USD' | 'EUR' | 'INR';

export interface Package {
  package_id: number;
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
  purchase_id: number;
  user_id: number;
  package_id: number;
  purchase_date: Date;
  expires_at: Date;
}

// Team Types
export interface Team {
  team_id: number;
  session_id: number;
  name: string;
  is_current_turn: boolean;
  score: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
  is_deleted: boolean;
}

export interface TeamMember {
  team_id: number;
  user_id: number;
  user?: Omit<User, 'password_hash'>;
}

export interface TeamWithMembers extends Team {
  team_members: TeamMember[];
}


// Request/Response Types for Teams
export interface CreateTeamRequest {
  session_id: number;
  name: string;
}

export interface UpdateTeamRequest {
  name?: string;
}

export interface TeamResponse {
  team: TeamWithMembers;
}

export interface TeamsResponse {
  teams: TeamWithMembers[];
  total: number;
  page: number;
  limit: number;
}

// Request/Response Types for Questions
export interface GetQuestionsRequest {
  sub_category_id: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  question_type?: 'single_choice' | 'multiple_choice' | 'true_false';
  limit?: number;
  page?: number;
}

export interface QuestionsResponse {
  questions: QuestionWithAnswers[];
  total: number;
  page: number;
  limit: number;
}

export interface QuestionResponse {
  question: QuestionWithAnswers;
}

// Game Session Types
export interface CreateGameSessionRequest {
  game_type_id: number;
  question_time_limit?: 'FIVE_SECONDS' | 'TEN_SECONDS' | 'FIFTEEN_SECONDS' | 'TWENTY_SECONDS';
  sub_category_ids: number[]; // 6 sub-categories (can be from different categories)
  teams: Array<{
    name: string;
    player_count: number;
  }>; // Exactly 2 teams
}


export interface GameSessionResponse {
  game_session: GameSession;
}

export interface SessionDetails {
  session_id: number;
  game_type_id: number;
  created_by: number;
  status: string;
  max_teams: number;
  questions_per_team: number;
  time_per_question: number;
  max_categories?: number;
  created_at: Date;
  updated_at: Date;
  started_at?: Date | null;
  ended_at?: Date | null;
  teams: Array<{
    team_id: number;
    name: string;
    score: number;
    is_current_turn: boolean;
    created_at: Date;
  }>;
  categories: Array<{
    category_id: number;
    name: string;
  }>;
}

export interface SessionLeaderboard {
  team_id: number;
  team_name: string;
  score: number;
  games_played: number;
  total_score: number;
  average_score: number;
  rank: number;
}

export interface SessionAnalytics {
  session_id: number;
  total_teams: number;
  total_questions: number;
  total_answers: number;
  average_score: number;
  highest_score: number;
  lowest_score: number;
  completion_rate: number;
  average_response_time: number;
  most_answered_category: string;
  least_answered_category: string;
}
