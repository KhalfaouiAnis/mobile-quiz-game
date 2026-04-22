import { ActivityIndicator, ScrollView } from "react-native";

import SubscriptionWrapper from "@/src/components/layout/profile/SubscriptionsWrapper";
import AuthHeader from "@/src/components/layout/AuthHeader";
import Container from "@/src/components/shared/Container";

import { usePackagesQuery } from "@/src/hooks/queries/packages/usePackages";
import { useSubscriptionsQuery } from "@/src/hooks/queries/packages/useSubscriptions";

export default function Index() {
    const { data: subscriptions, isLoading: loadingSubscriptions } = useSubscriptionsQuery()
    const { data: packages, isLoading: loadingPackages } = usePackagesQuery()

    return (
        <Container header={<AuthHeader showLogo={false} label="إدارة الاشتراك" />}>
            {
                (loadingSubscriptions || loadingPackages) ? <ActivityIndicator size="large" /> : (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerClassName="items-center gap-10 mx-2 p-3 rounded-3xl border-2 border-secondary-500 bg-white pb-12 mt-4"
                    >
                        <SubscriptionWrapper title="The Challenge التحدي" packages={packages} subscriptions={subscriptions} />
                        <SubscriptionWrapper title="The Liar" packages={packages} subscriptions={subscriptions} />
                        <SubscriptionWrapper title="قدها" packages={packages} subscriptions={subscriptions} />
                    </ScrollView>
                )
            }
        </Container>
    );
}
