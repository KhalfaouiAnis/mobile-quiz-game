import Game2Timer from "@/core/components/game2/game-timer";
import QuestionIndex from "@/core/components/game2/question-index";
import Container from "@/core/components/ui/shared/container";
import { TEXT_SCALE_FACOTR, VIEW_SCALE_FACTOR } from "@/core/constants";
import { IMAGES } from "@/core/constants/images";
import { boxShadow } from "@/core/utils/cn";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function GameBoard() {
    return (
        <Container
            header={
                <View className="flex-row items-center justify-between px-4 pt-2">
                    <Pressable
                        className="bg-white rounded-full items-center justify-center"
                        style={[
                            [boxShadow(0.65, 0.65, 1.3, 0, "rgb(fff fff fff / 0.30)").button,
                            boxShadow(-0.65, -0.65, 1.3, 0, "rgb(209 217 230 / 0.50)").button],
                            { width: 40 * TEXT_SCALE_FACOTR, height: 40 * TEXT_SCALE_FACOTR }
                        ]}
                    >
                        <FontAwesome6 name="close" color="#F1190E" size={20 * VIEW_SCALE_FACTOR} />
                    </Pressable>
                    <Pressable>
                        <Text className="text-white text-2xl">The Challenge التحدي</Text>
                    </Pressable>
                    <Pressable
                        className="bg-white rounded-full items-center justify-center"
                        style={[
                            [boxShadow(0.65, 0.65, 1.3, 0, "rgb(fff fff fff / 0.30)").button,
                            boxShadow(-0.65, -0.65, 1.3, 0, "rgb(209 217 230 / 0.50)").button],
                            { width: 40 * TEXT_SCALE_FACOTR, height: 40 * TEXT_SCALE_FACOTR }
                        ]}
                    >
                        <Ionicons name="home-outline" color="#F1190E" size={20 * VIEW_SCALE_FACTOR} />
                    </Pressable>
                </View>
            }
        >
            <ScrollView
                contentContainerClassName="content-center justify-center pb-1"
                showsVerticalScrollIndicator={false}
            >
                <View className="flex-row items-center justify-between  px-8">
                    <View>
                        <Game2Timer duration={20} />
                    </View>
                    <View className="mt-1 bg-white rounded-2xl py-1 px-4 mx-8 border border-secondary-500 items-center flex-1">
                        <Text className="text-primary-500 mb-1 text-xl font-cairo-bold">ما اسم لعبة راعي البقر في فيلم توي ستوري؟</Text>
                        <Image
                            source={IMAGES.Game2Question}
                            contentFit="cover"
                            style={{ width: "100%", height: 180 * VIEW_SCALE_FACTOR }}
                        />
                    </View>
                    <View>
                        <QuestionIndex />
                    </View>
                </View>
                <View className="mt-2 bg-white rounded-2xl py-1 px-4 mx-8 border border-secondary-500 items-center">
                    <Text>Option 1</Text>
                    <Text>Option 2</Text>
                    <Text>Option 3</Text>
                    <Text>Option 4</Text>
                </View>
            </ScrollView>
        </Container>
    );
}
