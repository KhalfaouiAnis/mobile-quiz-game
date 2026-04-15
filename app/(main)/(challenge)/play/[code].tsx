import { useEffect, useRef, useCallback } from 'react';
import { View, Text, Pressable, Animated, Image, ScrollView } from 'react-native';
import { useGameChallengeStore } from '@/src/stores/game.challenge.store';
import { useAuthStore } from '@/src/stores/auth.store';
import { getSocket } from '@/src/lib/socket';
import { ClientEvent } from '@/src/types/game.challenge.types';

// ─── Option button ──────────────────────────────────────────────────────────

interface OptionProps {
    index: number;
    text: string;
    selected: number | null;
    hasAnswered: boolean;
    answerReveal: { correctAnswer: number } | null;
    onSelect: (i: number) => void;
}

function OptionButton({ index, text, selected, hasAnswered, answerReveal, onSelect }: OptionProps) {
    const isSelected = selected === index;
    const isCorrect = answerReveal?.correctAnswer === index;
    const isWrong = hasAnswered && isSelected && !isCorrect;

    let bg = 'bg-game-surface border border-game-border';
    if (answerReveal) {
        if (isCorrect) bg = 'bg-game-green/20 border border-game-green';
        else if (isWrong) bg = 'bg-game-red/20 border border-game-red';
        else bg = 'bg-game-surface border border-game-border opacity-40';
    } else if (isSelected) {
        bg = 'bg-game-purple/20 border border-game-purple';
    }

    return (
        <Pressable
            onPress={() => !hasAnswered && !answerReveal && onSelect(index)}
            className={`${bg} rounded-2xl px-5 py-4 mb-3 flex-row items-center gap-4`}
        >
            <View className={`w-8 h-8 rounded-full items-center justify-center border ${isCorrect
                ? 'bg-game-green border-game-green'
                : isWrong
                    ? 'bg-game-red border-game-red'
                    : isSelected
                        ? 'bg-game-purple border-game-purple'
                        : 'border-game-border'
                }`}>
                <Text className="text-white font-bold text-sm">
                    {String.fromCharCode(65 + index)}
                </Text>
            </View>
            <Text className="text-white text-sm font-medium flex-1">{text}</Text>
            {isCorrect && <Text className="text-game-green text-lg">✓</Text>}
            {isWrong && <Text className="text-game-red text-lg">✗</Text>}
        </Pressable>
    );
}

// ─── Play screen ─────────────────────────────────────────────────────────────

