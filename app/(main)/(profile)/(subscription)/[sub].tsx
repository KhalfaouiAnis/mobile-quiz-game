import { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";
import AppButton from "@/src/components/shared/button/AppButton";
import AuthHeader from "@/src/components/layout/AuthHeader";
import Container from "@/src/components/shared/Container";
import AppModal from "@/src/components//shared/modal/AppModal";

import ActivePlanBadge from "@/src/components/layout/profile/ActivePlanBadge";
import PaymentSucceedModal from "@/src/components/layout/profile/PaymentSucceedModal";

import { usePackageInfoQuery } from "@/src/hooks/queries/packages/usePackages";
import { useSubscriptionsQuery } from "@/src/hooks/queries/packages/useSubscriptions";
import { usePurchasePackage } from "@/src/hooks/mutations/subscriptions/useSubscription";
import { type Subscription_TYPES } from "@/src/types/index.types";

import { IMAGES } from "@/src/constants/images";
import { boxShadow } from "@/src/utils/cn";
import { packageIcon } from ".";

export default function Index() {
    const { sub } = useLocalSearchParams<{ sub: string }>();
    const [showModal, setShowModal] = useState(false);
    const { mutate, isPending } = usePurchasePackage()
    const { data: subscriptions, isLoading: loadingPurchases } = useSubscriptionsQuery()
    const { data: packageInfo, isLoading: loadingPackageInfo } = usePackageInfoQuery(Number(sub))

    const handlePurchase = () => {
        mutate(Number(sub), {
            onSuccess() {
                setShowModal(true)
            }
        })
    }

    return (
        <Container backgroundColor="#00A6DA" header={<AuthHeader showLogo={false} label="إدارة الاشتراك" />}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName="items-center gap-4 my-2 mx-24 p-3 rounded-3xl border-[10px] border-secondary-500 bg-white"
            >
                <View
                    style={[boxShadow(4, 4, 4, 0).button, { width: 340 }]}
                    className="border border-gray-300 rounded-2xl pb-4"
                >
                    <View
                        className="relative flex-1 flex-row items-center bg-white px-10 py-6 rounded-2xl"
                    >
                        {
                            subscriptions?.active && (
                                <Image
                                    source={IMAGES.ActivePlanBadge}
                                    style={{ position: "absolute", start: -17, top: -14, width: 100, height: 100 }} />
                            )
                        }
                        <View>
                            <Image
                                source={packageIcon(packageInfo?.subscription_type as Subscription_TYPES)}
                                style={{ width: 48, height: 48, objectFit: "contain" }} />
                        </View>
                        <View className="ms-6 me-10">
                            <View className="flex-row items-center">
                                <Text className="font-cairo-bold">{packageInfo?.name}</Text>
                                {subscriptions?.active && <ActivePlanBadge />}
                            </View>
                            <Text className="flex-1 font-bagel-regular text-gray-600" numberOfLines={1} ellipsizeMode="tail">{packageInfo?.description}</Text>
                        </View>
                        <View className="ms-auto">
                            <Text className="font-bagel-regular text-lg text-[#1977F2]">{packageInfo?.price} $</Text>
                            <Text className="font-bagel-regular text-xs text-gray-600">في الشهر</Text>
                        </View>
                    </View>
                    <View className="border-t border-gray-300 pt-6 gap-2">
                        {/* {currentPlan?.features?.map(text => <SubscriptionFeature key={text} text={text} />)} */}
                    </View>
                </View>
                <View className="w-1/4">
                    <AppButton
                        loading={isPending}
                        disabled={isPending}
                        title="اختر الاشتراك"
                        onPress={handlePurchase}
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
