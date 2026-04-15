import { useEffect, useRef } from 'react';
import { View, Text, Animated, FlatList } from 'react-native';
import { useGameChallengeStore } from '@/src/stores/game.challenge.store';
import type { LeaderboardEntry } from '@/src/types/game.challenge.types';
import { useAuthStore } from '@/src/stores/auth.store';

const NEXT_ROUND_DELAY = 8_000; // ms before auto-advancing (server drives actual timing)

function RankRow({ item, myUserId }: { item: LeaderboardEntry; myUserId: number | undefined }) {
    const isMe = item.userId === myUserId;

    const medalColors: Record<number, string> = { 1: 'text-game-amber', 2: 'text-white/60', 3: 'text-game-amber/60' };

    return (
        <View className={`flex-row items-center py-3 border-b border-game-border ${isMe ? 'bg-game-purple/10' : ''}`}>
            <Text className={`w-8 text-center font-bold text-base ${medalColors[item.rank] ?? 'text-white/40'}`}>
                {item.rank <= 3 ? ['🥇', '🥈', '🥉'][item.rank - 1] : item.rank}
            </Text>
            <View className="w-9 h-9 rounded-full bg-game-purple/20 items-center justify-center mx-3">
                <Text className="text-game-purpleL font-bold text-sm">
                    {item.username.charAt(0).toUpperCase()}
                </Text>
            </View>
            <Text className={`flex-1 font-semibold ${isMe ? 'text-game-purpleL' : 'text-white'}`}>
                {item.username}{isMe ? ' (you)' : ''}
            </Text>
            <Text className="text-white font-bold tabular-nums">{item.score.toLocaleString()}</Text>
        </View>
    );
}

export default function RoundResultScreen() {
    const roundLeaderboard = useGameChallengeStore(s => s.roundLeaderboard);
    const currentRound = useGameChallengeStore(s => s.currentRound);
    const totalRounds = useGameChallengeStore(s => s.totalRounds);
    const myUserId = useAuthStore(s => s.user?.id)

    // Progress bar counting down to next round
    const progressAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        progressAnim.setValue(1);
        Animated.timing(progressAnim, {
            toValue: 0, duration: NEXT_ROUND_DELAY, useNativeDriver: false,
        }).start();
    }, []);

    const isLastRound = currentRound >= totalRounds;

    return (
        <View className="flex-1 bg-game-bg px-5 pt-14">
            {/* Header */}
            <Text className="text-white/50 text-sm uppercase tracking-widest mb-1">
                Round {currentRound} complete
            </Text>
            <Text className="text-white text-2xl font-bold mb-1">
                {isLastRound ? 'Last round done!' : `Round ${currentRound} results`}
            </Text>
            <Text className="text-white/40 text-sm mb-5">
                {isLastRound ? 'Final scores incoming…' : `Round ${currentRound + 1} of ${totalRounds} starting soon`}
            </Text>

            {/* Countdown bar */}
            {!isLastRound && (
                <View className="h-1.5 bg-game-surface rounded-full overflow-hidden mb-6">
                    <Animated.View
                        style={{
                            height: '100%', borderRadius: 8, backgroundColor: '#7C3AED',
                            width: progressAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }),
                        }}
                    />
                </View>
            )}

            {/* Tabs: round score | overall */}
            <View className="flex-row mb-4 bg-game-surface rounded-xl overflow-hidden">
                <View className="flex-1 py-3 items-center bg-game-purple">
                    <Text className="text-white text-sm font-semibold">This round</Text>
                </View>
                <View className="flex-1 py-3 items-center">
                    <Text className="text-white/40 text-sm">Overall</Text>
                </View>
            </View>

            {/* Leaderboard */}
            <FlatList
                data={roundLeaderboard ?? []}
                renderItem={({ item }) => <RankRow item={item} myUserId={myUserId} />}
                keyExtractor={e => String(e.userId)}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <Text className="text-white/30 text-sm text-center mt-10">No scores yet</Text>
                }
            />
        </View>
    );
}