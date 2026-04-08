import StrokeText from '@/assets/svg/stroke-text';
import { TEXT_SCALE_FACOTR } from '@/core/constants';
import { useGame1Store } from '@/core/store/game1.store';
import { Question } from '@/core/types';
import { boxShadow } from '@/core/utils/cn';
import { moderateScale, scale, verticalScale } from '@/core/utils/sizes';
import { memo } from 'react';
import { Text, Pressable } from 'react-native';

interface Props {
    question: Question,
    onPress: () => void
}

const QuestionCell = memo(({ question, onPress }: Props) => {
    const isAnsweredLocal = useGame1Store(s => s.optimisticAnsweredIds.has(question.id));
    const team1BoostActive = useGame1Store(state => state.team1BoostActive)
    const team2BoostActive = useGame1Store(state => state.team2BoostActive)

    return (
        <Pressable
            onPress={onPress}
            disabled={isAnsweredLocal || question.is_answered}
            className="items-center justify-center rounded-xl relative bg-primary-500 disabled:bg-gray-400"
            style={{
                boxShadow: boxShadow(4, 4, 0, 0, "rgb(000 000 000 / 1)").button.boxShadow,
                height: verticalScale(44),
                width: scale(100),
            }}
        >
            <Text className="text-white font-bagel-regular"
                style={{
                    textShadowRadius: 1,
                    textShadowColor: "#000000",
                    textShadowOffset: { width: 1, height: 1 },
                    fontSize: moderateScale(32) * TEXT_SCALE_FACOTR
                }}>
                {question.points}
            </Text>
            {((team1BoostActive || team2BoostActive) && (!isAnsweredLocal || !question.is_answered)) && (
                <Text className="text-white font-bagel-regular absolute top-0 -start-1">
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