import { View } from "react-native";
import { Game1BoardSubcategory } from "./category";
import QuestionCell from "./buttons/question-cell";
import useGameGrid from "@/core/hooks/game1/use-game-grid";
import { GameBoard, Question } from "@/core/types";
import { useRouter } from "expo-router";

export default function Game1Board({ grid, sessionId }: GameBoard) {
    const router = useRouter()
    const gridData = useGameGrid(grid);

    return (
        <View className="flex-1 py-1 items-center">
            <View className="flex-row">
                {
                    gridData.map((column) => (
                        <View key={column.subcategoryName} className="mx-2 items-center">
                            <Game1BoardSubcategory name={column.subcategoryName} image_url={column.subcategoryImage} />
                            {column.questions.map((question: Question) => (
                                <QuestionCell
                                    question={question}
                                    key={question.id}
                                    onPress={() => router.push(`/(main)/game1/${sessionId}/${question.id}`)}
                                />
                            ))}
                        </View>
                    ))
                }
            </View>
        </View>
    )
}