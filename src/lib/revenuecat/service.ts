import Purchases, {
  LOG_LEVEL,
  CustomerInfo,
  PurchasesPackage,
} from "react-native-purchases";
import { Platform } from "react-native";
import { RC_CONFIG, ENTITLEMENT_KEYS, OFFERING_IDS } from "./config";
import { GameId, GameEntitlement, SubscriptionTier } from "./types";

/**
 * Call once at app startup AFTER the user is authenticated.
 * Pass the userId from your JWT so RevenueCat links purchases
 * to your own user records.
 */
export async function configureRevenueCat(userId: number): Promise<void> {
  if (__DEV__) {
    Purchases.setLogLevel(LOG_LEVEL.DEBUG);
  }

  const apiKey =
    Platform.OS === "ios" ? RC_CONFIG.IOS_KEY : RC_CONFIG.ANDROID_KEY;
  Purchases.configure({ apiKey });

  // Link RevenueCat anonymous user → your user ID
  await Purchases.logIn(userId+"");
}

/**
 * Call on logout to disconnect the user from RevenueCat.
 * RC will revert to an anonymous user.
 */
export async function resetRevenueCat(): Promise<void> {
  await Purchases.logOut();
}

/**
 * Fetch current CustomerInfo from RevenueCat servers.
 */
export async function fetchCustomerInfo(): Promise<CustomerInfo> {
  return Purchases.getCustomerInfo();
}

/**
 * Fetch packages for a specific game's offering.
 */
export async function fetchGameOffering(
  gameId: GameId,
): Promise<PurchasesPackage[]> {
  const offerings = await Purchases.getOfferings();
  const offering = offerings.all[OFFERING_IDS[gameId]];

  if (!offering) {
    throw new Error(`Offering not found for game: ${gameId}`);
  }

  return offering.availablePackages;
}

/**
 * Purchase a package. Returns updated CustomerInfo.
 */
export async function purchasePackage(
  pkg: PurchasesPackage,
): Promise<CustomerInfo> {
  const { customerInfo } = await Purchases.purchasePackage(pkg);
  return customerInfo;
}

/**
 * Restore previously purchased subscriptions.
 * Important: must be accessible via a UI button (Apple requirement).
 */
export async function restorePurchases(): Promise<CustomerInfo> {
  return Purchases.restorePurchases();
}

/**
 * Parse CustomerInfo to extract the active entitlement for a specific game.
 * Returns the HIGHEST active tier.
 */
export function getGameEntitlement(
  customerInfo: CustomerInfo,
  gameId: GameId,
): GameEntitlement {
  const entitlements = customerInfo.entitlements.active;
  const tiers: SubscriptionTier[] = ["platinum", "pro", "basic"];

  for (const tier of tiers) {
    const key = ENTITLEMENT_KEYS[gameId][tier];
    if (entitlements[key]) {
      return {
        gameId,
        tier,
        isActive: true,
        expirationDate: entitlements[key].expirationDate,
      };
    }
  }

  return { gameId, tier: null, isActive: false, expirationDate: null };
}
