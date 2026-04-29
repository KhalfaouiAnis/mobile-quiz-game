export type GlobalSelectOption = {
    label: string,
    value: string
}

export type SubscriptionType = string;

export interface SubscriptionPlan {
  iconUrl: any;
  title: string;
  subTitle: string;
  price: number;
  features?: string[];
}

export type ThemeType = "light" | "dark" | "system";

export type Subscription_TYPES =
  | "ultimate_tier"
  | "premium_tier"
  | "basic_tier";

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

export interface UserSubscription {
  id: number;
  user_id: number;
  package_id: number;
  purchase_date: Date;
  expires_at: Date;
}

export interface ActiveSubscription {
  purchaseId: number;
  packageId: number;
  packageName: string;
  gameLimit: number;
  gamesUsed: number;
  gamesLeft: number;
  expiresAt: Date;
  purchasedAt: Date;
}

export interface PurchaseHistory {
  purchaseId: number;
  packageId: number;
  packageName: string;
  subscriptionType: string;
  gameLimit: number;
  purchasedAt: Date;
  expiresAt: Date;
  isExpired: boolean;
}

export type SubscriptionResponse = {
  hasActiveSubscription: boolean;
  active: ActiveSubscription;
  history: PurchaseHistory[];
};

export interface UserPurchase {
  purchaseId: number;
  packageName: string;
  gameLimit: number;
  expiresAt: Date;
  purchasedAt: Date;
}
