import { memo } from 'react';
import { Text, Pressable } from 'react-native';
import StrokeText from '@/assets/svg/stroke-text';
import { useGadhaGameStore } from '@/src/stores/game.gadha.store';
import { Question } from '@/src/types/game.gadha.types';
import { boxShadow } from '@/src/utils/cn';
import { scale, verticalScale } from '@/src/utils/sizes';
import ShadowedText from "@/src/components/shared/text/ShadowedText";
import { fontScale } from '@/src/utils/dimensions';
import { useShallow } from 'zustand/shallow';

interface Props {
    question: Question,
    onPress: () => void
}

const QuestionCell = memo(({ question, onPress }: Props) => {
    const { team1BoostActive, team2BoostActive, isAnsweredLocal } = useGadhaGameStore(
        useShallow(state => ({
            team1BoostActive: state.team1BoostActive,
            team2BoostActive: state.team2BoostActive,
            isAnsweredLocal: state.optimisticAnsweredIds.has(question.id),
        }))
    )

    const isDisabled = isAnsweredLocal || question.is_answered;

    return (
        <Pressable
            onPress={onPress}
            disabled={isDisabled}
            className="items-center justify-center rounded-xl relative"
            style={{
                boxShadow: boxShadow(4, 4, 0, 0, "rgb(000 000 000 / 1)").boxShadow,
                backgroundColor: isDisabled ? "rgb(141 136 136 / 0.77)" : "#00A6DA",
                height: verticalScale(46),
                width: scale(100),
            }}
        >
            <ShadowedText fontSize={31} content={question.points + ""} fillColor="#fff" />
            {((team1BoostActive || team2BoostActive) && (!isAnsweredLocal && !question.is_answered)) && (
                <Text className="text-white font-bagel-regular absolute -top-1 -start-1">
                    <StrokeText size={fontScale(28)} />
                </Text>
            )}
        </Pressable>
    );
}, (prev, next) => {
    return prev.question.is_answered === next.question.is_answered &&
        prev.question.id === next.question.id;
});

export default QuestionCell