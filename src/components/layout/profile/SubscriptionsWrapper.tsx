import { Text, View } from "react-native";
import { IMAGES } from "@/src/constants/images";
import { boxShadow } from "@/src/utils/cn";
import SubscriptionCard, { SubscriptionCardProps } from "./SubscriptionCard";
import { fontScale, scale, verticalScale } from "@/src/utils/dimensions";
import AppButton from "../../shared/button/AppButton";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Package, Subscription_TYPES, SubscriptionResponse } from "@/src/types/index.types";

interface Props {
    title: string,
    packages: Package[] | undefined,
    subscriptions: SubscriptionResponse | undefined
}

export function packageIcon(subscription_type: Subscription_TYPES) {
    if (subscription_type === "ultimate_tier") return IMAGES.ProPlan
    if (subscription_type === "basic_tier") return IMAGES.BasicPlan
    if (subscription_type === "premium_tier") return IMAGES.StandardPlan

    return IMAGES.BasicPlan
}

export default function SubscriptionWrapper({ title, packages, subscriptions }: Props) {
    const [selectedPlanId, setSelectedPlanId] = useState<number>();
    const router = useRouter()

    return (
        <View
            style={{ borderRadius: 28, borderWidth: 2, borderColor: "#677185", width: scale(920), height: verticalScale(200) }}
            className="items-center justify-around bg-white"
        >
            <View className="flex-row items-center justify-between px-10 w-full">
                <View style={{
                    borderRadius: 20,
                    borderWidth: 1, borderColor: "#FFF900",
                    width: scale(260), height: verticalScale(50),
                    alignItems: "center", justifyContent: "center",
                    boxShadow: boxShadow(4, 4, 0, 0, "rgba(000 000 000 / 1)").button.boxShadow,
                }}>
                    <Text
                        style={{ fontSize: fontScale(22) }}
                        className="font-cairo-bold text-black text-center">
                        {title}
                    </Text>
                </View>
                <AppButton
                    title="اختر الاشتراك"
                    disabled={!selectedPlanId}
                    onPress={() => router.navigate(`/(main)/(profile)/(subscription)/${selectedPlanId}`)}
                />

            </View>
            <View className="flex-row items-center justify-around w-full">
                {packages?.map((plan, index) => {
                    const isActive = subscriptions?.active?.packageId === plan.id
                    return (
                        <SubscriptionCard
                            name={plan.name}
                            price={plan.price}
                            isActive={!!isActive}
                            key={plan.id + `__${index}`}
                            description={plan.description}
                            selected={plan.id === selectedPlanId}
                            onPress={() => setSelectedPlanId(plan.id)}
                            iconUrl={packageIcon(plan.subscription_type as Subscription_TYPES)}
                        />
                    )
                })}
            </View>
        </View>
    )
}