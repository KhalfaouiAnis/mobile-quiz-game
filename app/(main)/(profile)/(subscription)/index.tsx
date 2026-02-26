import AppButton from "@/core/components/ui/base/button/app-button";
import AuthHeader from "@/core/components/ui/layout/auth-header";
import PaymentSucceedModal from "@/core/components/ui/layout/profile/payment-succeed-modal";
import SubscriptionCard from "@/core/components/ui/layout/profile/subscription-card";
import Container from "@/core/components/ui/shared/container";
import AppModal from "@/core/components/ui/shared/modal/app-modal";
import { IMAGES } from "@/core/constants/images";
import { usePackagesQuery, usePurchasesQuery } from "@/core/services/subscription/subscription.queries";
import { Subscription_TYPES } from "@/core/types";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";

export function packageIcon(subscription_type: Subscription_TYPES) {
    if (subscription_type === "ultimate_tier") return IMAGES.ProPlan
    if (subscription_type === "free_tier") return IMAGES.BasicPlan
    if (subscription_type === "premium_tier") return IMAGES.StandardPlan

    return IMAGES.BasicPlan
}

export default function Index() {
    const [showModal, setShowModal] = useState(false);
    const { data: purchases, isLoading: loadingPurchases } = usePurchasesQuery()
    const { data: packages, isLoading: loadingPackages } = usePackagesQuery()
    const [selectedPlanId, setSelectedPlanId] = useState<number>()

    return (
        <Container header={<AuthHeader showLogo={false} label="إدارة الاشتراك" />}>
            {
                (loadingPurchases || loadingPackages) ? <ActivityIndicator size="large" /> : (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerClassName="items-center gap-4 my-2 mx-24 p-3 rounded-3xl border-[10px] border-secondary-500 bg-white"
                    >
                        {packages?.data?.data?.map(plan => {
                            const isActive = purchases?.data.data?.find(pur => new Date(pur.expires_at).getTime() > new Date().getTime() && plan.package_id === pur.purchase_id)
                            return (
                                <SubscriptionCard
                                    name={plan.name}
                                    price={plan.price}
                                    key={plan.package_id}
                                    isActive={!!isActive}
                                    description={plan.description}
                                    onPress={() => setSelectedPlanId(plan.package_id)}
                                    iconUrl={packageIcon(plan.subscription_type as Subscription_TYPES)}
                                />
                            )
                        })}
                        <View className="w-1/4">
                            <AppButton
                                title="اختر الاشتراك"
                                onPress={() => router.navigate(`/(main)/(profile)/(subscription)/1`)}
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
