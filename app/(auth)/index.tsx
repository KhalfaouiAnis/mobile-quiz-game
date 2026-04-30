import AppButton from "@/src/components/shared/button/AppButton";
import Container from "@/src/components/shared/Container";
import ViewWrapper from "@/src/components/shared/ViewWrapper";
import { IMAGES } from "@/src/constants/images";

import { boxShadow } from "@/src/utils/cn";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function IndexScreen() {
    const { t } = useTranslation();
    const router = useRouter();

    return (
        <Container backgroundColor="#00A6DA">
            <View className="flex-1 justify-center px-8 py-4 gap-y-2">
                <View className="self-center bg-transparent">
                    <Image source={IMAGES.GadghaLogo} style={{ width: 110, height: 60, objectFit: "contain", borderRadius: 50 }} />
                </View>
                <ViewWrapper>
                    <Text className="text-center text-xl font-cairo-bold mb-4 text-primary-500">{t("welcome.auth")}</Text>
                    <Text className="text-center font-cairo-bold">
                        {t("welcome.get_started")}
                    </Text>
                    <Text className="text-center font-cairo-bold">
                        {t("welcome.created_you_account")}
                    </Text>
                    <Text className="text-center font-cairo-bold mt-6">
                        {t("welcome.start_here")}
                    </Text>
                    <View className="flex-row gap-3 items-center justify-center mt-4">
                        <AppButton title={t("welcome.signin")} onPress={() => router.push("/(auth)/signin")} />
                        <AppButton title={t("welcome.signup")} onPress={() => router.push("/(auth)/signup")} />
                        <AppButton title={t("welcome.scan_qr")} onPress={() => { }} />
                    </View>
                </ViewWrapper>
            </View>
        </Container>
    )
}