export default function PlayScreen() {
    const question = useGameChallengeStore(s => s.question);
    const selected = useGameChallengeStore(s => s.selectedOption);
    const hasAnswered = useGameChallengeStore(s => s.hasAnswered);
    const answerReveal = useGameChallengeStore(s => s.answerReveal);
    const myScore = useGameChallengeStore(s => s.myScore);
    const currentRound = useGameChallengeStore(s => s.currentRound);
    const totalRounds = useGameChallengeStore(s => s.totalRounds);

    const token = useAuthStore(s => s.token)!;

    // ── Timer ──
    const timerAnim = useRef(new Animated.Value(1)).current;
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const animRef = useRef<Animated.CompositeAnimation | null>(null);

    useEffect(() => {
        if (!question) return;

        // Reset
        timerAnim.setValue(1);
        if (animRef.current) animRef.current.stop();
        if (timerRef.current) clearTimeout(timerRef.current);

        animRef.current = Animated.timing(timerAnim, {
            toValue: 0,
            duration: question.timeLimit * 1_000,
            useNativeDriver: false,
        });
        animRef.current.start();

        return () => {
            animRef.current?.stop();
        };
    }, [question?.questionId]);

    // Stop timer once revealed
    useEffect(() => {
        if (answerReveal) animRef.current?.stop();
    }, [answerReveal]);

    // ── Answer submission ──
    const handleSelect = useCallback((option: number) => {
        if (hasAnswered || answerReveal) return;

        useGameChallengeStore.getState().setSelectedOption(option);

        const q = useGameChallengeStore.getState().question;
        if (!q) return;

        const timeSpent = q.timeLimit - (timerAnim as any)._value * q.timeLimit;

        getSocket(token).emit(ClientEvent.SUBMIT_ANSWER, {
            selectedOption: option,
            timeSpent: Math.round(timeSpent),
        });
    }, [hasAnswered, answerReveal]);

    // ── Timer color interpolation ──
    const timerColor = timerAnim.interpolate({
        inputRange: [0, 0.3, 1],
        outputRange: ['#EF4444', '#F59E0B', '#22C55E'],
    });

    const timerWidth = timerAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    if (!question) {
        return (
            <View className="flex-1 bg-game-bg items-center justify-center">
                <Text className="text-white/50">Loading question…</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-game-bg">
            {/* Top bar */}
            <View className="px-5 pt-14 pb-3 flex-row items-center justify-between">
                <View className="bg-game-surface rounded-xl px-4 py-2">
                    <Text className="text-white/50 text-[10px] uppercase tracking-wider">Round</Text>
                    <Text className="text-white font-bold text-sm">
                        {currentRound} / {totalRounds}
                    </Text>
                </View>
                <View className="bg-game-surface rounded-xl px-4 py-2 items-center">
                    <Text className="text-white/50 text-[10px] uppercase tracking-wider">Question</Text>
                    <Text className="text-white font-bold text-sm">
                        {question.questionIndex + 1} / {question.totalQuestions}
                    </Text>
                </View>
                <View className="bg-game-surface rounded-xl px-4 py-2 items-end">
                    <Text className="text-white/50 text-[10px] uppercase tracking-wider">Score</Text>
                    <Text className="text-game-purpleL font-bold text-sm">{myScore}</Text>
                </View>
            </View>

            {/* Timer bar */}
            <View className="mx-5 h-2 bg-game-surface rounded-full overflow-hidden mb-4">
                <Animated.View
                    style={[{ height: '100%', borderRadius: 8 }, { width: timerWidth, backgroundColor: timerColor }]}
                />
            </View>

            <ScrollView contentContainerClassName="px-5 pb-10" showsVerticalScrollIndicator={false}>
                {/* Question card */}
                <View className="bg-game-surface rounded-3xl p-5 mb-5">
                    {question.imageUrl && (
                        <Image
                            source={{ uri: question.imageUrl }}
                            className="w-full h-44 rounded-2xl mb-4"
                            resizeMode="cover"
                        />
                    )}
                    <View className="flex-row items-center gap-2 mb-3">
                        <View className="bg-game-purple/20 rounded-lg px-3 py-1">
                            <Text className="text-game-purpleL text-xs font-semibold">
                                {question.points} pts
                            </Text>
                        </View>
                    </View>
                    <Text className="text-white text-lg font-semibold leading-7">
                        {question.text}
                    </Text>
                </View>

                {/* Answer result banner */}
                {answerReveal && hasAnswered && (
                    <View className={`rounded-2xl px-5 py-4 mb-4 ${answerReveal.isCorrect ? 'bg-game-green/15 border border-game-green' : 'bg-game-red/15 border border-game-red'
                        }`}>
                        <Text className={`font-bold text-base mb-1 ${answerReveal.isCorrect ? 'text-game-green' : 'text-game-red'}`}>
                            {answerReveal.isCorrect ? `+${answerReveal.pointsEarned} points!` : 'Wrong answer'}
                        </Text>
                        {answerReveal.explanation && (
                            <Text className="text-white/70 text-sm">{answerReveal.explanation}</Text>
                        )}
                    </View>
                )}

                {/* Options */}
                {question.options.map((opt, i) => (
                    <OptionButton
                        key={i}
                        index={i}
                        text={opt}
                        selected={selected}
                        hasAnswered={hasAnswered}
                        answerReveal={answerReveal}
                        onSelect={handleSelect}
                    />
                ))}

                {/* Waiting indicator for fast finishers */}
                {hasAnswered && !answerReveal && (
                    <View className="items-center py-4">
                        <Text className="text-white/30 text-sm">Waiting for others…</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}