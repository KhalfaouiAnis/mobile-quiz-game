import { memo } from 'react';
import { Text, Pressable } from 'react-native';
import StrokeText from '@/assets/svg/stroke-text';
import { useGadhaGameStore } from '@/src/stores/game.gadha.store';
import { Question } from '@/src/types/game.gadha.types';
import { boxShadow } from '@/src/utils/cn';
import { scale, verticalScale } from '@/src/utils/sizes';
import ShadowedText from "@/src/components/shared/text/ShadowedText";

interface Props {
    question: Question,
    onPress: () => void
}

const QuestionCell = memo(({ question, onPress }: Props) => {
    const isAnsweredLocal = useGadhaGameStore(state => state.optimisticAnsweredIds.has(question.id));
    const team1BoostActive = useGadhaGameStore(state => state.team1BoostActive)
    const team2BoostActive = useGadhaGameStore(state => state.team2BoostActive)

    const isDisabled = isAnsweredLocal || question.is_answered;

    return (
        <Pressable
            onPress={onPress}
            disabled={isDisabled}
            className="items-center justify-center rounded-xl relative"
            style={{
                boxShadow: boxShadow(4, 4, 0, 0, "rgb(000 000 000 / 1)").button.boxShadow,
                backgroundColor: isDisabled ? "rgb(141 136 136 / 0.77)" : "#00A6DA",
                height: verticalScale(46),
                width: scale(100),
            }}
        >
            <ShadowedText uniqueId={question.id} fontSize={31} content={question.points + ""} fillColor="#fff" />
            {/* <Text>{question.points}</Text> */}
            {((team1BoostActive || team2BoostActive) && (!isAnsweredLocal && !question.is_answered)) && (
                <Text className="text-white font-bagel-regular absolute top-0 -start-1">
                    <StrokeText size={32} />
                </Text>
            )}
        </Pressable>
    );
}, (prev, next) => {
    return prev.question.is_answered === next.question.is_answered &&
        prev.question.id === next.question.id;
});

export default QuestionCell