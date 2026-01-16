import AppButton from "@/core/components/ui/base/button/app-button";
import AuthHeader from "@/core/components/ui/layout/auth-header";
import PaymentSucceedModal from "@/core/components/ui/layout/profile/payment-succeed-modal";
import SubscriptionCard from "@/core/components/ui/layout/profile/subscription-card";
import Container from "@/core/components/ui/shared/container";
import AppModal from "@/core/components/ui/shared/modal/app-modal";
import { SUBSCRIPTION_PLANS } from "@/core/constants";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";

export default function Index() {
    const [showModal, setShowModal] = useState(false);
    const [selectedPlanId, setSelectedPlanId] = useState(1)

    return (
        <Container backgroundColor="#00A6DA" header={<AuthHeader showLogo={false} label="إدارة الاشتراك" />}>
            <View className="flex-1 mt-2 mx-24 p-3 mb-6 rounded-3xl bg-secondary-500">
                <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="items-center pb-8 gap-4" className="bg-white pt-4 rounded-3xl">
                    {SUBSCRIPTION_PLANS.map(plan => (
                        <SubscriptionCard
                            key={plan.id}
                            iconUrl={plan.iconUrl}
                            isActive={plan.isActive}
                            price={plan.price}
                            title={plan.title}
                            subTitle={plan.subTitle}
                            onPress={() => setSelectedPlanId(plan.id)}
                        />
                    ))}
                    <View className="w-1/4">
                        <AppButton
                            title="اختر الاشتراك"
                            onPress={() => router.navigate(`/(main)/(profile)/(subscription)/1`)}
                        // onPress={() => setShowModal(true)}
                        />
                    </View>
                </ScrollView>
            </View>
            <AppModal
                visible={showModal}
                onClose={() => setShowModal(false)}
                content={<PaymentSucceedModal />}
            />
        </Container>
    );
}
