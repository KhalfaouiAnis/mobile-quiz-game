import AppButton from "@/core/components/ui/base/button/app-button";
import AuthHeader from "@/core/components/ui/layout/auth-header";
import ActivePlanBadge from "@/core/components/ui/layout/profile/active-plan-badge";
import PaymentSucceedModal from "@/core/components/ui/layout/profile/payment-succeed-modal";
import SubscriptionFeature from "@/core/components/ui/layout/profile/subscription-feature";
import Container from "@/core/components/ui/shared/container";
import AppModal from "@/core/components/ui/shared/modal/app-modal";
import { VIEW_SCALE_FACTOR } from "@/core/constants";
import { IMAGES } from "@/core/constants/images";
import { usePackagesQuery, usePurchasesQuery } from "@/core/services/subscription/subscription.queries";
import { boxShadow } from "@/core/utils/cn";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { packageIcon } from ".";
import { Subscription_TYPES } from "@/core/types";

export default function Index() {
    const { sub } = useLocalSearchParams<{ sub: string }>();
    const [showModal, setShowModal] = useState(false);
    const { data: packages, isLoading: loadingPackages } = usePackagesQuery()
    const { data: purchases, isLoading: loadingPurchases } = usePurchasesQuery()

    const currentPlan = packages?.data?.data?.find(plan => plan.package_id === Number(sub))

    const isActive = purchases?.data.data?.find(pur => new Date(pur.expires_at).getTime() > new Date().getTime() && currentPlan?.package_id === pur.purchase_id)

    return (
        <Container backgroundColor="#00A6DA" header={<AuthHeader showLogo={false} label="إدارة الاشتراك" />}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName="items-center gap-4 my-2 mx-24 p-3 rounded-3xl border-[10px] border-secondary-500 bg-white"
            >
                <View
                    style={[boxShadow(4, 4, 4, 0).button, { width: 340 * VIEW_SCALE_FACTOR }]}
                    className="border border-gray-300 rounded-2xl pb-4"
                >
                    <View
                        className="relative flex-1 flex-row items-center bg-white px-10 py-6 rounded-2xl"
                    >
                        {
                            isActive && (
                                <Image
                                    source={IMAGES.ActivePlanBadge}
                                    style={{ position: "absolute", start: -17, top: -14, width: 100 * VIEW_SCALE_FACTOR, height: 100 * VIEW_SCALE_FACTOR }} />
                            )
                        }
                        <View>
                            <Image
                                source={packageIcon(currentPlan?.subscription_type as Subscription_TYPES)}
                                style={{ width: 48 * VIEW_SCALE_FACTOR, height: 48 * VIEW_SCALE_FACTOR, objectFit: "contain" }} />
                        </View>
                        <View className="ms-6 me-10">
                            <View className="flex-row items-center">
                                <Text className="font-cairo-bold">{currentPlan?.name}</Text>
                                {isActive && <ActivePlanBadge />}
                            </View>
                            <Text className="flex-1 font-bagel-regular text-gray-600" numberOfLines={1} ellipsizeMode="tail">{currentPlan?.description}</Text>
                        </View>
                        <View className="ms-auto">
                            <Text className="font-bagel-regular text-lg text-primary-500">{currentPlan?.price} $</Text>
                            <Text className="font-bagel-regular text-xs text-gray-600">في الشهر</Text>
                        </View>
                    </View>
                    <View className="border-t border-gray-300 pt-6 gap-2">
                        {/* {currentPlan?.features?.map(text => <SubscriptionFeature key={text} text={text} />)} */}
                    </View>
                </View>
                <View className="w-1/4">
                    <AppButton
                        title="اختر الاشتراك"
                        onPress={() => setShowModal(true)}
                    />
                </View>
            </ScrollView>
            <AppModal
                visible={showModal}
                onClose={() => setShowModal(false)}
                content={<PaymentSucceedModal />}
            />
        </Container>
    );
}
