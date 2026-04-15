import { View } from "react-native";
import { useRouter } from "expo-router";
import useGameGrid from "@/src/hooks/gadha/use-game-grid";
import QuestionCell from "./buttons/QuestionCell";
import GadhaGameGoardHeader from "./GadhaGameGoardHeader";
import { GameBoard, Question } from "@/src/types/game.gadha.types";

export default function GadhaGameBoard({ grid, sessionId }: GameBoard) {
    const gridData = useGameGrid(grid);
    const router = useRouter()

    return (
        <View className="flex-1 px-1">
            <View className="flex-row flex-1 justify-around">
                {gridData.map((column, index) => (
                    <View key={column.subcategoryName + "__" + index} className="justify-between px-1 ps-1.5">
                        <View className="py-1">
                            <GadhaGameGoardHeader name={column.subcategoryName || ""} image_url={column.subcategoryImage} />
                        </View>
                        {column.questions.map((question: Question, idx) => (
                            <View key={question.id + "__" + idx} className="flex-1 py-1">
                                <QuestionCell
                                    question={question}
                                    onPress={() => router.push(`/(main)/(gadha)/question/${sessionId}/${question.id}`)}
                                />
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        </View>
    )
}