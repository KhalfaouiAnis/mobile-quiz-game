import { Question } from "@/src/types/game.gadha.types"
import { memo, useCallback } from "react"
import QuestionCell from "./QuestionCell"
import { useRouter } from "expo-router"

export const QuestionCellWrapper = memo(({ question, sessionId }: { question: Question, sessionId: number }) => {
    const router = useRouter()
    
    const onPress = useCallback(() => {
        router.push(`/(main)/(gadha)/question/${sessionId}/${question.id}`)
    }, [question.id, sessionId])

    return <QuestionCell question={question} onPress={onPress} />
})