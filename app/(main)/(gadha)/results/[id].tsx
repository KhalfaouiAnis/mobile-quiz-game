import { View, Text, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useGadhaResults } from '@/src/hooks/queries/gameGadha/useGadhaResults';
import { useGadhaGameStore } from '@/src/stores/game.gadha.store';
import type { ResultTeam, Difficulty } from '@/src/types/game.gadha.types';

const DIFF_COLORS: Record<Difficulty, string> = {
    easy: 'text-game-green',
    medium: 'text-game-amber',
    hard: 'text-game-red',
};

function TeamCard({ team, highlight }: { team: ResultTeam; highlight: boolean }) {
    return (
        <View className={`rounded-3xl p-5 mb-4 border ${highlight
            ? 'bg-game-purple/20 border-game-purple'
            : 'bg-game-surface border-game-border'
            }`}>
            {/* Team header */}
            <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center gap-2">
                    <Text className="text-3xl">{['🥇', '🥈', '🥉'][team.rank - 1] ?? `#${team.rank}`}</Text>
                    <View>
                        <Text className={`font-bold text-lg ${highlight ? 'text-game-purpleL' : 'text-white'}`}>
                            {team.name}
                        </Text>
                        {team.isBoostUsed && (
                            <Text className="text-game-amber text-xs">⚡ Boost used</Text>
                        )}
                    </View>
                </View>
                <Text className="text-white text-2xl font-bold">{team.score.toLocaleString()}</Text>
            </View>

            {/* Stats row */}
            <View className="flex-row gap-3 mb-4">
                <View className="flex-1 bg-game-bg/50 rounded-xl px-3 py-2 items-center">
                    <Text className="text-white font-bold text-base">{team.correctAnswers}</Text>
                    <Text className="text-white/40 text-xs">Correct</Text>
                </View>
                <View className="flex-1 bg-game-bg/50 rounded-xl px-3 py-2 items-center">
                    <Text className="text-white font-bold text-base">{team.totalAnswered}</Text>
                    <Text className="text-white/40 text-xs">Attempted</Text>
                </View>
                <View className="flex-1 bg-game-bg/50 rounded-xl px-3 py-2 items-center">
                    <Text className="text-white font-bold text-base">{team.accuracy}%</Text>
                    <Text className="text-white/40 text-xs">Accuracy</Text>
                </View>
            </View>

            {/* Answer history */}
            {team.answerHistory.length > 0 && (
                <View>
                    <Text className="text-white/30 text-xs uppercase tracking-widest mb-2">Answer history</Text>
                    <View className="gap-1">
                        {team.answerHistory.map((h) => (
                            <View
                                key={h.questionId}
                                className="flex-row items-center justify-between py-1.5 border-b border-game-border/40"
                            >
                                <View className="flex-row items-center gap-2">
                                    <Text className={h.isCorrect ? 'text-game-green' : 'text-game-red'}>
                                        {h.isCorrect ? '✓' : '✗'}
                                    </Text>
                                    <Text className={`text-xs font-semibold ${DIFF_COLORS[h.difficulty]}`}>
                                        {h.difficulty.charAt(0).toUpperCase() + h.difficulty.slice(1)}
                                    </Text>
                                    <Text className="text-white/30 text-xs">{h.basePoints} pts base</Text>
                                </View>
                                <Text className={`text-sm font-bold ${h.isCorrect ? 'text-white' : 'text-white/30'}`}>
                                    {h.isCorrect ? `+${h.pointsAwarded}` : '0'}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            )}
        </View>
    );
}

export default function ResultsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const sessionId = Number(id);

    const { data: results, isLoading, isError, refetch } = useGadhaResults(sessionId);

    const handlePlayAgain = () => {
        router.replace('/(main)/(gadha)/setup');
    };

    const handleHome = () => {
        router.replace('/');
    };

    if (isLoading) {
        return (
            <View className="flex-1 bg-game-bg items-center justify-center">
                <ActivityIndicator color="#7C3AED" size="large" />
            </View>
        );
    }

    if (isError || !results) {
        return (
            <View className="flex-1 bg-game-bg items-center justify-center px-8">
                <Text className="text-white/50 text-center mb-4">Could not load results</Text>
                <Pressable onPress={() => refetch()} className="bg-game-purple px-6 py-3 rounded-xl">
                    <Text className="text-white font-semibold">Retry</Text>
                </Pressable>
            </View>
        );
    }

    const isTie = !results.winner;

    return (
        <View className="flex-1 bg-game-bg">
            <ScrollView
                contentContainerClassName="px-5 pb-10 pt-14"
                showsVerticalScrollIndicator={false}
            >
                {/* ── Winner banner ── */}
                <View className="items-center mb-8">
                    <Text className="text-5xl mb-3">{isTie ? '🤝' : '🏆'}</Text>
                    <Text className="text-white text-2xl font-bold text-center">
                        {isTie ? "It's a tie!" : `${results.winner!.name} wins!`}
                    </Text>
                    {!isTie && (
                        <Text className="text-white/50 text-sm mt-1">
                            {results.winner!.score.toLocaleString()} points
                        </Text>
                    )}
                </View>

                {/* ── Board progress ── */}
                <View className="bg-game-surface rounded-2xl px-5 py-3 mb-5 flex-row items-center justify-between">
                    <Text className="text-white/50 text-sm">Board completed</Text>
                    <Text className="text-white font-bold">
                        {results.boardProgress.uniqueAnswered} / {results.boardProgress.total} questions
                    </Text>
                </View>

                {/* ── Team cards ── */}
                {results.teams.map((team) => (
                    <TeamCard
                        team={team}
                        key={team.id}
                        highlight={team.id === results.winner?.id}
                    />
                ))}
            </ScrollView>

            {/* ── CTAs ── */}
            <View className="px-5 pb-10 pt-3 gap-3">
                <Pressable
                    onPress={handlePlayAgain}
                    className="h-14 bg-game-purple rounded-2xl items-center justify-center"
                >
                    <Text className="text-white font-bold text-base">Play again</Text>
                </Pressable>
                <Pressable
                    onPress={handleHome}
                    className="h-14 bg-game-surface border border-game-border rounded-2xl items-center justify-center"
                >
                    <Text className="text-white/70 font-semibold text-base">Back to home</Text>
                </Pressable>
            </View>
        </View>
    );
}