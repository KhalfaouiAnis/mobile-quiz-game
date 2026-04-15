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
            <ShadowedText fontSize={28} content={question.points + ""} fillColor="#fff" />
            {((team1BoostActive || team2BoostActive) && (!isAnsweredLocal && !question.is_answered)) && (
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