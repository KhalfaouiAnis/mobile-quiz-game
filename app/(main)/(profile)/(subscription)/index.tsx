import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";

import AppButton from "@/src/components/shared/button/AppButton";
import AuthHeader from "@/src/components/layout/AuthHeader";
import Container from "@/src/components/shared/Container";
import AppModal from "@/src/components//shared/modal/AppModal";
import PaymentSucceedModal from "@/src/components/layout/profile/PaymentSucceedModal";
import SubscriptionCard from "@/src/components/layout/profile/SubscriptionCard";

import { IMAGES } from "@/src/constants/images";
import { usePackagesQuery } from "@/src/hooks/queries/packages/usePackages";
import { useSubscriptionsQuery } from "@/src/hooks/queries/packages/useSubscriptions";
import { type Subscription_TYPES } from "@/src/types/index.types";

export function packageIcon(subscription_type: Subscription_TYPES) {
    if (subscription_type === "ultimate_tier") return IMAGES.ProPlan
    if (subscription_type === "basic_tier") return IMAGES.BasicPlan
    if (subscription_type === "premium_tier") return IMAGES.StandardPlan

    return IMAGES.BasicPlan
}

export default function Index() {
    const [showModal, setShowModal] = useState(false);
    const { data: subscriptions, isLoading: loadingSubscriptions } = useSubscriptionsQuery()
    const { data: packages, isLoading: loadingPackages } = usePackagesQuery()
    const [selectedPlanId, setSelectedPlanId] = useState<number>()

    return (
        <Container header={<AuthHeader showLogo={false} label="إدارة الاشتراك" />}>
            {
                (loadingSubscriptions || loadingPackages) ? <ActivityIndicator size="large" /> : (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerClassName="items-center gap-8 my-2 mx-24 p-3 rounded-3xl border-[10px] border-secondary-500 bg-white pb-12"
                    >
                        {packages?.map((plan, index) => {
                            const isActive = subscriptions?.active?.packageId === plan.id
                            return (
                                <SubscriptionCard
                                    name={plan.name}
                                    price={plan.price}
                                    isActive={!!isActive}
                                    description={plan.description}
                                    key={plan.id + `__${index}`}
                                    onPress={() => setSelectedPlanId(plan.id)}
                                    iconUrl={packageIcon(plan.subscription_type as Subscription_TYPES)}
                                />
                            )
                        })}
                        <View className="w-1/4">
                            <AppButton
                                title="اختر الاشتراك"
                                disabled={!selectedPlanId}
                                onPress={() => router.navigate(`/(main)/(profile)/(subscription)/${selectedPlanId}`)}
                            // onPress={() => setShowModal(true)}
                            />
                        </View>
                    </ScrollView>
                )
            }
            <AppModal
                visible={showModal}
                onClose={() => setShowModal(false)}
                content={<PaymentSucceedModal />}
            />
        </Container>
    );
}
