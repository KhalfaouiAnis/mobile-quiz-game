import Container from "@/core/components/ui/shared/container";
import { VIEW_SCALE_FACTOR } from "@/core/constants";
import { IMAGES } from "@/core/constants/images";
import { shuffleArray } from "@/core/utils";
import { boxShadow } from "@/core/utils/cn";
import { Image } from "expo-image";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import Animated, { LinearTransition } from 'react-native-reanimated';

const PLAYERS = [
    { id: "1", name: "لومة", avatar: "", score: 1145 },
    { id: "2", name: "نضال", avatar: "", score: 950 },
    { id: "3", name: "محمد", avatar: "", score: 500 },
    { id: "4", name: "لومة 2", avatar: "", score: 499 },
    { id: "5", name: "نضال 2", avatar: "", score: 489 },
    { id: "6", name: "محمد 3", avatar: "", score: 200 },
]

export default function LeaderBoard() {
    const [players, setPlayers] = useState(PLAYERS);

    const handleShaffle = () => {
        setPlayers(shuffleArray(PLAYERS));
    }

    return (
        <Container>
            <View className="items-center mt-4">
                <Text className="text-white text-2xl font-cairo-bold">the challenge التحدي</Text>
            </View>
            <View className="items-center mt-4">
                <Pressable className="p-4 bg-white rounded-2xl"
                    onPress={handleShaffle}
                >
                    <Text className="font-bagel-regular text-xl">Shuffle</Text>
                </Pressable>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName="content-center justify-center mt-4 pb-4 px-10"
            >
                {
                    players.map((player) => (
                        <Animated.View
                            key={player.id}
                            layout={LinearTransition.springify().damping(40).stiffness(800).duration(1500)}
                            style={boxShadow(4, 4, 0, 0, "rgba(000 000 000 / 1)").button}
                            className="flex-row items-center justify-between px-3 pb-1 bg-white rounded-2xl mb-4"
                        >
                            <Text className="text-primary-500 font-bagel-regular text-2xl">{player.score}</Text>
                            <View className="gap-6 justify-between items-center flex-row">
                                <Text className="text-primary-500 text-2xl font-cairo-medium">{player.name}</Text>
                                <Image
                                    contentFit="cover"
                                    source={player.avatar ? { uri: player.avatar } : IMAGES.Leader1}
                                    style={{ width: 50 * VIEW_SCALE_FACTOR, height: 50 * VIEW_SCALE_FACTOR }}
                                />
                            </View>
                        </Animated.View>
                    ))
                }
            </ScrollView>
        </Container>
    );
}
