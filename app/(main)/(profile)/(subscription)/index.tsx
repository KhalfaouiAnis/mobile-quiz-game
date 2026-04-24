import { ActivityIndicator, ScrollView, View } from "react-native";

import SubscriptionWrapper from "@/src/components/layout/profile/SubscriptionsWrapper";
import AuthHeader from "@/src/components/layout/AuthHeader";
import Container from "@/src/components/shared/Container";

import { usePackagesQuery } from "@/src/hooks/queries/packages/usePackages";
import { useSubscriptionsQuery } from "@/src/hooks/queries/packages/useSubscriptions";
import ViewWrapper from "@/src/components/shared/ViewWrapper";

export default function Index() {
    const { data: subscriptions, isLoading: loadingSubscriptions } = useSubscriptionsQuery()
    const { data: packages, isLoading: loadingPackages } = usePackagesQuery()

    return (
        <Container header={<AuthHeader showLogo={false} label="إدارة الاشتراك" />}>
            {
                (loadingSubscriptions || loadingPackages) ? <ActivityIndicator size="large" /> : (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerClassName="justify-center px-2 py-4 "
                    >
                        <ViewWrapper>
                            <View className="gap-8">
                                <SubscriptionWrapper title="The Challenge التحدي" packages={packages} subscriptions={subscriptions} />
                                <SubscriptionWrapper title="The Liar" packages={packages} subscriptions={subscriptions} />
                                <SubscriptionWrapper title="قدها" packages={packages} subscriptions={subscriptions} />
                            </View>
                        </ViewWrapper>
                    </ScrollView>
                )
            }
        </Container>
    );
}
