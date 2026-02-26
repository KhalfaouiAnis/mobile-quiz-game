import StrokeText from '@/assets/svg/stroke-text';
import { TEXT_SCALE_FACOTR } from '@/core/constants';
import { useGameStore } from '@/core/store/game1.store';
import { Question } from '@/core/types';
import { boxShadow } from '@/core/utils/cn';
import { memo } from 'react';
import { Text, Pressable } from 'react-native';

interface Props {
    question: Question,
    onPress: () => void
}

const QuestionCell = memo(({ question, onPress }: Props) => {
    const isAnsweredLocal = useGameStore(s => s.optimisticAnsweredIds.has(question.id));
    console.log("current question: ", question.id);

    return (
        <Pressable
            disabled={isAnsweredLocal || question.is_answered}
            onPress={onPress}
            className="py-1 px-3 my-1 rounded-xl relative bg-primary-500 disabled:bg-gray-400"
            style={[
                boxShadow(4, 4, 0, 0, "rgb(000 000 000 / 1)").button,
            ]}
        >
            <Text className="text-white font-bagel-regular"
                style={{
                    textShadowColor: "#000000",
                    textShadowRadius: 1,
                    textShadowOffset: { width: 1, height: 1 },
                    fontSize: 25 * TEXT_SCALE_FACOTR
                }}>
                {question.points}
            </Text>
            {question.is_answered && (
                <Text className="text-white font-bagel-regular absolute top-0 start-0">
                    <StrokeText />
                </Text>
            )}
        </Pressable>
    );
}, (prev, next) => {
    return prev.question.is_answered === next.question.is_answered &&
        prev.question.id === next.question.id;
});

export default QuestionCell