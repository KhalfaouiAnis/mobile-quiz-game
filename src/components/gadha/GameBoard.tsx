import { View } from "react-native";
import { useRouter } from "expo-router";
import useGameGrid from "@/src/hooks/gadha/use-game-grid";
import QuestionCell from "./buttons/QuestionCell";
import GadhaGameGoardHeader from "./GadhaGameGoardHeader";
import { SessionBoard } from "@/src/types/game.gadha.types";
import { memo } from "react";
import { QuestionCellWrapper } from "./buttons/QuestionCellWrapper";

interface Props {
    columnHeaders: SessionBoard["columnHeaders"],
    questions: SessionBoard["questions"],
    sessionId: number
}

export default memo(function GadhaGameBoard({ columnHeaders, questions, sessionId }: Props) {
    const rows = useGameGrid(columnHeaders, questions);

    return (
        <View className="flex-1 px-1">
            <View className="flex-row flex-1 justify-around">
                {rows.map((column, index) => (
                    <View key={column.subcategoryName + "__" + index} className="justify-between px-1 ps-1.5">
                        <View className="py-1">
                            <GadhaGameGoardHeader name={column.subcategoryName || ""} image_url={column.subcategoryImage} />
                        </View>
                        {column.questions.map((question, idx) => (
                            <View key={question.id + "__" + idx} className="flex-1 py-1">
                                <QuestionCellWrapper
                                    question={question}
                                    sessionId={sessionId}
                                />
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        </View>
    )
})
