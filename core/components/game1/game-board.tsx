import { View } from "react-native";
import { Game1BoardSubcategory } from "./category";
import QuestionCell from "./buttons/question-cell";
import useGameGrid from "@/core/hooks/game1/use-game-grid";
import { GameBoard, Question } from "@/core/types";
import { useRouter } from "expo-router";

export default function Game1Board({ grid, sessionId }: GameBoard) {
    const gridData = useGameGrid(grid);
    const router = useRouter()

    return (
        <View className="flex-1 px-1">
            <View className="flex-row flex-1 justify-around">
                {gridData.map((column, index) => (
                    <View key={column.subcategoryName + "__" + index} className="justify-between px-1 ps-1.5">
                        <View className="py-1">
                            <Game1BoardSubcategory name={column.subcategoryName} image_url={column.subcategoryImage} />
                        </View>
                        {column.questions.map((question: Question, idx) => (
                            <View key={question.id + "__" + idx} className="flex-1 py-1">
                                <QuestionCell
                                    question={question}
                                    onPress={() => router.push(`/(main)/game1/${sessionId}/${question.id}`)}
                                />
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        </View>
    )
}