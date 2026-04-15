import AppButton from "@/src/components/shared/button/AppButton";
import AuthHeader from "@/src/components/layout/AuthHeader";
import Container from "@/src/components/shared/Container";
import ViewWrapper from "@/src/components/shared/ViewWrapper";
import { IMAGES } from "@/src/constants/images";
import { useRouter } from "expo-router";
import { Image, Text, View } from "react-native";

export default function OTPVerificationScreen() {
    const router = useRouter()

    return (
        <Container backgroundColor="#00A6DA" header={<AuthHeader showLogo={false} />}>
            <View className="flex-1 justify-center px-8 py-4 gap-y-6">
                <Image source={IMAGES.Done} style={{ width: 200, height: 100, objectFit: "contain", alignSelf: "center", marginBottom: -30, marginTop: -26 }} />
                <ViewWrapper>
                    <Text className="text-center text-xl font-cairo-bold text-primary-500">
                        تم بنجاح!
                    </Text>
                    <Text className="text-center text-lg font-cairo-bold mt-6">
                        لقد تم التحقق من حسابك بنجاح.
                    </Text>
                    <View className="w-1/4 mt-12 flex-1">
                        <AppButton title="تاكيد" onPress={() => router.push("/new_password")} />
                    </View>
                </ViewWrapper>
            </View>
        </Container>
    )
}