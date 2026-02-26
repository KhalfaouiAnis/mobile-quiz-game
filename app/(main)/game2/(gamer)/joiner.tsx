import QuestionIndex from "@/core/components/game2/question-index";
import AppButton from "@/core/components/ui/base/button/app-button";
import AppTextInput from "@/core/components/ui/base/text/app-text-field";
import AuthHeader from "@/core/components/ui/layout/auth-header";
import Container from "@/core/components/ui/shared/container";
import { VIEW_SCALE_FACTOR } from "@/core/constants";
import { IMAGES } from "@/core/constants/images";
import { useJoinGame2Session } from "@/core/hooks/game2/joiner";
import { boxShadow } from "@/core/utils/cn";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Text, View } from "react-native";

export default function JoinGameSession() {
    const { control } = useJoinGame2Session()

    return (
        <Container header={<AuthHeader showLogo />}>
            <View
                style={boxShadow(4, 4, 0, 1, "rgba(000 000 000 /1)").button}
                className="items-center justify-center pb-1 flex-1 w-2/3 bg-white px-8 gap-y-6 mx-auto my-2 rounded-2xl border-secondary-500 border"
            >
                <View className="h-16" style={{ width: 300 * VIEW_SCALE_FACTOR }}>
                    <AppTextInput
                        required
                        name="name"
                        control={control}
                        label="اسمك في اللعبة"
                        boxShadow={boxShadow(4, 4, 0, 1, "rgba(000 000 000 /1)").button.boxShadow}
                    />
                </View>
                <View
                    className="rounded-2xl py-1 px-4 border border-primary-500 items-center"
                    style={{ width: 300 * VIEW_SCALE_FACTOR, boxShadow: boxShadow(4, 4, 0, 1, "rgba(000 000 000 /1)").button.boxShadow }}
                >
                    <Image
                        source={IMAGES.Game2Question}
                        contentFit="cover"
                        style={{ width: 70 * VIEW_SCALE_FACTOR, height: 70 * VIEW_SCALE_FACTOR, borderRadius: 16 }}
                    />
                    <Text className="text-primary-500 mb-1 text-lg font-cairo-bold">اختر الصورة الرمزية الخاصة بك</Text>
                </View>
                <View style={{ width: 130 * VIEW_SCALE_FACTOR }}>
                    <AppButton
                        title="التالي"
                        onPress={() => router.push("/game2/(gamer)/enterCode")}
                    />
                </View>
            </View>
        </Container>
    );
}
